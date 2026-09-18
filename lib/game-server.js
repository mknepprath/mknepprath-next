// Who Goes There? - Server-side Game Logic

const SUITS = ['spades', 'hearts', 'clubs', 'diamonds'];
const DIRECTIONS = [[0,1], [0,-1], [1,0], [-1,0]];
const HAND_SIZE = 3;

// Generate a 6-character game code
function generateGameCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a shuffled deck: Ace through 10 of each suit, plus the Queens of the
// three clean suits. The infected Queen is the face-down card at the center,
// so any Queen you see clears its suit.
function createDeck(thingSuit) {
  const deck = [];

  for (const suit of SUITS) {
    for (let value = 1; value <= 10; value++) {
      deck.push({ value, suit });
    }
    if (suit !== thingSuit) {
      deck.push({ value: 11, suit });
    }
  }

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

// Check if placement violates the 2x2 rule
function violates2x2Rule(grid, position) {
  const [x, y] = position.split(',').map(Number);
  const gridPositions = new Set([...Object.keys(grid), position]);

  // Check for 3-wide rectangles (3x2)
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
      if (hasRect) return true;
    }
  }

  // Check for 2-wide by 3-tall rectangles (2x3)
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
      if (hasRect) return true;
    }
  }

  return false;
}

// Check if position is valid for card placement
function isValidPlacement(grid, position) {
  const [x, y] = position.split(',').map(Number);

  // Can't place on occupied position
  if (grid[position]) return false;

  // Must be adjacent to existing card
  const hasAdjacent = DIRECTIONS.some(([dx, dy]) =>
    grid[`${x + dx},${y + dy}`]
  );

  if (!hasAdjacent) return false;

  // Must not violate 2x2 rule
  return !violates2x2Rule(grid, position);
}

// Flood out from the center through clean cards. Infected cards are walls;
// the center Queen is always walkable. Humans escape only if every clean 10
// is reachable.
function findEscapePath(grid, thingSuit) {
  const open = (pos) => grid[pos] && grid[pos].suit !== thingSuit;

  const visited = new Set(['0,0']);
  const queue = ['0,0'];

  while (queue.length > 0) {
    const [x, y] = queue.shift().split(',').map(Number);

    for (const [dx, dy] of DIRECTIONS) {
      const nextPos = `${x + dx},${y + dy}`;

      if (!visited.has(nextPos) && open(nextPos)) {
        visited.add(nextPos);
        queue.push(nextPos);
      }
    }
  }

  const exits = Object.keys(grid).filter(pos => open(pos) && grid[pos].value === 10);

  return {
    connected: exits.every(pos => visited.has(pos)),
    exitPositions: exits,
    path: [...visited]
  };
}

// Any open spot on the map that a card could legally go.
function hasValidPlacement(grid) {
  for (const gridPos of Object.keys(grid)) {
    const [x, y] = gridPos.split(',').map(Number);
    for (const [dx, dy] of DIRECTIONS) {
      if (isValidPlacement(grid, `${x + dx},${y + dy}`)) return true;
    }
  }
  return false;
}

// Deal a fresh round: one random player becomes The Thing and learns the
// infected suit. Everyone else only knows they're human.
function dealRound(game) {
  const thingSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
  const thingIndex = Math.floor(Math.random() * game.players.length);
  const deck = createDeck(thingSuit);
  const hands = game.players.map(() => []);

  for (let i = 0; i < HAND_SIZE; i++) {
    for (const hand of hands) {
      hand.push(deck.pop());
    }
  }

  game.grid = { '0,0': { value: 0, suit: 'neutral' } };
  game.thingSuit = thingSuit;
  game.thingPlayerId = game.players[thingIndex].id;
  game.deck = deck;
  game.hands = hands;
  game.gameStarted = true;
  game.gameEnded = false;
  game.phase = 'playing';
  game.currentPlayerIndex = Math.floor(Math.random() * game.players.length);
  game.winner = undefined;
  game.exitPositions = undefined;
  game.escapePath = undefined;
  game.lastActivity = Date.now();
}

// Run the blood test: infected cards become walls and the humans need a path
// from the center to every clean 10.
function bloodTest(game) {
  const { connected, exitPositions, path } = findEscapePath(game.grid, game.thingSuit);

  game.phase = 'revealed';
  game.gameEnded = true;
  game.winner = connected ? 'humans' : 'thing';
  game.exitPositions = exitPositions;
  game.escapePath = path;

  if (!game.score) {
    game.score = { humans: 0, thing: 0, rounds: 0 };
  }
  game.score.rounds += 1;
  game.score[game.winner] += 1;
}

