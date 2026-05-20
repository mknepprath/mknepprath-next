# Chess Server Integration

Add a `/chess` Socket.IO namespace to this game server so the chess page at mknepprath.com/chess can connect.

Two files need to change:

1. **Replace `game-server-standalone.js`** with the contents below
2. **Create `lib/chess-server.js`** with the contents below

Then commit and push to master so Railway redeploys.

---

## File 1: game-server-standalone.js (full replacement)

```js
// Standalone Socket.IO server for Who Goes There?
// Deploy this to Railway/Heroku separately from the main Next.js app

const { createServer } = require('http');
const { Server } = require('socket.io');
const { createGame, joinGame, startGame, placeCard, revealThing } = require('./lib/game-server.js');
const chessServer = require('./lib/chess-server.js');

// Game state storage
const games = new Map();
const playerGames = new Map();
const chessGames = new Map();
const chessPlayerGames = new Map();

const server = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', games: games.size, timestamp: new Date().toISOString() }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Who Goes There? Game Server\n');
});

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true }
});

const gameNamespace = io.of('/who-goes-there');

gameNamespace.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on('createGame', async (data) => {
    try {
      const result = createGame(data.playerName, socket.id);
      games.set(result.gameCode, result.game);
      playerGames.set(socket.id, result.gameCode);
      socket.join(result.gameCode);
      socket.emit('gameCreated', { gameId: result.gameCode, playerId: socket.id });
      socket.emit('gameStateUpdate', result.game);
      console.log(`Game created: ${result.gameCode} by ${data.playerName}`);
    } catch (error) { socket.emit('error', { message: error.message }); }
  });

  socket.on('joinGame', async (data) => {
    try {
      const gameCode = data.gameCode.toUpperCase();
      const game = games.get(gameCode);
      if (!game) throw new Error('Game not found');
      const result = joinGame(game, data.playerName, socket.id);
      playerGames.set(socket.id, gameCode);
      socket.join(gameCode);
      socket.emit('gameJoined', { gameId: gameCode, playerId: socket.id });
      gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);
      console.log(`Player ${data.playerName} joined game ${gameCode}`);
    } catch (error) { socket.emit('error', { message: error.message }); }
  });

  socket.on('startGame', async (data) => {
    try {
      const gameCode = data.gameCode;
      const game = games.get(gameCode);
      if (!game) throw new Error('Game not found');
      const result = startGame(game, socket.id);
      gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);
      console.log(`Game started: ${gameCode}`);
    } catch (error) { socket.emit('error', { message: error.message }); }
  });

  socket.on('placeCard', async (data) => {
    try {
      const gameCode = data.gameCode;
      const game = games.get(gameCode);
      if (!game) throw new Error('Game not found');
      const result = placeCard(game, socket.id, data.cardIndex, data.position);
      gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);
      console.log(`Card placed in game ${gameCode} at ${data.position}`);
    } catch (error) { socket.emit('error', { message: error.message }); }
  });

  socket.on('revealThing', async (data) => {
    try {
      const gameCode = data.gameCode;
      const game = games.get(gameCode);
      if (!game) throw new Error('Game not found');
      const result = revealThing(game, socket.id);
      gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);
      console.log(`Thing revealed in game ${gameCode}: ${result.game.thingSuit}`);
    } catch (error) { socket.emit('error', { message: error.message }); }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    const gameCode = playerGames.get(socket.id);
    if (gameCode) {
      const game = games.get(gameCode);
      if (game) {
        const player = game.players.find(p => p.id === socket.id);
        if (player) {
          player.connected = false;
          player.lastSeen = Date.now();
          gameNamespace.to(gameCode).emit('gameStateUpdate', game);
        }
      }
      playerGames.delete(socket.id);
    }
  });

  socket.on('heartbeat', () => {
    const gameCode = playerGames.get(socket.id);
    if (gameCode) {
      const game = games.get(gameCode);
      if (game) {
        const player = game.players.find(p => p.id === socket.id);
        if (player) { player.connected = true; player.lastSeen = Date.now(); }
      }
    }
  });
});

setInterval(() => {
  const now = Date.now();
  const maxAge = 2 * 60 * 60 * 1000;
  for (const [gameCode, game] of games.entries()) {
    if (now - game.lastActivity > maxAge) {
      console.log(`Cleaning up old game: ${gameCode}`);
      for (const player of game.players) playerGames.delete(player.id);
      games.delete(gameCode);
    }
  }
}, 5 * 60 * 1000);

// --- Chess namespace ---
const chessNamespace = io.of('/chess');

chessNamespace.on('connection', (socket) => {
  console.log(`Chess player connected: ${socket.id}`);

  socket.on('createGame', (data) => {
    try {
      const result = chessServer.createGame(data.playerName, socket.id);
      chessGames.set(result.gameCode, result.game);
      chessPlayerGames.set(socket.id, result.gameCode);
      socket.join(result.gameCode);
      socket.emit('gameCreated', { gameId: result.gameCode, playerId: socket.id });
      socket.emit('gameStateUpdate', result.game);
    } catch (e) { socket.emit('error', { message: e.message }); }
  });

  socket.on('joinGame', (data) => {
    try {
      const gameCode = data.gameCode.toUpperCase();
      const game = chessGames.get(gameCode);
      if (!game) throw new Error('Game not found');
      const result = chessServer.joinGame(game, data.playerName, socket.id);
      chessPlayerGames.set(socket.id, gameCode);
      socket.join(gameCode);
      socket.emit('gameJoined', { gameId: gameCode, playerId: socket.id });
      chessNamespace.to(gameCode).emit('gameStateUpdate', result.game);
    } catch (e) { socket.emit('error', { message: e.message }); }
  });

  socket.on('startGame', (data) => {
    try {
      const game = chessGames.get(data.gameCode);
      if (!game) throw new Error('Game not found');
      const result = chessServer.startGame(game, socket.id);
      chessNamespace.to(data.gameCode).emit('gameStateUpdate', result.game);
    } catch (e) { socket.emit('error', { message: e.message }); }
  });

  socket.on('movePiece', (data) => {
    try {
      const game = chessGames.get(data.gameCode);
      if (!game) throw new Error('Game not found');
      const result = chessServer.moveChessPiece(game, socket.id, data.from, data.to);
      chessNamespace.to(data.gameCode).emit('gameStateUpdate', result.game);
    } catch (e) { socket.emit('error', { message: e.message }); }
  });

  socket.on('playAgain', (data) => {
    try {
      const game = chessGames.get(data.gameCode);
      if (!game) throw new Error('Game not found');
      const result = chessServer.playAgain(game, socket.id);
      chessNamespace.to(data.gameCode).emit('gameStateUpdate', result.game);
    } catch (e) { socket.emit('error', { message: e.message }); }
  });

  socket.on('disconnect', () => {
    const gameCode = chessPlayerGames.get(socket.id);
    if (gameCode) {
      const game = chessGames.get(gameCode);
      if (game) {
        const player = game.players.find(p => p.id === socket.id);
        if (player) { player.connected = false; player.lastSeen = Date.now(); }
        chessNamespace.to(gameCode).emit('gameStateUpdate', game);
      }
      chessPlayerGames.delete(socket.id);
    }
  });

  socket.on('heartbeat', () => {
    const gameCode = chessPlayerGames.get(socket.id);
    if (gameCode) {
      const game = chessGames.get(gameCode);
      if (game) {
        const player = game.players.find(p => p.id === socket.id);
        if (player) { player.connected = true; player.lastSeen = Date.now(); }
      }
    }
  });
});

setInterval(() => {
  const now = Date.now();
  const maxAge = 2 * 60 * 60 * 1000;
  for (const [code, game] of chessGames.entries()) {
    if (now - game.lastActivity > maxAge) {
      for (const p of game.players) chessPlayerGames.delete(p.id);
      chessGames.delete(code);
    }
  }
}, 5 * 60 * 1000);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`> Game Server ready on port ${port}`);
  console.log(`> Socket.IO ready at ws://localhost:${port}/who-goes-there`);
  console.log(`> Chess Socket.IO ready at ws://localhost:${port}/chess`);
});
```

---

## File 2: lib/chess-server.js (new file)

```js
const COOLDOWN_MS = 1500;

function generateGameCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function fileIndex(file) { return file.charCodeAt(0) - 97; }
function toPos(f, r) { return `${String.fromCharCode(97 + f)}${r + 1}`; }
function fromPos(pos) { return { f: fileIndex(pos[0]), r: parseInt(pos[1]) - 1 }; }

function initialBoard() {
  const board = {};
  const backRank = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  for (let f = 0; f < 8; f++) {
    board[toPos(f, 0)] = { type: backRank[f], color: 'white' };
    board[toPos(f, 1)] = { type: 'pawn', color: 'white' };
    board[toPos(f, 6)] = { type: 'pawn', color: 'black' };
    board[toPos(f, 7)] = { type: backRank[f], color: 'black' };
  }
  return board;
}

function getLegalMoves(board, from, color) {
  const piece = board[from];
  if (!piece || piece.color !== color) return [];

  const { f, r } = fromPos(from);
  const moves = [];

  const slide = (df, dr) => {
    let tf = f + df, tr = r + dr;
    while (tf >= 0 && tf <= 7 && tr >= 0 && tr <= 7) {
      const dest = toPos(tf, tr);
      const dp = board[dest];
      if (dp) {
        if (dp.color !== color) moves.push(dest);
        break;
      }
      moves.push(dest);
      tf += df; tr += dr;
    }
  };

  const step = (df, dr) => {
    const tf = f + df, tr = r + dr;
    if (tf < 0 || tf > 7 || tr < 0 || tr > 7) return;
    const dest = toPos(tf, tr);
    if (!board[dest] || board[dest].color !== color) moves.push(dest);
  };

  switch (piece.type) {
    case 'pawn': {
      const dir = color === 'white' ? 1 : -1;
      const startR = color === 'white' ? 1 : 6;
      const fwd = toPos(f, r + dir);
      if (r + dir >= 0 && r + dir <= 7 && !board[fwd]) {
        moves.push(fwd);
        if (r === startR) {
          const fwd2 = toPos(f, r + dir * 2);
          if (!board[fwd2]) moves.push(fwd2);
        }
      }
      for (const df of [-1, 1]) {
        const tf = f + df, tr = r + dir;
        if (tf >= 0 && tf <= 7 && tr >= 0 && tr <= 7) {
          const cap = toPos(tf, tr);
          if (board[cap] && board[cap].color !== color) moves.push(cap);
        }
      }
      break;
    }
    case 'knight':
      for (const [df, dr] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])
        step(df, dr);
      break;
    case 'bishop':
      for (const [df, dr] of [[-1,-1],[-1,1],[1,-1],[1,1]]) slide(df, dr);
      break;
    case 'rook':
      for (const [df, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) slide(df, dr);
      break;
    case 'queen':
      for (const [df, dr] of [[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]])
        slide(df, dr);
      break;
    case 'king':
      for (const [df, dr] of [[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]])
        step(df, dr);
      break;
  }

  return moves;
}

