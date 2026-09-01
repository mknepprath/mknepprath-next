import { NextApiRequest, NextApiResponse } from 'next';

// Types
interface Card {
  value: number;
  suit: 'spades' | 'hearts' | 'clubs' | 'diamonds' | 'neutral';
}

interface Player {
  id: string;
  name: string;
  secretSuit: string;
  connected: boolean;
  lastSeen: number;
}

interface GameState {
  id: string;
  players: Player[];
  grid: { [key: string]: Card };
  currentPlayerIndex: number;
  deck: Card[];
  hands: Card[][];
  gameStarted: boolean;
  gameEnded: boolean;
  thingSuit?: string;
  winner?: 'humans' | 'thing';
  phase: 'waiting' | 'playing' | 'revealed';
  createdAt: number;
  lastActivity: number;
}

// In-memory storage (in production, use Redis or a database)
const games = new Map<string, GameState>();
const playerGames = new Map<string, string>();

const SUITS = ['spades', 'hearts', 'clubs', 'diamonds'] as const;
const SAME_COLOR = {
  hearts: 'diamonds',
  diamonds: 'hearts', 
  spades: 'clubs',
  clubs: 'spades'
} as const;

const DIRECTIONS = [[0,1], [0,-1], [1,0], [-1,0]];

// Cleanup old games (older than 2 hours)
function cleanupGames() {
  const now = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;
  
  for (const [gameId, game] of games.entries()) {
    if (now - game.lastActivity > twoHours) {
      // Remove all players from this game
      for (const player of game.players) {
        playerGames.delete(player.id);
      }
      games.delete(gameId);
    }
  }
}

// Generate a 6-character game code
function generateGameCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate a unique player ID
function generatePlayerId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Create a shuffled deck
function createDeck(): Card[] {
  const deck: Card[] = [];
  
  // Add numbered cards (Ace through 10) for each suit
  for (const suit of SUITS) {
    for (let value = 1; value <= 10; value++) {
      deck.push({ value, suit });
    }
  }
  
  // Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

// Check if placement violates 2x2 rule
function violates2x2Rule(grid: { [key: string]: Card }, position: string): boolean {
  const [x, y] = position.split(',').map(Number);
  const gridPositions = new Set([...Object.keys(grid), position]);
  
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
      if (hasRect) return true;
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
      if (hasRect) return true;
    }
  }

  return false;
}

