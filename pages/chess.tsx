import Head from "@core/head";
import React, { useCallback, useEffect, useRef, startTransition, useState } from "react";
import { io, Socket } from "socket.io-client";
import styles from "./chess.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
type Color = "white" | "black";

interface Piece {
  type: PieceType;
  color: Color;
}

interface Player {
  id: string;
  name: string;
  color: Color;
  connected: boolean;
  isBot?: boolean;
}

interface ChessGame {
  id: string;
  singlePlayer?: boolean;
  players: Player[];
  board: Record<string, Piece>;
  cooldowns: Record<string, number>;
  inCheck: { white: boolean; black: boolean };
  gameStarted: boolean;
  gameEnded: boolean;
  winner: string | null;
  winnerName: string | null;
  status: "waiting" | "playing" | "ended";
}

// ── Constants ──────────────────────────────────────────────────────────────

const PIECE_GLYPHS: Record<Color, Record<PieceType, string>> = {
  white: { king: "♔", queen: "♕", rook: "♖", bishop: "♗", knight: "♘", pawn: "♙" },
  black: { king: "♚", queen: "♛", rook: "♜", bishop: "♝", knight: "♞", pawn: "♟" },
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const COOLDOWN_MS = 1500;

// ── Move calculation (mirrors chess-server.js) ────────────────────────────

function fileIdx(f: string) { return f.charCodeAt(0) - 97; }
function toPos(f: number, r: number) { return `${String.fromCharCode(97 + f)}${r + 1}`; }
function fromPos(pos: string) { return { f: fileIdx(pos[0]), r: parseInt(pos[1]) - 1 }; }

function getLegalMoves(board: Record<string, Piece>, from: string, color: Color): string[] {
  const piece = board[from];
  if (!piece || piece.color !== color) return [];

  const { f, r } = fromPos(from);
  const moves: string[] = [];

  const slide = (df: number, dr: number) => {
    let tf = f + df, tr = r + dr;
    while (tf >= 0 && tf <= 7 && tr >= 0 && tr <= 7) {
      const dest = toPos(tf, tr);
      const dp = board[dest];
      if (dp) { if (dp.color !== color) moves.push(dest); break; }
      moves.push(dest);
      tf += df; tr += dr;
    }
  };

  const step = (df: number, dr: number) => {
    const tf = f + df, tr = r + dr;
    if (tf < 0 || tf > 7 || tr < 0 || tr > 7) return;
    const dest = toPos(tf, tr);
    if (!board[dest] || board[dest].color !== color) moves.push(dest);
  };

  switch (piece.type) {
    case "pawn": {
      const dir = color === "white" ? 1 : -1;
      const startR = color === "white" ? 1 : 6;
      const fwd = toPos(f, r + dir);
      if (r + dir >= 0 && r + dir <= 7 && !board[fwd]) {
        moves.push(fwd);
        if (r === startR) { const fwd2 = toPos(f, r + dir * 2); if (!board[fwd2]) moves.push(fwd2); }
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
    case "knight":
      for (const [df, dr] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])
        step(df, dr);
      break;
    case "bishop": for (const [df, dr] of [[-1,-1],[-1,1],[1,-1],[1,1]]) slide(df, dr); break;
    case "rook":   for (const [df, dr] of [[0,1],[0,-1],[1,0],[-1,0]]) slide(df, dr); break;
    case "queen":
      for (const [df, dr] of [[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]])
        slide(df, dr);
      break;
    case "king":
      for (const [df, dr] of [[0,1],[0,-1],[1,0],[-1,0],[-1,-1],[-1,1],[1,-1],[1,1]])
        step(df, dr);
      break;
  }

  return moves;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function Chess(): React.ReactNode {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<ChessGame | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [myColor, setMyColor] = useState<Color | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [joinMode, setJoinMode] = useState<"create" | "join" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [opponentCursor, setOpponentCursor] = useState<{ hover: string | null; selected: string | null }>({ hover: null, selected: null });

  // Keep stable refs to avoid stale closures in socket callbacks
  const myColorRef = useRef(myColor);
  const gameCodeRef = useRef(gameCode);
  const playerIdRef = useRef(playerId);
  const socketRef = useRef<Socket | null>(null);
  const selectedSquareRef = useRef<string | null>(null);
  const hoveredSquareRef = useRef<string | null>(null);

  useEffect(() => { myColorRef.current = myColor; }, [myColor]);
  useEffect(() => { gameCodeRef.current = gameCode; }, [gameCode]);
  useEffect(() => { playerIdRef.current = playerId; }, [playerId]);
  useEffect(() => { socketRef.current = socket; }, [socket]);
  useEffect(() => { selectedSquareRef.current = selectedSquare; }, [selectedSquare]);

  const emitCursor = useCallback((hover: string | null, selected: string | null) => {
    socketRef.current?.emit("cursorUpdate", { gameCode: gameCodeRef.current, hover, selected });
  }, []);

  // Tick for cooldown countdowns
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

  // Socket setup
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_GAME_SERVER_URL || "";
    const newSocket = io(`${url}/chess`, {
      ...(url ? {} : { path: "/api/socketio" }),
      transports: ["websocket", "polling"],
    });

    startTransition(() => setSocket(newSocket));

    newSocket.on("connect", () => {
      setConnectionError(false);
      const gc = gameCodeRef.current;
      const pid = playerIdRef.current;
      if (gc && pid) {
        // Socket reconnected mid-game; re-associate the new socket ID with our player slot.
        newSocket.emit("rejoinGame", { gameCode: gc, playerId: pid });
        setPlayerId(newSocket.id!);
      }
    });
    newSocket.on("connect_error", () => setConnectionError(true));

    newSocket.on("gameCreated", ({ gameId, playerId: pid }: { gameId: string; playerId: string }) => {
      setGameCode(gameId);
      setPlayerId(pid);
      setMyColor("white");
      myColorRef.current = "white";
    });

    newSocket.on("gameJoined", ({ gameId, playerId: pid }: { gameId: string; playerId: string }) => {
      setGameCode(gameId);
      setPlayerId(pid);
    });

    newSocket.on("gameStateUpdate", (state: ChessGame) => {
      setGameState(state);
      // Resolve our color from the updated player list
      const pid = newSocket.id;
      const me = state.players.find((p) => p.id === pid);
      if (me) {
        setMyColor(me.color);
        myColorRef.current = me.color;
      }
      // Clear selection when game ends
      if (state.gameEnded) { setSelectedSquare(null); setLegalMoves([]); }
    });

    newSocket.on("opponentCursor", (data: { hover: string | null; selected: string | null }) => {
      setOpponentCursor(data);
    });

    newSocket.on("error", ({ message }: { message: string }) => {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(""), 3000);
    });

    const hb = setInterval(() => newSocket.emit("heartbeat"), 5000);

    return () => {
      clearInterval(hb);
      newSocket.disconnect();
    };
  }, []);

  // ── Actions ──

  const handlePlayVsBot = () => {
    if (!socket || !playerName.trim()) return;
    socket.emit("createSinglePlayerGame", { playerName: playerName.trim() });
    setJoinMode("create");
  };

  const handleCreate = () => {
    if (!socket || !playerName.trim()) return;
    socket.emit("createGame", { playerName: playerName.trim() });
    setJoinMode("create");
  };

  const handleJoin = () => {
    if (!socket || !playerName.trim() || !inputCode.trim()) return;
    socket.emit("joinGame", { playerName: playerName.trim(), gameCode: inputCode.trim() });
    setJoinMode("join");
  };

  const handleStart = () => {
    if (!socket || !gameCode) return;
    socket.emit("startGame", { gameCode });
  };

  const handlePlayAgain = () => {
    if (!socket || !gameCode) return;
    socket.emit("playAgain", { gameCode });
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  // ── Board interaction ──

  const selectSquare = useCallback((sq: string) => {
    if (!gameState) return;
    const color = myColorRef.current;
    if (!color) return;
    const coolUntil = gameState.cooldowns?.[sq] ?? 0;
    if (coolUntil > Date.now()) return; // on cooldown
    const moves = getLegalMoves(gameState.board, sq, color);
    selectedSquareRef.current = sq;
    setSelectedSquare(sq);
    setLegalMoves(moves);
    emitCursor(hoveredSquareRef.current, sq);
  }, [gameState, emitCursor]);

  const handleSquareClick = useCallback((sq: string) => {
    if (!gameState?.gameStarted || gameState.gameEnded || !myColor || !socket || !gameCode) return;
    const piece = gameState.board[sq];

    if (selectedSquare) {
      if (legalMoves.includes(sq)) {
        socket.emit("movePiece", { gameCode, from: selectedSquare, to: sq });
        selectedSquareRef.current = null;
        setSelectedSquare(null);
        setLegalMoves([]);
        emitCursor(hoveredSquareRef.current, null);
      } else if (piece && piece.color === myColor) {
        selectSquare(sq);
      } else {
        selectedSquareRef.current = null;
        setSelectedSquare(null);
        setLegalMoves([]);
        emitCursor(hoveredSquareRef.current, null);
      }
    } else {
      if (piece && piece.color === myColor) selectSquare(sq);
    }
  }, [gameState, myColor, socket, gameCode, selectedSquare, legalMoves, selectSquare, emitCursor]);

  // ── Render helpers ──

  const renderBoard = () => {
    if (!gameState?.board) return null;

    // White: rank 8 at top → ranks 8..1, files a..h
    // Black: rank 1 at top → ranks 1..8, files h..a (flipped)
    const rankOrder = myColor === "black" ? [1,2,3,4,5,6,7,8] : [8,7,6,5,4,3,2,1];
    const fileOrder = myColor === "black" ? ["h","g","f","e","d","c","b","a"] : FILES;

    return rankOrder.flatMap((rank, ri) =>
      fileOrder.map((file, fi) => {
        const sq = `${file}${rank}`;
        const piece = gameState.board[sq];
        const isLight = (fileIdx(file) + rank) % 2 === 1;
        const isSelected = selectedSquare === sq;
        const isLegal = legalMoves.includes(sq);
        const isCapture = isLegal && !!piece;
        const coolUntil = gameState.cooldowns?.[sq] ?? 0;
        const onCooldown = coolUntil > now;
        const coolFrac = onCooldown ? Math.max(0, (coolUntil - now) / COOLDOWN_MS) : 0;

        const showRankLabel = fi === 0;
        const showFileLabel = ri === 7;
        const isOpponentSelected = opponentCursor.selected === sq;
        const isOpponentHover = opponentCursor.hover === sq && !isOpponentSelected;

        return (
          <div
            key={sq}
            className={[
              styles.square,
              isLight ? styles.light : styles.dark,
              isSelected ? styles.selected : "",
              isLegal && !isCapture ? styles.legalMove : "",
              isCapture ? styles.legalCapture : "",
              isOpponentSelected ? styles.opponentSelected : "",
              isOpponentHover ? styles.opponentHover : "",
            ].filter(Boolean).join(" ")}
            onClick={() => handleSquareClick(sq)}
            onMouseEnter={() => {
              hoveredSquareRef.current = sq;
              emitCursor(sq, selectedSquareRef.current);
            }}
          >
            {showRankLabel && (
              <span className={styles.rankLabel}>{rank}</span>
            )}
            {showFileLabel && (
              <span className={styles.fileLabel}>{file}</span>
            )}
            {piece && (
              <span className={[
                styles.piece,
                piece.color === "white" ? styles.whitePiece : styles.blackPiece,
                onCooldown ? styles.cooldownPiece : "",
              ].filter(Boolean).join(" ")}>
                {PIECE_GLYPHS[piece.color][piece.type]}
              </span>
            )}
            {onCooldown && (
              <>
                <div className={styles.cooldownBar} style={{ width: `${coolFrac * 100}%` }} />
                <div className={styles.cooldownOverlay}>
                  <span className={styles.cooldownBadge}>
                    {((coolUntil - now) / 1000).toFixed(1)}s
                  </span>
                </div>
              </>
            )}
            {(isOpponentHover || isOpponentSelected) && (
              <span className={styles.opponentHand}>👆</span>
            )}
          </div>
        );
      })
    );
  };

  // ── Render phases ──

  if (connectionError) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Chess</h1>
        <p className={styles.error}>Could not connect to game server.</p>
      </div>
    );
  }

  // Lobby
  if (!gameCode) {
    return (
      <div className={styles.page}>
        <Head title="Chess" />
        <h1 className={styles.title}>Chess</h1>
        <p className={styles.subtitle}>Real-time · no turns · move as fast as you can</p>
        <div className={styles.lobby}>
          <input
            className={styles.input}
            placeholder="Your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePlayVsBot()}
            maxLength={20}
          />
          {joinMode === "join" && (
            <input
              className={styles.input}
              placeholder="Game code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              maxLength={6}
              autoFocus
            />
          )}
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handlePlayVsBot}
            disabled={!playerName.trim() || joinMode === "join"}
            style={{ width: "100%" }}
          >
            Play vs Bot
          </button>
          <div className={styles.lobbyButtons}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleCreate}
              disabled={!playerName.trim() || joinMode === "join"}
            >
              New game
            </button>
            {joinMode === "join" ? (
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleJoin}
                disabled={!playerName.trim() || !inputCode.trim()}
              >
                Join
              </button>
            ) : (
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={() => setJoinMode("join")}
                disabled={!playerName.trim()}
              >
                Join game
              </button>
            )}
          </div>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </div>
      </div>
    );
  }

  // Waiting room
  if (!gameState?.gameStarted) {
    const canStart = (gameState?.players.length ?? 0) >= 2 && gameState?.players.some(p => p.id === playerId);
    return (
      <div className={styles.page}>
        <Head title="Chess" />
        <h1 className={styles.title}>Chess</h1>
        <div className={styles.waiting}>
          <p>Share this code with your opponent:</p>
          <div className={styles.gameCode}>{gameCode}</div>
          <ul className={styles.playerList}>
            {gameState?.players.map((p) => (
              <li key={p.id}>
                <span className={`${styles.colorDot} ${p.color === "white" ? styles.colorDotWhite : styles.colorDotBlack}`} />
                {p.name} {p.id === playerId && "(you)"}
              </li>
            ))}
            {(gameState?.players.length ?? 0) < 2 && (
              <li style={{ opacity: 0.5 }}>Waiting for opponent…</li>
            )}
          </ul>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleStart}
            disabled={!canStart}
            style={{ width: "100%" }}
          >
            Start game
          </button>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        </div>
      </div>
    );
  }

  // End screen
  if (gameState.gameEnded) {
    const iWon = gameState.winner === playerId;
    return (
      <div className={styles.page}>
        <Head title="Chess" />
        <h1 className={styles.title}>Chess</h1>
        <div className={styles.endScreen}>
          <div className={styles.endTitle}>{iWon ? "You win! 🏆" : `${gameState.winnerName} wins`}</div>
          <p className={styles.endSubtitle}>{iWon ? "You captured the king." : "The king was captured."}</p>
          <div className={styles.board} style={{ marginBottom: 0 }}>
            {renderBoard()}
          </div>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handlePlayAgain}
            style={{ width: "100%" }}
          >
            {gameState.singlePlayer ? "Play again" : "Play again (colors swap)"}
          </button>
        </div>
      </div>
    );
  }

  // Active game
  const me = gameState.players.find((p) => p.id === playerId);
  const opponent = gameState.players.find((p) => p.id !== playerId);
  const myInCheck = myColor ? gameState.inCheck[myColor] : false;
  const oppInCheck = myColor ? gameState.inCheck[myColor === "white" ? "black" : "white"] : false;

  return (
    <div className={styles.page}>
      <Head title="Chess" />
      <div className={styles.gameLayout}>
        <div className={styles.playerInfo}>
          {opponent && (
            <div className={`${styles.playerTag} ${oppInCheck ? styles.inCheck : ""}`}>
              <span>{PIECE_GLYPHS[opponent.color].king}</span>
              {opponent.name}
              {oppInCheck && " — check!"}
            </div>
          )}
          {me && (
            <div className={`${styles.playerTag} ${styles.isYou} ${myInCheck ? styles.inCheck : ""}`}>
              <span>{PIECE_GLYPHS[me.color].king}</span>
              {me.name} (you)
              {myInCheck && " — check!"}
            </div>
          )}
        </div>

        <div
          className={styles.board}
          onMouseLeave={() => {
            hoveredSquareRef.current = null;
            emitCursor(null, selectedSquareRef.current);
          }}
        >{renderBoard()}</div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>
    </div>
  );
}
