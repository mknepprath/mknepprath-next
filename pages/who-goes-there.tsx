import Head from "@core/head";
import React, { useEffect, useRef, startTransition, useState } from "react";
import { io, Socket } from "socket.io-client";

// Styles
import styles from "./who-goes-there.module.css";

// Types
interface Card {
  value: number;
  suit: 'spades' | 'hearts' | 'clubs' | 'diamonds' | 'neutral';
}

// Each player only receives their own view: their hand, and the infected suit
// only if they're The Thing (everyone learns it at the blood test).
interface GameState {
  id: string;
  players: { id: string; name: string; connected: boolean; handSize: number }[];
  grid: Map<string, Card>;
  currentPlayerIndex: number;
  deckSize: number;
  hand: Card[];
  gameStarted: boolean;
  gameEnded: boolean;
  role?: 'human' | 'thing';
  thingSuit?: string;
  thingPlayerId?: string;
  winner?: 'humans' | 'thing';
  phase: 'waiting' | 'playing' | 'revealed';
  escapePath?: string[];
  exitPositions?: string[];
  score?: {
    humans: number;
    thing: number;
    rounds: number;
  };
}

const SYMBOLS = { spades: '♠', hearts: '♥', clubs: '♣', diamonds: '♦' };

// Base tile size in px; the whole map scales from this to fit the screen
const TILE = 50;

// Blood test timeline (ms): the START tile flips, walls slam in outward from
// the center, then the escape route floods out along the open tiles
const REVEAL = { flip: 700, walls: 1100, wallStep: 45, flood: 2100, floodStep: 70 };

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

// Everything the game tells you drops in full-screen, one at a time
interface Announcement {
  id: number;
  tone: 'human' | 'thing' | 'clear' | 'alarm' | 'neutral';
  kicker?: string;
  title: string;
  sub?: string;
  // The role reveal: opaque, shows the crew, tap to dismiss
  blocking?: boolean;
  // Drop anything still queued so this lands in sync with the board
  interrupt?: boolean;
  hold: number;
  wait?: number;
}

type Announced = Omit<Announcement, 'id'>;

const SUIT_NAMES = { spades: 'Spades', hearts: 'Hearts', clubs: 'Clubs', diamonds: 'Diamonds' };

// Steps from the center to every tile the humans can reach after the blood test
function floodDistances(state: GameState) {
  const distances = new Map<string, number>();
  if (state.phase !== 'revealed') return distances;
  distances.set('0,0', 0);
  const queue = ['0,0'];
  while (queue.length > 0) {
    const pos = queue.shift() as string;
    const [x, y] = pos.split(',').map(Number);
    for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      const next = `${x + dx},${y + dy}`;
      const card = state.grid.get(next);
      if (card && card.suit !== state.thingSuit && !distances.has(next)) {
        distances.set(next, (distances.get(pos) ?? 0) + 1);
        queue.push(next);
      }
    }
  }
  return distances;
}

// When the flood has finished and the result can come in
const revealEnd = (flood: Map<string, number>) =>
  REVEAL.flood + Math.max(0, ...flood.values()) * REVEAL.floodStep + 400;

const roleAnnouncement = (role: 'human' | 'thing', thingSuit?: string): Announced => ({
  tone: role,
  kicker: 'You are',
  title: role === 'thing' ? 'The Thing' : 'Human',
  sub: role === 'thing'
    ? `Your secret suit is ${SYMBOLS[thingSuit as keyof typeof SYMBOLS]} ${thingSuit}. At the end, every ${SYMBOLS[thingSuit as keyof typeof SYMBOLS]} card becomes a wall. Goal: cut off one EXIT. Don't get caught.`
    : 'One of you is The Thing, secretly assigned one of the four suits. At the end, that suit becomes walls. Goal: keep all 3 EXITs connected to START.',
  blocking: true,
  hold: 4500
});

// Drawing a CLEAR card: proof for a human, a bluffing tool for The Thing
const proofAnnouncement = (suit: keyof typeof SYMBOLS, role?: 'human' | 'thing'): Announced => role === 'thing'
  ? {
    tone: 'clear',
    kicker: 'You drew a CLEAR card',
    title: `${SYMBOLS[suit]} proof`,
    sub: `Play it to look human, or hold it to keep ${SYMBOLS[suit]} under suspicion.`,
    hold: 2600
  }
  : {
    tone: 'clear',
    kicker: 'Only you know',
    title: `${SYMBOLS[suit]} is clean`,
    sub: `Tell the others, and play it on the map to prove it.`,
    hold: 2600
  };