// Check if position is valid for placement
function isValidPlacement(grid: { [key: string]: Card }, position: string): boolean {
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

// Find path from start to exit after reveal
function findEscapePath(grid: { [key: string]: Card }, thingSuit: string): { connected: boolean; exitPosition?: string } {
  const exitSuit = SAME_COLOR[thingSuit as keyof typeof SAME_COLOR];
  
  // Build filtered grid (remove Thing suit cards except start)
  const filteredGrid: { [key: string]: Card } = {};
  for (const [pos, card] of Object.entries(grid)) {
    if (card.suit === 'neutral' || card.suit !== thingSuit) {
      filteredGrid[pos] = card;
    }
  }
  
  // Find the exit (10 of exit suit)
  let exitPosition: string | undefined;
  for (const [pos, card] of Object.entries(filteredGrid)) {
    if (card.value === 10 && card.suit === exitSuit) {
      exitPosition = pos;
      break;
    }
  }
  
  if (!exitPosition) return { connected: false };
  
  // BFS from start (0,0) to exit
  const visited = new Set<string>();
  const queue = ['0,0'];
  visited.add('0,0');
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current === exitPosition) {
      return { connected: true, exitPosition };
    }
    
    const [x, y] = current.split(',').map(Number);
    
    for (const [dx, dy] of DIRECTIONS) {
      const nextPos = `${x + dx},${y + dy}`;
      
      if (!visited.has(nextPos) && filteredGrid[nextPos]) {
        visited.add(nextPos);
        queue.push(nextPos);
      }
    }
  }
  
  return { connected: false, exitPosition };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  cleanupGames();
  
  const { method } = req;
  
  if (method === 'POST') {
    const { action } = req.body;
    
    switch (action) {
      case 'create': {
        const { playerName } = req.body;
        
        if (!playerName || playerName.trim().length === 0) {
          return res.status(400).json({ error: 'Player name required' });
        }
        
        const gameCode = generateGameCode();
        const playerId = generatePlayerId();
        
        // Assign random secret suit
        const secretSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
        
        const game: GameState = {
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
          createdAt: Date.now(),
          lastActivity: Date.now()
        };
        
        games.set(gameCode, game);
        playerGames.set(playerId, gameCode);
        
        return res.json({ gameCode, playerId, game });
      }
      
      case 'join': {
        const { gameCode, playerName } = req.body;
        
        if (!gameCode || !playerName || playerName.trim().length === 0) {
          return res.status(400).json({ error: 'Game code and player name required' });
        }
        
        const game = games.get(gameCode.toUpperCase());
        if (!game) {
          return res.status(404).json({ error: 'Game not found' });
        }
        
        if (game.gameStarted) {
          return res.status(400).json({ error: 'Game already started' });
        }
        
        if (game.players.length >= 4) {
          return res.status(400).json({ error: 'Game is full' });
        }
        
        const playerId = generatePlayerId();
        
        // Assign random secret suit from remaining suits
        const usedSuits = new Set(game.players.map(p => p.secretSuit));
        const availableSuits = SUITS.filter(suit => !usedSuits.has(suit));
        const secretSuit = availableSuits[Math.floor(Math.random() * availableSuits.length)];
        
        game.players.push({
          id: playerId,
          name: playerName.trim(),
          secretSuit,
          connected: true,
          lastSeen: Date.now()
        });
        
        game.lastActivity = Date.now();
        playerGames.set(playerId, gameCode);
        
        return res.json({ gameCode, playerId, game });
      }
      
      case 'start': {
        const { gameCode, playerId } = req.body;
        
        const game = games.get(gameCode);
        if (!game) {
          return res.status(404).json({ error: 'Game not found' });
        }
        
        if (!game.players.some(p => p.id === playerId)) {
          return res.status(403).json({ error: 'Not in this game' });
        }
        
        if (game.players.length < 2) {
          return res.status(400).json({ error: 'Need at least 2 players' });
        }
        
        if (game.gameStarted) {
          return res.status(400).json({ error: 'Game already started' });
        }
        
        // Initialize game
        const deck = createDeck();
        const hands: Card[][] = Array(game.players.length).fill(null).map(() => []);
        
        // Deal 3 cards to each player
        for (let i = 0; i < 3; i++) {
          for (let p = 0; p < game.players.length; p++) {
            if (deck.length > 0) {
              hands[p].push(deck.pop()!);
            }
          }
        }
        
        // Place the starting Queen (Thing card) at center
        const thingSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
        game.grid = {
          '0,0': { value: 0, suit: 'neutral' } // Hidden Queen
        };
        game.thingSuit = thingSuit; // Hidden until reveal
        
        game.deck = deck;
        game.hands = hands;
        game.gameStarted = true;
        game.phase = 'playing';
        game.currentPlayerIndex = 0;
        game.lastActivity = Date.now();
        
        return res.json({ game });
      }
      
      case 'placeCard': {
        const { gameCode, playerId, cardIndex, position } = req.body;
        
        const game = games.get(gameCode);
        if (!game) {
          return res.status(404).json({ error: 'Game not found' });
        }
        
        const playerIndex = game.players.findIndex(p => p.id === playerId);
        if (playerIndex === -1) {
          return res.status(403).json({ error: 'Not in this game' });
        }
        
        if (!game.gameStarted || game.gameEnded) {
          return res.status(400).json({ error: 'Game not in progress' });
        }
        
        if (game.currentPlayerIndex !== playerIndex) {
          return res.status(400).json({ error: 'Not your turn' });
        }
        
        if (!isValidPlacement(game.grid, position)) {
          return res.status(400).json({ error: 'Invalid placement' });
        }
        
        const hand = game.hands[playerIndex];
        if (cardIndex < 0 || cardIndex >= hand.length) {
          return res.status(400).json({ error: 'Invalid card' });
        }
        
        // Draw a card first (if deck not empty)
        if (game.deck.length > 0) {
          hand.push(game.deck.pop()!);
        }
        
        // Place the card
        const card = hand.splice(cardIndex, 1)[0];
        game.grid[position] = card;
        
        // Next player's turn
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
        game.lastActivity = Date.now();
        
        return res.json({ game });
      }
      
      case 'reveal': {
        const { gameCode, playerId } = req.body;
        
        const game = games.get(gameCode);
        if (!game) {
          return res.status(404).json({ error: 'Game not found' });
        }
        
        if (!game.players.some(p => p.id === playerId)) {
          return res.status(403).json({ error: 'Not in this game' });
        }
        
        if (game.phase !== 'playing' || game.deck.length > 0) {
          return res.status(400).json({ error: 'Cannot reveal yet' });
        }
        
        // Reveal the Thing
        const { connected } = findEscapePath(game.grid, game.thingSuit!);
        
        game.phase = 'revealed';
        game.gameEnded = true;
        game.winner = connected ? 'humans' : 'thing';
        game.lastActivity = Date.now();
        
        return res.json({ game });
      }
      
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  }
  
  if (method === 'GET') {
    const { gameCode, playerId } = req.query;
    
    if (!gameCode || !playerId) {
      return res.status(400).json({ error: 'Game code and player ID required' });
    }
    
    const game = games.get(gameCode as string);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    // Update player's last seen time
    const player = game.players.find(p => p.id === playerId);
    if (player) {
      player.lastSeen = Date.now();
      player.connected = true;
    }
    
    // Mark players as disconnected if they haven't been seen in 30 seconds
    const disconnectThreshold = 30000;
    const now = Date.now();
    for (const p of game.players) {
      p.connected = (now - p.lastSeen) < disconnectThreshold;
    }
    
    game.lastActivity = Date.now();
    
    return res.json({ game });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}