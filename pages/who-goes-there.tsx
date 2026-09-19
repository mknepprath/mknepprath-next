import Head from "@core/head";
import React, { useEffect, startTransition, useState } from "react";
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

  const renderCard = (card: Card) => {
    const job = cardJob(card);
    return (
      <div className={`${styles.card} ${styles[card.suit]}`}>
        {job && <span className={styles.job}>{job}</span>}
        <span className={styles.symbol}>{cardSymbol(card)}</span>
      </div>
    );
  };

  // A map tile draws floor toward each open neighbor, so lines of tiles read
  // as hallways and any 2x2 block opens up into a room. After the blood test,
  // infected tiles become walls and the passages into them close.
  const renderTile = (card: Card, key: string, x: number, y: number) => {
    if (!gameState) return null;
    const revealed = gameState.phase === 'revealed';
    const isWall = (c?: Card) => !!(revealed && c && c.suit === gameState.thingSuit);
    const open = (dx: number, dy: number) => {
      const neighbor = gameState.grid.get(`${x + dx},${y + dy}`);
      return !!neighbor && !isWall(neighbor);
    };

    if (isWall(card)) {
      return (
        <div key={key} className={`${styles.tile} ${styles.wall}`}>
          <span className={styles.job}>{cardJob(card)}</span>
          <span className={styles.symbol}>{cardSymbol(card)}</span>
        </div>
      );
    }

    const sides = { n: open(0, -1), s: open(0, 1), e: open(1, 0), w: open(-1, 0) };
    const room = [[-1, -1], [1, -1], [-1, 1], [1, 1]].some(([dx, dy]) =>
      open(dx, 0) && open(0, dy) && open(dx, dy)
    );
    const reached = !!(revealed && gameState.escapePath?.includes(key));
    const cleanExit = !!(revealed && gameState.exitPositions?.includes(key));
    const job = cardJob(card);

    const className = [
      styles.tile,
      styles[card.suit],
      room ? styles.room : '',
      reached ? styles.reached : '',
      cleanExit && reached ? styles.exit : '',
      cleanExit && !reached ? styles.cutOff : '',
      job ? styles.special : ''
    ].filter(Boolean).join(' ');

    return (
      <div key={key} className={className}>
        <span className={styles.floor} />
        {(Object.keys(sides) as (keyof typeof sides)[]).map(side =>
          sides[side] && <span key={side} className={`${styles.arm} ${styles[side]}`} />
        )}
        {job && <span className={styles.job}>{job}</span>}
        <span className={styles.symbol}>{cardSymbol(card)}</span>
      </div>
    );
  };

  const renderGrid = () => {
    if (!gameState || !gameState.grid || gameState.grid.size === 0) {
      return <div className={styles.emptyGrid}>Waiting for first card...</div>;
    }

    // Convert Map to array for processing
    const gridEntries = Array.from(gameState.grid.entries());
    
    // Find grid bounds
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    gridEntries.forEach(([key]) => {
      const [x, y] = key.split(',').map(Number);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });

    // Add padding for placing new cards
    const padding = 1;
    minX -= padding;
    maxX += padding;
    minY -= padding;
    maxY += padding;

    const cols = maxX - minX + 1;
    const rows = maxY - minY + 1;

    const cells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col + minX;
        const y = row + minY;
        const key = `${x},${y}`;
        const card = gameState.grid.get(key);

        if (card) {
          cells.push(renderTile(card, key, x, y));
        } else if (gameState.phase === 'playing' && canPlaceAt(x, y)) {
          // Valid placement position
          cells.push(
            <div 
              key={key} 
              className={styles.validPosition}
              onClick={() => placeCard(key)}
            >
              +
            </div>
          );
        } else {
          // Empty space
          cells.push(<div key={key} className={styles.emptyCell}></div>);
        }
      }
    }

    return (
      <div 
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${cols}, 50px)`,
          gridTemplateRows: `repeat(${rows}, 50px)`
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
            <p>Build a research station together. One of you is secretly The Thing, and only they know which suit is infected.</p>
            <ul>
              <li><strong>2-6 players</strong> - Uses a standard deck</li>
              <li><strong>Hidden role</strong> - One player is The Thing</li>
              <li><strong>Map building</strong> - Take turns placing cards</li>
              <li><strong>Blood test</strong> - The infected suit becomes walls</li>
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
            <p>Build a research station together. One of you is secretly The Thing, and only they know which suit is infected.</p>
            <ul>
              <li><strong>2-6 players</strong> - Uses a standard deck</li>
              <li><strong>Hidden role</strong> - One player is The Thing</li>
              <li><strong>Map building</strong> - Take turns placing cards</li>
              <li><strong>Blood test</strong> - The infected suit becomes walls</li>
              <li><strong>Escape</strong> - Every clean exit must connect to the center</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Game view
  return (
    <div className={styles.fullscreen}>
      <Head title="Who Goes There?" description="A multiplayer map-building deduction game" />
      <div className={styles.container}>
        <header className={styles.gameHeader}>
          <h1>WHO GOES THERE?</h1>
          <div className={styles.gameInfo}>
            <span>Game: {gameCode}</span>
            <span>Players: {gameState?.players.length || 0}/6</span>
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

        {gameState && gameState.gameStarted && (
          <div className={styles.game}>
            <button
              onClick={() => setShowRules(true)}
              className={styles.rulesButton}
              title="View Rules"
            >
              ?
            </button>

            <div className={styles.gameStatus}>
              {gameState.phase === 'playing' && (
                <>
                  <div className={styles.turnInfo}>
                    {isCurrentPlayerTurn() ? (
                      <span className={styles.yourTurn}>Your turn</span>
                    ) : (
                      <span>
                        {gameState.players[gameState.currentPlayerIndex]?.name}&apos;s turn
                      </span>
                    )}
                  </div>

                  <div className={styles.deckInfo}>
                    {gameState.deckSize > 0
                      ? `Deck: ${gameState.deckSize} card${gameState.deckSize !== 1 ? 's' : ''} remaining`
                      : 'Deck empty - play out your hands, then the blood test runs'}
                  </div>

                  <div className={styles.deckInfo}>
                    Cleared:{' '}
                    {getClearedSuits().length > 0
                      ? getClearedSuits().map(suit => SYMBOLS[suit]).join(' ')
                      : 'none yet'}
                  </div>
                </>
              )}

              {gameState.phase === 'playing' && (
                <div className={styles.playerSuit}>
                  {gameState.role === 'thing' ? (
                    <span className={styles.youAreThing}>
                      You are The Thing. Infected suit: {SYMBOLS[gameState.thingSuit as keyof typeof SYMBOLS]} {gameState.thingSuit}
                    </span>
                  ) : (
                    <>You are <strong>human</strong>. One of the others is The Thing.</>
                  )}
                </div>
              )}

              {gameState.phase === 'revealed' && (
                <div className={styles.gameResult}>
                  <h2>Blood Test Results</h2>
                  <p>
                    The Thing was <strong>{gameState.thingPlayerId === playerId ? 'you' : gameState.players.find(p => p.id === gameState.thingPlayerId)?.name}</strong>
                  </p>
                  <p>
                    Infected suit: <strong>{SYMBOLS[gameState.thingSuit as keyof typeof SYMBOLS]} {gameState.thingSuit}</strong>
                  </p>
                  <p className={gameState.winner === 'humans' ? styles.humansWin : styles.thingWin}>
                    {gameState.winner === 'humans' ? 'HUMANS ESCAPE!' : 'THE THING WINS!'}
                  </p>

                  {gameState.score && (
                    <div className={styles.scoreDisplay}>
                      <h3>Score</h3>
                      <div className={styles.scoreGrid}>
                        <div className={styles.scoreItem}>
                          <span className={styles.scoreLabel}>Humans</span>
                          <span className={styles.scoreValue}>{gameState.score.humans}</span>
                        </div>
                        <div className={styles.scoreItem}>
                          <span className={styles.scoreLabel}>Thing</span>
                          <span className={styles.scoreValue}>{gameState.score.thing}</span>
                        </div>
                      </div>
                      <p className={styles.roundsPlayed}>Round {gameState.score.rounds}</p>
                    </div>
                  )}

                  <button onClick={playAgain} className={styles.playAgainButton}>
                    Play Again
                  </button>
                </div>
              )}
            </div>

            <div className={styles.gameBoard}>
              {renderGrid()}
            </div>

            {gameState.phase === 'playing' && (
              <div className={styles.hand}>
                <h3>Your hand:</h3>
                <div className={styles.handCards}>
                  {getCurrentPlayerHand().map((card, index) => (
                    <div
                      key={index}
                      className={`${styles.handCard} ${selectedCard === index ? styles.selected : ''}`}
                      onClick={() => setSelectedCard(index === selectedCard ? -1 : index)}
                    >
                      {renderCard(card)}
                    </div>
                  ))}
                </div>
                {selectedCard >= 0 && (
                  <p className={styles.instruction}>
                    Click on a + to place the selected card
                  </p>
                )}
              </div>
            )}

          </div>
        )}

        {/* Rules Modal */}
        {showRules && (
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
                    <li>One player is secretly The Thing. Only they know which suit is <strong>infected</strong></li>
                    <li>The <strong>START</strong> tile at the center hides the infected suit</li>
                    <li>Everyone starts with 3 cards</li>
                  </ul>
                </section>

                <section>
                  <h3>Your Turn</h3>
                  <ol>
                    <li><strong>Place</strong> 1 card next to (N/S/E/W) a card on the map</li>
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
                    <li>Watch who plays which suit where. The Thing plugs chokepoints</li>
                    <li>Keep exits close and give each more than one route</li>
                    <li>The Thing: play like a human until it counts</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}