// Compare two game states and work out what to announce
function announcementsFor(prev: GameState | null, next: GameState, me: string): Announced[] {
  const events: Announced[] = [];
  const name = (id?: string) => id === me ? 'You' : next.players.find(p => p.id === id)?.name ?? 'Someone';
  const samePhase = prev?.id === next.id && prev.phase === next.phase && prev.score?.rounds === next.score?.rounds;

  // Crew coming and going
  if (prev?.id === next.id) {
    for (const player of next.players) {
      const before = prev.players.find(p => p.id === player.id);
      if (!before && player.id !== me) {
        events.push({ tone: 'neutral', kicker: 'New arrival', title: player.name, sub: 'joined the station', hold: 1400 });
      } else if (before?.connected && !player.connected) {
        events.push({ tone: 'alarm', kicker: 'Lost contact', title: player.name, sub: 'dropped out', hold: 1600 });
      }
    }
  }

  // A new round: everyone learns their role
  const newRound = next.phase === 'playing' && next.role &&
    !(prev?.id === next.id && prev.phase === 'playing' && prev.score?.rounds === next.score?.rounds);
  if (newRound && next.role) {
    events.push(roleAnnouncement(next.role, next.thingSuit));
    next.hand.filter(card => card.value === 11).forEach(card =>
      events.push(proofAnnouncement(card.suit as keyof typeof SYMBOLS, next.role)));
    return events;
  }

  if (prev && samePhase && next.phase === 'playing') {
    const mover = prev.players[prev.currentPlayerIndex]?.id;

    // A CLEAR card hit the map: that suit is proven safe
    next.grid.forEach((card, key) => {
      if (card.value === 11 && !prev.grid.has(key)) {
        const suit = card.suit as keyof typeof SYMBOLS;
        events.push({
          tone: 'clear',
          kicker: `${name(mover)} played a CLEAR card`,
          title: `${SYMBOLS[suit]} cleared`,
          sub: `${SUIT_NAMES[suit]} can't be infected.`,
          hold: 2200
        });
      }
    });

    // You drew a CLEAR card: private proof
    next.hand.forEach(card => {
      if (card.value === 11 && !prev.hand.some(c => c.value === 11 && c.suit === card.suit)) {
        events.push(proofAnnouncement(card.suit as keyof typeof SYMBOLS, next.role));
      }
    });

    if (prev.deckSize > 0 && next.deckSize === 0) {
      events.push({ tone: 'neutral', kicker: 'Deck empty', title: 'Last cards', sub: 'Play out your hands. Then the blood test.', hold: 2200 });
    }
  }

  // The blood test, then the verdict once the flood has played out
  if (prev?.id === next.id && prev.phase === 'playing' && next.phase === 'revealed') {
    const flood = floodDistances(next);
    const cutOff = (next.exitPositions ?? []).filter(pos => !flood.has(pos)).length;
    const test = 1500;
    events.push({ tone: 'alarm', kicker: 'Every card is down', title: 'Blood test', hold: test, interrupt: true });
    events.push({
      tone: next.winner === 'humans' ? 'human' : 'thing',
      kicker: `${name(next.thingPlayerId)} ${next.thingPlayerId === me ? 'were' : 'was'} The Thing`,
      title: next.winner === 'humans' ? 'Humans escape' : 'The Thing wins',
      sub: next.winner === 'humans'
        ? 'Every exit connects to the center.'
        : `${cutOff} exit${cutOff === 1 ? '' : 's'} cut off.`,
      hold: 2600,
      wait: Math.max(0, revealEnd(flood) - test - 800)
    });
  }

  return events;
}

