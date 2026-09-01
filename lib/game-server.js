// Who Goes There? - Server-side Game Logic

const SUITS = ['spades', 'hearts', 'clubs', 'diamonds'];
const DIRECTIONS = [[0,1], [0,-1], [1,0], [-1,0]];
const SAME_COLOR = {
  hearts: 'diamonds',
  diamonds: 'hearts', 
  spades: 'clubs',
  clubs: 'spades'
};

// Generate a 6-character game code
function generateGameCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a shuffled deck of cards (Ace through 10 of each suit)
// If queensVariant is true, also add Queens (value 11) for non-Thing suits
function createDeck(queensVariant = false, thingSuit = null) {
  const deck = [];

  for (const suit of SUITS) {
    for (let value = 1; value <= 10; value++) {
      deck.push({ value, suit });
    }
  }

  // Add Queens for non-Thing suits if variant is enabled
  if (queensVariant && thingSuit) {
    for (const suit of SUITS) {
      if (suit !== thingSuit) {
        deck.push({ value: 11, suit });
      }
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

// Find path from start to exit after Thing reveal
function findEscapePath(grid, thingSuit) {
  const exitSuit = SAME_COLOR[thingSuit];
  
  // Build filtered grid (remove Thing suit cards except neutral start)
  const filteredGrid = {};
  for (const [pos, card] of Object.entries(grid)) {
    if (card.suit === 'neutral' || card.suit !== thingSuit) {
      filteredGrid[pos] = card;
    }
  }
  
  // Find the exit (10 of exit suit)
  let exitPosition = null;
  for (const [pos, card] of Object.entries(filteredGrid)) {
    if (card.value === 10 && card.suit === exitSuit) {
      exitPosition = pos;
      break;
    }
  }
  
  if (!exitPosition) {
    return { connected: false, exitPosition: null, path: [] };
  }
  
  // BFS from start (0,0) to exit
  const visited = new Set();
  const queue = [{ pos: '0,0', path: ['0,0'] }];
  visited.add('0,0');
  
  while (queue.length > 0) {
    const { pos, path } = queue.shift();
    
    if (pos === exitPosition) {
      return { connected: true, exitPosition, path };
    }
    
    const [x, y] = pos.split(',').map(Number);
    
    for (const [dx, dy] of DIRECTIONS) {
      const nextPos = `${x + dx},${y + dy}`;
      
      if (!visited.has(nextPos) && filteredGrid[nextPos]) {
        visited.add(nextPos);
        queue.push({ pos: nextPos, path: [...path, nextPos] });
      }
    }
  }
  
  return { connected: false, exitPosition, path: [] };
}

// Create a new game
function createGame(playerName, playerId) {
  if (!playerName || playerName.trim().length === 0) {
    throw new Error('Player name required');
  }
  
  const gameCode = generateGameCode();
  const secretSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
  
  const game = {
    id: gameCode,
    players: [{
      id: playerId,
      name: playerName.trim(),
      secretSuit,
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
  
  // Assign random secret suit from remaining suits
  const usedSuits = new Set(game.players.map(p => p.secretSuit));
  const availableSuits = SUITS.filter(suit => !usedSuits.has(suit));
  
  if (availableSuits.length === 0) {
    throw new Error('No available suits (this should not happen)');
  }
  
  const secretSuit = availableSuits[Math.floor(Math.random() * availableSuits.length)];
  
  game.players.push({
    id: playerId,
    name: playerName.trim(),
    secretSuit,
    connected: true,
    lastSeen: Date.now()
  });
  
  game.lastActivity = Date.now();
  
  return { game };
}

// Start the game
function startGame(game, playerId, queensVariant = false) {
  if (!game.players.some(p => p.id === playerId)) {
    throw new Error('Not in this game');
  }

  if (game.players.length < 2) {
    throw new Error('Need at least 2 players');
  }

  if (game.gameStarted) {
    throw new Error('Game already started');
  }

  // Choose random Thing suit first
  const thingSuit = SUITS[Math.floor(Math.random() * SUITS.length)];

  // Create and shuffle deck (with Queens variant if enabled)
  const deck = createDeck(queensVariant, thingSuit);
  const hands = Array(game.players.length).fill(null).map(() => []);

  // Deal 3 cards to each player
  for (let i = 0; i < 3; i++) {
    for (let p = 0; p < game.players.length; p++) {
      if (deck.length > 0) {
        hands[p].push(deck.pop());
      }
    }
  }
  
  game.grid = {
    '0,0': { value: 0, suit: 'neutral' } // Hidden Queen (will reveal as Thing suit)
  };
  game.thingSuit = thingSuit; // Hidden until reveal
  game.deck = deck;
  game.hands = hands;
  game.gameStarted = true;
  game.phase = 'playing';
  game.currentPlayerIndex = 0;
  game.queensVariant = queensVariant;
  game.lastActivity = Date.now();

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
  
  // Draw a card first (if deck not empty)
  if (game.deck.length > 0) {
    hand.push(game.deck.pop());
  }
  
  // Place the selected card
  const card = hand.splice(cardIndex, 1)[0];
  game.grid[position] = card;
  
  // Next player's turn
  game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
  game.lastActivity = Date.now();
  
  return { game };
}

// Reveal the Thing and determine winner
function revealThing(game, playerId) {
  if (!game.players.some(p => p.id === playerId)) {
    throw new Error('Not in this game');
  }
  
  if (game.phase !== 'playing') {
    throw new Error('Cannot reveal Thing now');
  }
  
  if (game.deck.length > 0) {
    throw new Error('Cannot reveal Thing until deck is empty');
  }
  
  // Place any remaining hand cards
  for (let p = 0; p < game.players.length; p++) {
    const hand = game.hands[p];
    while (hand.length > 0) {
      // Find valid placement for remaining cards
      const positions = [];
      
      // Generate all possible adjacent positions
      for (const gridPos of Object.keys(game.grid)) {
        const [x, y] = gridPos.split(',').map(Number);
        for (const [dx, dy] of DIRECTIONS) {
          const newPos = `${x + dx},${y + dy}`;
          if (isValidPlacement(game.grid, newPos)) {
            positions.push(newPos);
          }
        }
      }
      
      if (positions.length === 0) {
        // No valid placements, discard remaining cards
        break;
      }
      
      // Place card at random valid position
      const position = positions[Math.floor(Math.random() * positions.length)];
      const card = hand.pop();
      game.grid[position] = card;
    }
  }
  
  // Find escape path
  const { connected, exitPosition, path } = findEscapePath(game.grid, game.thingSuit);

  game.phase = 'revealed';
  game.gameEnded = true;
  game.winner = connected ? 'humans' : 'thing';
  game.exitPosition = exitPosition;
  game.escapePath = path;

  // Update score
  if (!game.score) {
    game.score = { humans: 0, thing: 0, rounds: 0 };
  }
  game.score.rounds += 1;
  if (game.winner === 'humans') {
    game.score.humans += 1;
  } else {
    game.score.thing += 1;
  }

  game.lastActivity = Date.now();

  return { game };
}

// Play again - reset game but keep players and score
function playAgain(game, playerId) {
  if (!game.players.some(p => p.id === playerId)) {
    throw new Error('Not in this game');
  }

  if (game.phase !== 'revealed') {
    throw new Error('Game must be finished to play again');
  }

  // Keep score, players, and variant setting, reset everything else
  const score = game.score || { humans: 0, thing: 0, rounds: 0 };
  const players = game.players;
  const queensVariant = game.queensVariant || false;

  // Reassign secret suits
  const shuffledSuits = [...SUITS].sort(() => Math.random() - 0.5);
  players.forEach((player, index) => {
    player.secretSuit = shuffledSuits[index % SUITS.length];
  });

  // Choose new Thing suit first
  const thingSuit = SUITS[Math.floor(Math.random() * SUITS.length)];

  // Create new deck (with Queens variant if enabled)
  const deck = createDeck(queensVariant, thingSuit);
  const hands = Array(players.length).fill(null).map(() => []);

  // Deal 3 cards to each player
  for (let i = 0; i < 3; i++) {
    for (let p = 0; p < players.length; p++) {
      if (deck.length > 0) {
        hands[p].push(deck.pop());
      }
    }
  }

  game.grid = {
    '0,0': { value: 0, suit: 'neutral' }
  };
  game.thingSuit = thingSuit;
  game.deck = deck;
  game.hands = hands;
  game.gameStarted = true;
  game.gameEnded = false;
  game.phase = 'playing';
  game.currentPlayerIndex = 0;
  game.winner = undefined;
  game.exitPosition = undefined;
  game.escapePath = undefined;
  game.score = score;
  game.queensVariant = queensVariant;
  game.lastActivity = Date.now();

  return { game };
}

module.exports = {
  createGame,
  joinGame,
  startGame,
  placeCard,
  revealThing,
  playAgain,
  isValidPlacement,
  findEscapePath
};