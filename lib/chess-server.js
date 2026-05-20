const COOLDOWN_MS = 1500;

function generateGameCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function fileIndex(file) { return file.charCodeAt(0) - 97; } // 'a'=0
function rankIndex(rank) { return rank - 1; }
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

  // Pawn promotion → queen
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

  // Swap colors
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