export default function WhoGoesThere(): React.ReactNode {
  // Add iOS layout fixes
  useEffect(() => {
    // Prevent horizontal scroll on iOS
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100vw';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = '';
      document.body.style.width = '';
      document.body.style.maxWidth = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [inputGameCode, setInputGameCode] = useState(''); // Separate state for join input
  const [playerId, setPlayerId] = useState('');
  const [selectedCard, setSelectedCard] = useState<number>(-1);
  const [joinMode, setJoinMode] = useState<'create' | 'join' | null>(null);
  const [status, setStatus] = useState<string>('Connecting...');
  const [connectionError, setConnectionError] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);
  // Announcements queue up and drop in one at a time
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const lastState = useRef<GameState | null>(null);
  const nextAnnouncementId = useRef(0);
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  // The Thing sees its cards as the walls they'll become (can be hidden)
  const [wallView, setWallView] = useState(true);

  // Initialize socket connection
  useEffect(() => {
    // Connect to the game server (external for production, local for dev)
    const gameServerUrl = process.env.NEXT_PUBLIC_GAME_SERVER_URL || '';
    const newSocket = io(`${gameServerUrl}/who-goes-there`, {
      ...(gameServerUrl ? {} : { path: '/api/socketio' }),
      transports: ['websocket', 'polling']
    });

    startTransition(() => setSocket(newSocket));

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setStatus('Connected to server');
      setConnectionError(false);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setStatus('Disconnected from server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setConnectionError(true);
      setStatus('Connection error - please refresh');
    });

    newSocket.on('gameStateUpdate', (state: GameState) => {
      console.log('Game state updated:', state);
      // Convert grid from object to Map for frontend compatibility
      if (state.grid && typeof state.grid === 'object') {
        const gridMap = new Map();
        Object.entries(state.grid).forEach(([key, value]) => {
          gridMap.set(key, value);
        });
        state.grid = gridMap;
      }

      const events = announcementsFor(lastState.current, state, newSocket.id ?? '');
      lastState.current = state;
      if (events.length > 0) {
        const fresh = events.map(event => ({ ...event, id: nextAnnouncementId.current++ }));
        setAnnouncements(queue => fresh.some(event => event.interrupt) ? fresh : [...queue, ...fresh]);
      }

      setGameState(state);
    });

    newSocket.on('gameJoined', ({ gameId, playerId: newPlayerId }: { gameId: string; playerId: string }) => {
      setGameCode(gameId);
      setPlayerId(newPlayerId);
      setStatus(`Joined game ${gameId}`);
    });

    newSocket.on('gameCreated', ({ gameId, playerId: newPlayerId }: { gameId: string; playerId: string }) => {
      setGameCode(gameId);
      setPlayerId(newPlayerId);
      setStatus(`Created game ${gameId}. Share this code with other players!`);
    });

    newSocket.on('error', ({ message }: { message: string }) => {
      setStatus(`Error: ${message}`);
    });

    // Heartbeat to maintain connection
    const heartbeatInterval = setInterval(() => {
      if (newSocket.connected) {
        newSocket.emit('heartbeat');
      }
    }, 5000);

    return () => {
      clearInterval(heartbeatInterval);
      newSocket.close();
    };
  }, []); // Empty dependency array - only run once on mount

  const announcement = announcements[0];
  // One line under your hand saying what to do right now, and why
  const coachTip = () => {
    if (!gameState) return '';
    const hand = gameState.hand;
    const thing = gameState.role === 'thing';
    const symbol = (card: Card) => SYMBOLS[card.suit as keyof typeof SYMBOLS];

    if (!isCurrentPlayerTurn()) {
      const name = gameState.players[gameState.currentPlayerIndex]?.name;
      return thing
        ? `${name} is placing. Act human; your walls only count at the end.`
        : `${name} is placing. Watch where they put each suit.`;
    }
    if (selectedCard >= 0) return 'Now pick a spot on the map.';

    const clear = hand.find(card => card.value === 11);
    const exit = hand.find(card => card.value === 10);
    const infected = hand.find(card => card.suit === gameState.thingSuit);

    if (thing && infected) return `Your turn. ${symbol(infected)} is a wall: put it where there's only one way through.`;
    if (thing) return 'Your turn. Build like a human so nobody suspects you.';
    if (clear) return `Your turn. Play your CLEAR to officially clear ${symbol(clear)}.`;
    if (exit) return 'Your turn. Put EXITs near START, with more than one way in.';
    return 'Your turn. Keep a route open to every EXIT.';
  };

  // The role badge brings the role reveal back up
  const replayRole = () => {
    if (!gameState?.role) return;
    const id = nextAnnouncementId.current++;
    setAnnouncements(queue => [{ ...roleAnnouncement(gameState.role as 'human' | 'thing', gameState.thingSuit), id }, ...queue]);
  };

  const dismissAnnouncement = () =>
    setAnnouncements(queue => queue.filter(a => a.id !== announcement?.id));

  // Track the board's size so the map can scale to fit without scrolling
  const inGame = !!gameState?.gameStarted;
  useEffect(() => {
    const board = boardRef.current;
    if (!inGame || !board) return;
    const observer = new ResizeObserver(([entry]) => {
      setBoardSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(board);
    return () => observer.disconnect();
  }, [inGame]);

  const createGame = () => {
    if (!socket || !playerName.trim()) return;
    socket.emit('createGame', { playerName: playerName.trim() });
  };

  const joinGame = () => {
    if (!socket || !playerName.trim() || !inputGameCode.trim()) return;
    socket.emit('joinGame', { gameCode: inputGameCode.trim().toUpperCase(), playerName: playerName.trim() });
  };

  const startGame = () => {
    if (!socket || !gameCode) return;
    socket.emit('startGame', { gameCode });
  };

  const playAgain = () => {
    if (!socket || !gameCode) return;
    socket.emit('playAgain', { gameCode });
  };

  const placeCard = (position: string) => {
    if (!socket || !gameCode || selectedCard === -1) return;
    socket.emit('placeCard', { gameCode, cardIndex: selectedCard, position });
    setSelectedCard(-1);
  };

  // Cards say what they do: EXIT (10s), CLEAR (Queens, which prove a suit is
  // safe) and START (the center, hiding the infected suit). Everything else is
  // plain floor, so its rank doesn't matter.
  const cardJob = (card: Card) => {
    if (card.suit === 'neutral') return 'START';
    if (card.value === 10) return 'EXIT';
    if (card.value === 11) return 'CLEAR';
    return null;
  };

  // The Thing (and everyone, after the blood test) knows the START tile's suit
  const cardSymbol = (card: Card) => {
    if (card.suit !== 'neutral') return SYMBOLS[card.suit as keyof typeof SYMBOLS];
    return gameState?.thingSuit ? SYMBOLS[gameState.thingSuit as keyof typeof SYMBOLS] : '?';
  };

  // Infected cards look like walls to The Thing while wall view is on
  const seesWalls = !!(gameState?.phase === 'playing' && gameState.role === 'thing' && wallView);
  const looksLikeWall = (card?: Card) =>
    !!(card && gameState?.thingSuit && card.suit === gameState.thingSuit &&
      (gameState.phase === 'revealed' || seesWalls));

  const renderCard = (card: Card) => {
    const job = cardJob(card);
    return (
      <div className={`${styles.card} ${styles[card.suit]} ${looksLikeWall(card) ? styles.wallCard : ''}`}>
        {job && <span className={styles.job}>{job}</span>}
        <span className={styles.symbol}>{cardSymbol(card)}</span>
      </div>
    );
  };

  // A map tile draws floor toward each open neighbor, so lines of tiles read
  // as hallways and any 2x2 block opens up into a room. After the blood test,
  // infected tiles become walls and the passages into them close.
  const renderTile = (card: Card, key: string, x: number, y: number, flood: Map<string, number>) => {
    if (!gameState) return null;
    const revealed = gameState.phase === 'revealed';
    const isWall = looksLikeWall;
    const open = (dx: number, dy: number) => {
      const neighbor = gameState.grid.get(`${x + dx},${y + dy}`);
      return !!neighbor && !isWall(neighbor);
    };

    const wall = isWall(card);
    const sides = { n: open(0, -1), s: open(0, 1), e: open(1, 0), w: open(-1, 0) };
    const room = !wall && [[-1, -1], [1, -1], [-1, 1], [1, 1]].some(([dx, dy]) =>
      open(dx, 0) && open(0, dy) && open(dx, dy)
    );
    const reached = revealed && flood.has(key);
    const cleanExit = !!(revealed && gameState.exitPositions?.includes(key));
    const job = cardJob(card);

    const className = [
      styles.tile,
      styles[card.suit],
      room ? styles.room : '',
      wall ? styles.wall : '',
      reached ? styles.reached : '',
      cleanExit && reached ? styles.exit : '',
      cleanExit && !reached ? styles.cutOff : '',
      job ? styles.special : ''
    ].filter(Boolean).join(' ');

    // Stagger the blood test: walls by distance from the center, the escape
    // route by how far the flood has to travel
    const style: CSSVars = {};
    if (wall) style['--delay'] = `${REVEAL.walls + (Math.abs(x) + Math.abs(y)) * REVEAL.wallStep}ms`;
    if (reached) style['--delay'] = `${REVEAL.flood + (flood.get(key) ?? 0) * REVEAL.floodStep}ms`;
    if (cleanExit && !reached) style['--delay'] = `${revealEnd(flood)}ms`;

    return (
      <div key={key} className={className} style={style}>
        <span className={styles.floor} />
        {!wall && (Object.keys(sides) as (keyof typeof sides)[]).map(side =>
          sides[side] && <span key={side} className={`${styles.arm} ${styles[side]}`} />
        )}
        {wall && <span className={styles.wallFill} />}
        {job && <span className={styles.job}>{job}</span>}
        <span className={styles.symbol}>{cardSymbol(card)}</span>
      </div>
    );
  };

  const gridBounds = () => {
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    gameState?.grid.forEach((_, key) => {
      const [x, y] = key.split(',').map(Number);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
    // One ring of padding for placing new cards
    return { minX: minX - 1, minY: minY - 1, cols: maxX - minX + 3, rows: maxY - minY + 3 };
  };

  const renderGrid = () => {
    if (!gameState || !gameState.grid || gameState.grid.size === 0) {
      return <div className={styles.emptyGrid}>Waiting for first card...</div>;
    }

    const { minX, minY, cols, rows } = gridBounds();
    const flood = floodDistances(gameState);

    const cells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col + minX;
        const y = row + minY;
        const key = `${x},${y}`;
        const card = gameState.grid.get(key);

        if (card) {
          cells.push(renderTile(card, key, x, y, flood));
        } else if (gameState.phase === 'playing' && isCurrentPlayerTurn() && canPlaceAt(x, y)) {
          cells.push(
            <button
              key={key}
              className={styles.validPosition}
              onClick={() => placeCard(key)}
              aria-label={`Place at ${key}`}
            >
              +
            </button>
          );
        } else {
          cells.push(<div key={key} className={styles.emptyCell}></div>);
        }
      }
    }

    // Fit the whole map in the board, growing small maps up a little. Past the
    // minimum a very long map scrolls instead of shrinking to specks.
    const width = cols * TILE;
    const height = rows * TILE;
    const scale = boardSize.width
      ? Math.max(0.45, Math.min(1.3, boardSize.width / width, boardSize.height / height))
      : 1;

    return (
      <div
        className={`${styles.grid} ${selectedCard >= 0 ? styles.armed : ''}`}
        style={{
          gridTemplateColumns: `repeat(${cols}, ${TILE}px)`,
          gridTemplateRows: `repeat(${rows}, ${TILE}px)`,
          zoom: scale
        }}
      >
        {cells}
      </div>
    );
  };

  const canPlaceAt = (x: number, y: number): boolean => {
    if (!gameState || !gameState.grid) return false;
    
    // Check if adjacent to existing card
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    const hasAdjacent = directions.some(([dx, dy]) => 
      gameState.grid.has(`${x + dx},${y + dy}`)
    );
    
    if (!hasAdjacent) return false;

    // Check 2x2 rule - would this create a >2x2 block?
    const gridPositions = new Set([...gameState.grid.keys(), `${x},${y}`]);
    
    // Check for 3-wide rectangles
    for (let dx = -2; dx <= 0; dx++) {
      for (let dy = -1; dy <= 0; dy++) {
        let hasRect = true;
        for (let i = 0; i < 3 && hasRect; i++) {
          for (let j = 0; j < 2 && hasRect; j++) {
            if (!gridPositions.has(`${x + dx + i},${y + dy + j}`)) {
              hasRect = false;
            }
          }
        }
        if (hasRect) return false;
      }
    }

    // Check for 2-wide by 3-tall rectangles
    for (let dx = -1; dx <= 0; dx++) {
      for (let dy = -2; dy <= 0; dy++) {
        let hasRect = true;
        for (let i = 0; i < 2 && hasRect; i++) {
          for (let j = 0; j < 3 && hasRect; j++) {
            if (!gridPositions.has(`${x + dx + i},${y + dy + j}`)) {
              hasRect = false;
            }
          }
        }
        if (hasRect) return false;
      }
    }

    return true;
  };

  const getCurrentPlayerHand = () => gameState?.hand || [];

  // Suits proven clean: a CLEAR card of that suit is on the map or in your hand
  const getClearedSuits = () => {
    if (!gameState) return [];
    const queens = [...gameState.grid.values(), ...gameState.hand].filter(card => card.value === 11);
    return (Object.keys(SYMBOLS) as (keyof typeof SYMBOLS)[]).filter(suit => queens.some(card => card.suit === suit));
  };

  const isCurrentPlayerTurn = () => {
    if (!gameState || !playerId) return false;
    const playerIndex = gameState.players.findIndex(p => p.id === playerId);
    return gameState.currentPlayerIndex === playerIndex;
  };

  // Full rules, reachable from the lobby and in-game
  const rulesModal = showRules && (
    <div className={styles.modal} onClick={() => setShowRules(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={() => setShowRules(false)}>×</button>

        <h2>How to Play</h2>

        <div className={styles.rulesContent}>
          <section>
            <h3>Goal</h3>
            <p>Build a research station together. One player is secretly <strong>The Thing</strong>. Humans want an escape route; The Thing wants everyone trapped.</p>
          </section>

          <section>
            <h3>Setup</h3>
            <ul>
              <li>One player is secretly The Thing, and is secretly assigned one of the four suits: the <strong>infected</strong> suit</li>
              <li>Only The Thing knows which suit it is. The <strong>START</strong> tile at the center hides it</li>
              <li>Everyone holds 2 cards</li>
            </ul>
          </section>

          <section>
            <h3>Your Turn</h3>
            <ol>
              <li><strong>Place</strong> 1 of your 2 cards next to (N/S/E/W) a card on the map</li>
              <li><strong>Draw</strong> 1 card, while the deck lasts</li>
            </ol>
            <p>No block of cards can be bigger than 2×2.</p>
          </section>

          <section>
            <h3>The Cards</h3>
            <ul>
              <li><strong>Floor</strong> - Most cards. Only the suit matters</li>
              <li><strong>EXIT</strong> - One per suit. Humans need to reach them</li>
              <li><strong>CLEAR</strong> - Proves its suit is safe. Play it to tell everyone, or keep it to yourself</li>
            </ul>
            <p>Tiles in a line form hallways; any 2×2 block becomes a room.</p>
          </section>

          <section>
            <h3>The Blood Test</h3>
            <p>Once every card is on the map, the START tile reveals the infected suit:</p>
            <ul>
              <li>Tiles of the infected suit become <strong>walls</strong></li>
              <li><strong>Humans win</strong> if all three clean exits connect to the center</li>
              <li><strong>The Thing wins</strong> if even one is cut off</li>
            </ul>
          </section>

          <section>
            <h3>Tips</h3>
            <ul>
              <li>Talk! Say which CLEAR cards you hold. The Thing can lie too</li>
              <li>Watch who plays which suit where. The Thing plugs chokepoints</li>
              <li>Keep exits close and give each more than one route</li>
              <li>The Thing: play like a human until it counts</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );

  // Show connection error only if there's an actual error (not just initial loading)
  if (connectionError) {
    return (
      <div className={styles.fullscreen}>
        <Head title="Who Goes There?" description="A multiplayer map-building deduction game" />
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>WHO GOES THERE?</h1>
            <p className={styles.tagline}>A Map-Building Deduction Game</p>
          </header>

          <div className={styles.status}>
            <h3 style={{ color: '#8B0000', marginBottom: '1rem' }}>Multiplayer Temporarily Unavailable</h3>
            <p>The real-time multiplayer features are currently experiencing technical difficulties due to system performance issues.</p>
            <p><strong>Status:</strong> {status || 'Attempting to connect...'}</p>
            
            <div style={{ margin: '2rem 0' }}>
              <a href="/who-goes-there-simple" className={styles.primaryButton}>
                Try Demo Version
              </a>
            </div>
            
            <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
              <p>The demo version shows the core game mechanics without multiplayer features.</p>
              <p>Full multiplayer will be restored when system performance improves.</p>
            </div>
          </div>

          <div className={styles.rules}>
            <h2>How to Play</h2>
            <p>Build a research station together. One of you is secretly The Thing, assigned one of the four suits. At the end, every card of that suit becomes a wall.</p>
            <ul>
              <li><strong>2-6 players</strong> - Uses a standard deck</li>
              <li><strong>Hidden role</strong> - One player is The Thing</li>
              <li><strong>Map building</strong> - Take turns placing cards</li>
              <li><strong>Blood test</strong> - The Thing&apos;s suit becomes walls</li>
              <li><strong>Escape</strong> - Every clean exit must connect to the center</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Lobby view
  if (!gameCode) {
    return (
      <div className={styles.fullscreen}>
        <Head title="Who Goes There?" description="A multiplayer map-building deduction game" />
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>WHO GOES THERE?</h1>
            <p className={styles.tagline}>A Map-Building Deduction Game</p>
          </header>

          {!joinMode && (
            <div className={styles.modeSelection}>
              <button onClick={() => setJoinMode('create')} className={styles.primaryButton}>
                Create Game
              </button>
              <button onClick={() => setJoinMode('join')} className={styles.secondaryButton}>
                Join Game
              </button>
            </div>
          )}

          {joinMode && (
            <div className={styles.joinForm}>
              <input
                type="text"
                placeholder="Your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className={styles.input}
                maxLength={20}
              />
              
              {joinMode === 'join' && (
                <input
                  type="text"
                  placeholder="Game code"
                  value={inputGameCode}
                  onChange={(e) => setInputGameCode(e.target.value.toUpperCase())}
                  className={styles.input}
                  maxLength={6}
                />
              )}

              <div className={styles.buttonGroup}>
                <button
                  onClick={joinMode === 'create' ? createGame : joinGame}
                  className={styles.primaryButton}
                  disabled={!playerName.trim() || (joinMode === 'join' && !inputGameCode.trim())}
                >
                  {joinMode === 'create' ? 'Create' : 'Join'}
                </button>
                <button 
                  onClick={() => setJoinMode(null)}
                  className={styles.secondaryButton}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {status && (
            <div className={styles.status}>
              {status}
            </div>
          )}

          <div className={styles.rules}>
            <h2>How to Play</h2>
            <p>Build a research station together. One of you is secretly The Thing, assigned one of the four suits. At the end, every card of that suit becomes a wall.</p>
            <ul>
              <li><strong>2-6 players</strong> - Uses a standard deck</li>
              <li><strong>Hidden role</strong> - One player is The Thing</li>
              <li><strong>Map building</strong> - Take turns placing cards</li>
              <li><strong>Blood test</strong> - The Thing&apos;s suit becomes walls</li>
              <li><strong>Escape</strong> - Every clean exit must connect to the center</li>
            </ul>
            <button onClick={() => setShowRules(true)} className={styles.secondaryButton}>
              Full rules
            </button>
          </div>

          {rulesModal}
        </div>
      </div>
    );
  }

  // Game view
  return (
    <div className={styles.fullscreen}>
      <Head title="Who Goes There?" description="A multiplayer map-building deduction game" />
      <div className={`${styles.container} ${inGame ? styles.inGame : ''}`}>
        <header className={styles.gameHeader}>
          <h1>WHO GOES THERE?</h1>
          <div className={styles.gameInfo}>
            <span>Game: {gameCode}</span>
            {!inGame && <span>Players: {gameState?.players.length || 0}/6</span>}
            <button
              onClick={() => setShowRules(true)}
              className={styles.rulesButton}
              title="View Rules"
            >
              ?
            </button>
          </div>
        </header>

        {gameState && !gameState.gameStarted && (
          <div className={styles.lobby}>
            <h2>Waiting for players...</h2>
            <div className={styles.playerList}>
              {gameState.players.map((player) => (
                <div key={player.id} className={styles.player}>
                  <span className={player.connected ? styles.connected : styles.disconnected}>
                    ●
                  </span>
                  {player.name}
                  {player.id === playerId && " (you)"}
                </div>
              ))}
            </div>
            
            {gameState.players.length >= 2 && (
              <div className={styles.startGameSection}>
                <button onClick={startGame} className={styles.primaryButton}>
                  Start Game
                </button>
              </div>
            )}

            <p className={styles.shareCode}>
              Share this code: <strong>{gameCode}</strong>
            </p>
          </div>
        )}

        {gameState && gameState.gameStarted && (() => {
          const revealed = gameState.phase === 'revealed';
          const current = gameState.players[gameState.currentPlayerIndex];
          const thingName = gameState.thingPlayerId === playerId
            ? 'You were'
            : `${gameState.players.find(p => p.id === gameState.thingPlayerId)?.name} was`;
          const cleared = getClearedSuits();
          const resultStyle: CSSVars = { '--delay': `${revealEnd(floodDistances(gameState))}ms` };

          return (
            <div className={styles.game}>
              <div className={styles.statusBar}>
                <div className={styles.players}>
                  {gameState.players.map((player, index) => (
                    <span
                      key={player.id}
                      className={[
                        styles.chip,
                        !revealed && index === gameState.currentPlayerIndex ? styles.activeChip : '',
                        revealed && player.id === gameState.thingPlayerId ? styles.thingChip : '',
                        player.connected ? '' : styles.offline
                      ].filter(Boolean).join(' ')}
                      style={resultStyle}
                    >
                      {player.id === playerId ? 'You' : player.name}
                      {!revealed && <span className={styles.chipCount}>{player.handSize}</span>}
                    </span>
                  ))}
                </div>

                <div className={styles.meta}>
                  <span>Deck <strong>{gameState.deckSize}</strong></span>
                  <span>Cleared <strong>{cleared.length > 0 ? cleared.map(suit => SYMBOLS[suit]).join(' ') : '—'}</strong></span>
                  {gameState.role === 'thing' && !revealed && (
                    <button
                      className={`${styles.toggle} ${wallView ? styles.toggleOn : ''}`}
                      aria-pressed={wallView}
                      onClick={() => setWallView(on => !on)}
                      title="Show your infected cards as walls"
                    >
                      Wall view {wallView ? 'on' : 'off'}
                    </button>
                  )}
                  {gameState.role && (
                    <button
                      className={`${styles.roleBadge} ${gameState.role === 'thing' ? styles.roleThing : ''}`}
                      onClick={replayRole}
                      title="Show your role again"
                    >
                      {gameState.role === 'thing'
                        ? `Thing ${SYMBOLS[gameState.thingSuit as keyof typeof SYMBOLS] ?? ''}`
                        : 'Human'}
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.gameBoard} ref={boardRef}>
                {renderGrid()}

                {!revealed && (
                  <div
                    key={`${gameState.currentPlayerIndex}:${gameState.grid.size}`}
                    className={`${styles.turnBanner} ${isCurrentPlayerTurn() ? styles.myTurn : ''}`}
                  >
                    {isCurrentPlayerTurn() ? 'Your turn' : `${current?.name}'s turn`}
                  </div>
                )}
              </div>

              {!revealed ? (
                <div className={styles.hand}>
                  <div className={styles.handCards}>
                    {getCurrentPlayerHand().map((card, index) => (
                      <button
                        key={`${card.suit}${card.value}`}
                        className={`${styles.handCard} ${selectedCard === index ? styles.selected : ''}`}
                        onClick={() => setSelectedCard(index === selectedCard ? -1 : index)}
                      >
                        {renderCard(card)}
                      </button>
                    ))}
                  </div>
                  <p className={styles.instruction}>{coachTip()}</p>
                </div>
              ) : (
                <div className={styles.resultBar} style={resultStyle}>
                  <strong className={gameState.winner === 'humans' ? styles.humansWin : styles.thingWin}>
                    {gameState.winner === 'humans' ? 'Humans escape!' : 'The Thing wins!'}
                  </strong>
                  <span>
                    {thingName} The Thing · infected {SYMBOLS[gameState.thingSuit as keyof typeof SYMBOLS]}
                  </span>
                  {gameState.score && (
                    <span className={styles.score}>
                      Humans {gameState.score.humans} – {gameState.score.thing} Thing
                    </span>
                  )}
                  <button onClick={playAgain} className={styles.playAgainButton}>
                    Play again
                  </button>
                </div>
              )}

            </div>
          );
        })()}

        {announcement && (
          <div
            key={announcement.id}
            className={[
              styles.announce,
              styles[announcement.tone],
              announcement.blocking ? styles.blocking : ''
            ].filter(Boolean).join(' ')}
            style={{ '--hold': `${announcement.hold}ms`, '--wait': `${announcement.wait ?? 0}ms` } as CSSVars}
            onClick={announcement.blocking ? dismissAnnouncement : undefined}
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget && e.animationName.includes('announceOut')) dismissAnnouncement();
            }}
            role="status"
          >
            {announcement.kicker && <p className={styles.kicker}>{announcement.kicker}</p>}
            <h2 className={styles.headline}>{announcement.title}</h2>
            {announcement.sub && <p className={styles.sub}>{announcement.sub}</p>}
            {announcement.blocking && gameState && (
              <>
                <div className={styles.crew}>
                  {gameState.players.map((player, index) => (
                    <span
                      key={player.id}
                      className={player.id === playerId ? styles.me : ''}
                      style={{ '--i': index } as CSSVars}
                    >
                      {player.name}
                    </span>
                  ))}
                </div>
                <p className={styles.skip}>Tap to continue</p>
              </>
            )}
          </div>
        )}

        {rulesModal}
      </div>
    </div>
  );
}