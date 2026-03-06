import Head from "@core/head";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Styles
import styles from "./who-goes-there.module.css";

// Types
interface Card {
  value: number;
  suit: 'spades' | 'hearts' | 'clubs' | 'diamonds' | 'neutral';
}

interface GameState {
  id: string;
  players: { id: string; name: string; secretSuit: string; connected: boolean }[];
  grid: Map<string, Card>;
  currentPlayerIndex: number;
  deck: Card[];
  hands: Card[][];
  gameStarted: boolean;
  gameEnded: boolean;
  thingSuit?: string;
  winner?: 'humans' | 'thing';
  phase: 'waiting' | 'playing' | 'revealed';
  escapePath?: string[];
  exitPosition?: string;
  queensVariant?: boolean;
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
  const [queensVariant, setQueensVariant] = useState<boolean>(false);

  // Initialize socket connection
  useEffect(() => {
    // Connect to the game server (external for production, local for dev)
    const gameServerUrl = process.env.NEXT_PUBLIC_GAME_SERVER_URL || '';
    const newSocket = io(`${gameServerUrl}/who-goes-there`, {
      ...(gameServerUrl ? {} : { path: '/api/socketio' }),
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

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
      console.log('Phase:', state.phase, 'Thing suit:', state.thingSuit, 'Winner:', state.winner);
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
    socket.emit('startGame', { gameCode, queensVariant });
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

  const revealThing = () => {
    if (!socket || !gameCode) return;
    socket.emit('revealThing', { gameCode });
  };

  const renderCard = (card: Card, key?: string, isInfected?: boolean, isOnPath?: boolean, isExit?: boolean, revealed?: boolean) => {
    const className = [
      styles.card,
      styles[card.suit],
      isInfected ? styles.infected : '',
      isOnPath ? styles.onPath : '',
      isExit ? styles.exit : ''
    ].filter(Boolean).join(' ');

    const displayValue = card.value === 1 ? 'A' : (card.value === 0 || card.value === 11) ? 'Q' : card.value;

    // For the neutral Queen, show ? during game, reveal suit after blood test
    let symbol;
    if (card.suit === 'neutral' && !revealed) {
      symbol = '?';
    } else if (card.suit === 'neutral' && revealed && gameState?.thingSuit) {
      symbol = SYMBOLS[gameState.thingSuit as keyof typeof SYMBOLS];
    } else {
      symbol = SYMBOLS[card.suit as keyof typeof SYMBOLS];
    }

    return (
      <div key={key} className={className}>
        {displayValue}{symbol}
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
          // Existing card
          const isInfected = gameState.phase === 'revealed' &&
                           gameState.thingSuit &&
                           card.suit === gameState.thingSuit &&
                           card.value !== 0; // Start card stays (value 0 is the Queen)
          const isRevealed = gameState.phase === 'revealed';
          const isOnPath = gameState.phase === 'revealed' &&
                          gameState.escapePath &&
                          gameState.escapePath.includes(key);
          const isExit = gameState.phase === 'revealed' && gameState.exitPosition === key;
          cells.push(renderCard(card, key, isInfected, isOnPath, isExit, isRevealed));
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

  const getCurrentPlayerHand = () => {
    if (!gameState || !playerId) return [];
    const playerIndex = gameState.players.findIndex(p => p.id === playerId);
    return gameState.hands[playerIndex] || [];
  };

  const getCurrentPlayerSuit = () => {
    if (!gameState || !playerId) return null;
    const player = gameState.players.find(p => p.id === playerId);
    return player?.secretSuit || null;
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
            <p>Build a research station with cards. One suit is secretly infected. When revealed, can you still escape?</p>
            <ul>
              <li><strong>2-4 players</strong> - Uses a standard deck</li>
              <li><strong>Secret roles</strong> - Each player has a hidden suit</li>
              <li><strong>Map building</strong> - Place cards to build corridors</li>
              <li><strong>The reveal</strong> - One suit becomes impassable walls</li>
              <li><strong>Escape or die</strong> - Is there still a path to safety?</li>
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
            <p>Build a research station with cards. One suit is secretly infected. When revealed, can you still escape?</p>
            <ul>
              <li><strong>2-4 players</strong> - Uses a standard deck</li>
              <li><strong>Secret roles</strong> - Each player has a hidden suit</li>
              <li><strong>Map building</strong> - Place cards to build corridors</li>
              <li><strong>The reveal</strong> - One suit becomes impassable walls</li>
              <li><strong>Escape or die</strong> - Is there still a path to safety?</li>
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
            <span>Players: {gameState?.players.length || 0}/4</span>
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
                <label className={styles.variantToggle}>
                  <input
                    type="checkbox"
                    checked={queensVariant}
                    onChange={(e) => setQueensVariant(e.target.checked)}
                  />
                  <span>Queens Variant</span>
                  <span className={styles.variantHint}>Adds 3 extra Queens to deck</span>
                </label>

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
                    Deck: {gameState.deck.length} card{gameState.deck.length !== 1 ? 's' : ''} remaining
                    {gameState.deck.length === 0 && ' - Ready for Blood Test!'}
                  </div>
                </>
              )}

              {/* Always show player's suit during game */}
              {gameState.gameStarted && (
                <div className={styles.playerSuit}>
                  Your suit: <strong>{SYMBOLS[getCurrentPlayerSuit() as keyof typeof SYMBOLS]} {getCurrentPlayerSuit()}</strong>
                  {gameState.phase === 'revealed' && gameState.thingSuit === getCurrentPlayerSuit() && (
                    <span className={styles.youAreThing}> - You were The Thing!</span>
                  )}
                </div>
              )}

              {gameState.phase === 'revealed' && (
                <div className={styles.gameResult}>
                  <h2>Blood Test Results</h2>
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

            {gameState.phase === 'playing' && gameState.deck.length === 0 && isCurrentPlayerTurn() && (
              <button onClick={revealThing} className={styles.revealButton}>
                Run Blood Test
              </button>
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
                  <p>Build a research station with cards. One suit is secretly infected. When revealed, can you still escape?</p>
                </section>

                <section>
                  <h3>Setup</h3>
                  <ul>
                    <li>Each player is assigned a <strong>secret suit</strong></li>
                    <li>A face-down Queen (The Thing) is placed at the center</li>
                    <li>Each player draws 3 cards to start</li>
                  </ul>
                </section>

                <section>
                  <h3>Your Turn</h3>
                  <ol>
                    <li><strong>Draw</strong> 1 card from the deck</li>
                    <li><strong>Place</strong> 1 card from your hand on the map</li>
                  </ol>
                  <p>Cards must be placed adjacent (N/S/E/W) to existing cards.</p>
                </section>

                <section>
                  <h3>The 2×2 Rule</h3>
                  <p>You can create 2×2 blocks, but <strong>never larger</strong>. No 3×2, no 2×3 rectangles allowed.</p>
                </section>

                <section>
                  <h3>The Blood Test</h3>
                  <p>When the deck is empty, the current player runs the blood test:</p>
                  <ul>
                    <li>The center Queen reveals the <strong>infected suit</strong></li>
                    <li>All cards of that suit become impassable walls</li>
                    <li>The <strong>exit</strong> is the 10 of the opposite suit (same color)</li>
                  </ul>
                </section>

                <section>
                  <h3>Winning</h3>
                  <p><strong>Humans win:</strong> If there&apos;s a path from center to exit</p>
                  <p><strong>The Thing wins:</strong> If the path is blocked</p>
                </section>

                <section>
                  <h3>Strategy Tips</h3>
                  <ul>
                    <li>Build <strong>redundant paths</strong> - one suit will become walls</li>
                    <li>Place <strong>10s strategically</strong> - they&apos;re potential exits</li>
                    <li>Use <strong>2×2 blocks</strong> for alternate routes</li>
                    <li>Your own suit might be The Thing - hedge your bets!</li>
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