function isInCheck(board, color) {
  let kingPos = null;
  for (const [pos, piece] of Object.entries(board)) {
    if (piece.type === 'king' && piece.color === color) { kingPos = pos; break; }
  }
  if (!kingPos) return false;
  const opp = color === 'white' ? 'black' : 'white';
  for (const pos of Object.keys(board)) {
    if (board[pos].color === opp) {
      if (getLegalMoves(board, pos, opp).includes(kingPos)) return true;
    }
  }
  return false;
}

function createGame(playerName, playerId) {
  if (!playerName || !playerName.trim()) throw new Error('Player name required');
  const gameCode = generateGameCode();
  const game = {
    id: gameCode,
    players: [{ id: playerId, name: playerName.trim(), color: 'white', connected: true, lastSeen: Date.now() }],
    board: {},
    cooldowns: {},
    inCheck: { white: false, black: false },
    gameStarted: false,
    gameEnded: false,
    winner: null,
    winnerName: null,
    status: 'waiting',
    createdAt: Date.now(),
    lastActivity: Date.now(),
  };
  return { gameCode, game };
}

function joinGame(game, playerName, playerId) {
  if (!playerName || !playerName.trim()) throw new Error('Player name required');
  if (game.gameStarted) throw new Error('Game already started');
  if (game.players.length >= 2) throw new Error('Game is full');
  if (game.players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase()))
    throw new Error('Name already taken');
  game.players.push({ id: playerId, name: playerName.trim(), color: 'black', connected: true, lastSeen: Date.now() });
  game.lastActivity = Date.now();
  return { game };
}