// What one player is allowed to see. Other hands, the deck, and the Thing's
// identity stay on the server until the blood test.
function viewFor(game, playerId) {
  const revealed = game.phase === 'revealed';
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  const isThing = game.thingPlayerId === playerId;

  return {
    id: game.id,
    players: game.players.map(({ id, name, connected }, index) => ({
      id,
      name,
      connected,
      handSize: game.hands[index] ? game.hands[index].length : 0
    })),
    grid: game.grid,
    currentPlayerIndex: game.currentPlayerIndex,
    deckSize: game.deck.length,
    hand: game.hands[playerIndex] || [],
    gameStarted: game.gameStarted,
    gameEnded: game.gameEnded,
    phase: game.phase,
    role: game.gameStarted ? (isThing ? 'thing' : 'human') : undefined,
    thingSuit: revealed || isThing ? game.thingSuit : undefined,
    thingPlayerId: revealed ? game.thingPlayerId : undefined,
    winner: game.winner,
    escapePath: game.escapePath,
    exitPositions: game.exitPositions,
    score: game.score
  };
}

// Create a new game
function createGame(playerName, playerId) {
  if (!playerName || playerName.trim().length === 0) {
    throw new Error('Player name required');
  }

  const gameCode = generateGameCode();

  const game = {
    id: gameCode,
    players: [{
      id: playerId,
      name: playerName.trim(),
      connected: true,
      lastSeen: Date.now()
    }],
    grid: {},
    currentPlayerIndex: 0,
    deck: [],
    hands: [],
    gameStarted: false,
    gameEnded: false,
    phase: 'waiting',
    score: {
      humans: 0,
      thing: 0,
      rounds: 0
    },
    createdAt: Date.now(),
    lastActivity: Date.now()
  };

  return { gameCode, game };
}

// Join an existing game
function joinGame(game, playerName, playerId) {
  if (!playerName || playerName.trim().length === 0) {
    throw new Error('Player name required');
  }

  if (game.gameStarted) {
    throw new Error('Game already started');
  }

  if (game.players.length >= 4) {
    throw new Error('Game is full');
  }

  // Check for duplicate names
  if (game.players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
    throw new Error('Name already taken');
  }

  game.players.push({
    id: playerId,
    name: playerName.trim(),
    connected: true,
    lastSeen: Date.now()
  });

  game.lastActivity = Date.now();

  return { game };
}

// Start the game
function startGame(game, playerId) {
  if (!game.players.some(p => p.id === playerId)) {
    throw new Error('Not in this game');
  }

  if (game.players.length < 2) {
    throw new Error('Need at least 2 players');
  }

  if (game.gameStarted) {
    throw new Error('Game already started');
  }

  dealRound(game);

  return { game };
}

// Place a card on the grid
function placeCard(game, playerId, cardIndex, position) {
  if (!game.gameStarted || game.gameEnded) {
    throw new Error('Game not in progress');
  }

  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex === -1) {
    throw new Error('Not in this game');
  }

  if (game.currentPlayerIndex !== playerIndex) {
    throw new Error('Not your turn');
  }

  if (!isValidPlacement(game.grid, position)) {
    throw new Error('Invalid placement');
  }

  const hand = game.hands[playerIndex];
  if (cardIndex < 0 || cardIndex >= hand.length) {
    throw new Error('Invalid card index');
  }

  // Place the selected card, then draw back up while the deck lasts
  const card = hand.splice(cardIndex, 1)[0];
  game.grid[position] = card;

  if (game.deck.length > 0) {
    hand.push(game.deck.pop());
  }

  game.lastActivity = Date.now();

  // Every card is on the map (or there's nowhere left to put one): blood test
  const cardsLeft = game.hands.some(h => h.length > 0);
  if (!cardsLeft || !hasValidPlacement(game.grid)) {
    bloodTest(game);
    return { game };
  }

  // Next player with cards left
  do {
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
  } while (game.hands[game.currentPlayerIndex].length === 0);

  return { game };
}

// Play again - new Thing, new deck, same players and score
function playAgain(game, playerId) {
  if (!game.players.some(p => p.id === playerId)) {
    throw new Error('Not in this game');
  }

  if (game.phase !== 'revealed') {
    throw new Error('Game must be finished to play again');
  }

  dealRound(game);

  return { game };
}

module.exports = {
  createGame,
  joinGame,
  startGame,
  placeCard,
  playAgain,
  viewFor,
  isValidPlacement,
  findEscapePath
};
