const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Game state storage
const games = new Map();
const playerGames = new Map();
const chessGames = new Map();
const chessPlayerGames = new Map();

// Game logic imports
const { createGame, joinGame, startGame, placeCard, revealThing, playAgain } = require('./lib/game-server.js');
const chessServer = require('./lib/chess-server.js');

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: '/api/socketio',
    addTrailingSlash: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Socket.IO namespace for the game
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
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('joinGame', async (data) => {
      try {
        const gameCode = data.gameCode.toUpperCase();
        const game = games.get(gameCode);

        if (!game) {
          throw new Error('Game not found');
        }

        const result = joinGame(game, data.playerName, socket.id);
        playerGames.set(socket.id, gameCode);

        socket.join(gameCode);
        socket.emit('gameJoined', { gameId: gameCode, playerId: socket.id });

        // Update all players in the game
        gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);

        console.log(`Player ${data.playerName} joined game ${gameCode}`);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('startGame', async (data) => {
      try {
        const gameCode = data.gameCode;
        const game = games.get(gameCode);

        if (!game) {
          throw new Error('Game not found');
        }

        const queensVariant = data.queensVariant || false;
        const result = startGame(game, socket.id, queensVariant);
        gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);

        console.log(`Game started: ${gameCode} (Queens Variant: ${queensVariant})`);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('placeCard', async (data) => {
      try {
        const gameCode = data.gameCode;
        const game = games.get(gameCode);

        if (!game) {
          throw new Error('Game not found');
        }

        const result = placeCard(game, socket.id, data.cardIndex, data.position);
        gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);

        console.log(`Card placed in game ${gameCode} at ${data.position}`);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('revealThing', async (data) => {
      try {
        const gameCode = data.gameCode;
        const game = games.get(gameCode);

        if (!game) {
          throw new Error('Game not found');
        }

        const result = revealThing(game, socket.id);
        gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);

        console.log(`Thing revealed in game ${gameCode}: ${result.game.thingSuit}`);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('playAgain', async (data) => {
      try {
        const gameCode = data.gameCode;
        const game = games.get(gameCode);

        if (!game) {
          throw new Error('Game not found');
        }

        const result = playAgain(game, socket.id);
        gameNamespace.to(gameCode).emit('gameStateUpdate', result.game);

        console.log(`New round started in game ${gameCode}`);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
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

            // Notify other players
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
          if (player) {
            player.connected = true;
            player.lastSeen = Date.now();
          }
        }
      }
    });
  });

  // Clean up old games every 5 minutes
  setInterval(() => {
    const now = Date.now();
    const maxAge = 2 * 60 * 60 * 1000; // 2 hours

    for (const [gameCode, game] of games.entries()) {
      if (now - game.lastActivity > maxAge) {
        console.log(`Cleaning up old game: ${gameCode}`);

        // Remove player mappings
        for (const player of game.players) {
          playerGames.delete(player.id);
        }

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
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Socket.IO server ready`);
  });
});