function startGame(game, playerId) {
  if (!game.players.some(p => p.id === playerId)) throw new Error('Not in this game');
  if (game.players.length < 2) throw new Error('Need 2 players to start');
  if (game.gameStarted) throw new Error('Game already started');
  game.board = initialBoard();
  game.cooldowns = {};
  game.inCheck = { white: false, black: false };
  game.gameStarted = true;
  game.gameEnded = false;
  game.winner = null;
  game.winnerName = null;
  game.status = 'playing';
  game.lastActivity = Date.now();
  return { game };
}

function moveChessPiece(game, playerId, from, to) {
  if (!game.gameStarted || game.gameEnded) throw new Error('Game not in progress');
  const player = game.players.find(p => p.id === playerId);
  if (!player) throw new Error('Not in this game');
  const piece = game.board[from];
  if (!piece) throw new Error('No piece at source');
  if (piece.color !== player.color) throw new Error('Not your piece');
  const now = Date.now();
  if (game.cooldowns[from] && game.cooldowns[from] > now) throw new Error('Piece is on cooldown');
  const legal = getLegalMoves(game.board, from, player.color);
  if (!legal.includes(to)) throw new Error('Illegal move');
  const captured = game.board[to];
  const kingCaptured = captured && captured.type === 'king';
  game.board[to] = { ...piece };
  delete game.board[from];
  delete game.cooldowns[from];
  game.cooldowns[to] = now + COOLDOWN_MS;
  if (piece.type === 'pawn') {
    const { r } = fromPos(to);
    if ((player.color === 'white' && r === 7) || (player.color === 'black' && r === 0)) {
      game.board[to].type = 'queen';
    }
  }
  game.inCheck = {
    white: isInCheck(game.board, 'white'),
    black: isInCheck(game.board, 'black'),
  };
  game.lastActivity = now;
  if (kingCaptured) {
    game.gameEnded = true;
    game.winner = playerId;
    game.winnerName = player.name;
    game.status = 'ended';
  }
  return { game };
}

function playAgain(game, playerId) {
  if (!game.players.some(p => p.id === playerId)) throw new Error('Not in this game');
  if (!game.gameEnded) throw new Error('Game is not over');
  game.players.forEach(p => { p.color = p.color === 'white' ? 'black' : 'white'; });
  game.board = initialBoard();
  game.cooldowns = {};
  game.inCheck = { white: false, black: false };
  game.gameStarted = true;
  game.gameEnded = false;
  game.winner = null;
  game.winnerName = null;
  game.status = 'playing';
  game.lastActivity = Date.now();
  return { game };
}

module.exports = { createGame, joinGame, startGame, moveChessPiece, playAgain, getLegalMoves };
```
