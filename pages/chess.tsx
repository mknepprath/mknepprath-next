import Head from "@core/head";
import React, { useCallback, useEffect, useRef, startTransition, useState } from "react";
import { io, Socket } from "socket.io-client";
import styles from "./chess.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
type Color = "white" | "black" | "red" | "green";

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
  mapId?: string;
  singlePlayer?: boolean;
  players: Player[];
  board: Record<string, Piece>;
  cooldowns: Record<string, number>;
  inCheck: Record<string, boolean>;
  gameStarted: boolean;
  gameEnded: boolean;
  winner: string | null;
  winnerName: string | null;
  status: "waiting" | "playing" | "ended";
}

interface PlayerSlot {
  color: Color;
  homeFiles: number[];
  backR: number;
  pawnR: number;
  pawnStartR: number;
  promoteR: number;
  dir: number;
}

interface MapDef {
  id: string;
  name: string;
  files: number;
  ranks: number;
  active: Set<string> | null;
  maxPlayers: number;
  playerSlots?: PlayerSlot[];
  whitePawnStartR?: number;
  blackPawnStartR?: number;
  whitePromoteR?: number;
  blackPromoteR?: number;
}

// ── Map definitions (mirrors chess-maps.js) ───────────────────────────────

function buildDumbbellActive(): Set<string> {
  const s = new Set<string>();
  const p = (f: number, r: number) => `${String.fromCharCode(97 + f)}${r + 1}`;
  for (let r = 0; r < 4; r++) for (let f = 0; f < 6; f++) s.add(p(f, r));
  for (let r = 4; r < 10; r++) for (const f of [2, 3]) s.add(p(f, r));
  for (let r = 10; r < 14; r++) for (let f = 0; f < 6; f++) s.add(p(f, r));
  return s;
}

function buildSwitchbackActive(): Set<string> {
  const s = new Set<string>();
  const add = (f1: number, f2: number, r1: number, r2: number) => {
    for (let f = f1; f <= f2; f++)
      for (let r = r1; r <= r2; r++)
        s.add(`${String.fromCharCode(97 + f)}${r + 1}`);
  };
  add(0, 3, 0, 2); add(6, 9, 0, 2); add(0, 3, 9, 11); add(6, 9, 9, 11);
  add(3, 4, 3, 5); add(5, 6, 3, 4); add(3, 6, 4, 5);
  add(2, 3, 5, 8); add(6, 7, 4, 8); add(3, 7, 7, 8);
  add(2, 3, 8, 9); add(6, 7, 8, 9);
  return s;
}

function buildWishboneActive(): Set<string> {
  const s = new Set<string>();
  const add = (f1: number, f2: number, r1: number, r2: number) => {
    for (let f = f1; f <= f2; f++)
      for (let r = r1; r <= r2; r++)
        s.add(`${String.fromCharCode(97 + f)}${r + 1}`);
  };
  add(0, 3, 0, 2);  // White home (a-d, ranks 1-3)
  add(6, 9, 0, 2);  // Green home (g-j, ranks 1-3)
  add(3, 4, 3, 5);  // White exit (d-e, ranks 4-6)
  add(5, 6, 3, 4);  // Green exit (f-g, ranks 4-5)
  add(3, 6, 4, 5);  // Lower crossing (d-g, ranks 5-6)
  add(4, 5, 5, 7);  // Stem (e-f, ranks 6-8)
  add(3, 6, 8, 10); // Red home (d-g, ranks 9-11)
  return s;
}

const CLIENT_MAPS: Record<string, MapDef> = {
  standard: {
    id: "standard", name: "Standard", files: 8, ranks: 8, active: null, maxPlayers: 2,
    whitePawnStartR: 1, blackPawnStartR: 6, whitePromoteR: 7, blackPromoteR: 0,
  },
  dumbbell: {
    id: "dumbbell", name: "The Dumbbell", files: 6, ranks: 14, active: buildDumbbellActive(), maxPlayers: 2,
    whitePawnStartR: 1, blackPawnStartR: 12, whitePromoteR: 13, blackPromoteR: 0,
  },
  switchback: {
    id: "switchback", name: "The Switchback", files: 10, ranks: 12, active: buildSwitchbackActive(), maxPlayers: 4,
    playerSlots: [
      { color: "white", homeFiles: [0,1,2,3], backR: 0,  pawnR: 1,  pawnStartR: 1,  promoteR: 11, dir:  1 },
      { color: "green", homeFiles: [6,7,8,9], backR: 0,  pawnR: 1,  pawnStartR: 1,  promoteR: 11, dir:  1 },
      { color: "red",   homeFiles: [0,1,2,3], backR: 11, pawnR: 10, pawnStartR: 10, promoteR: 0,  dir: -1 },
      { color: "black", homeFiles: [6,7,8,9], backR: 11, pawnR: 10, pawnStartR: 10, promoteR: 0,  dir: -1 },
    ],
  },
  wishbone: {
    id: "wishbone", name: "The Wishbone", files: 10, ranks: 11, active: buildWishboneActive(), maxPlayers: 3,
    playerSlots: [
      { color: "white", homeFiles: [0,1,2,3], backR: 0,  pawnR: 1,  pawnStartR: 1,  promoteR: 10, dir:  1 },
      { color: "green", homeFiles: [6,7,8,9], backR: 0,  pawnR: 1,  pawnStartR: 1,  promoteR: 10, dir:  1 },
      { color: "red",   homeFiles: [3,4,5,6], backR: 10, pawnR: 9,  pawnStartR: 9,  promoteR: 0,  dir: -1 },
    ],
  },
};

// ── Constants ──────────────────────────────────────────────────────────────

const PIECE_GLYPHS: Record<Color, Record<PieceType, string>> = {
  white: { king: "♔", queen: "♕", rook: "♖", bishop: "♗", knight: "♘", pawn: "♙" },
  black: { king: "♚", queen: "♛", rook: "♜", bishop: "♝", knight: "♞", pawn: "♟" },
  red:   { king: "♔", queen: "♕", rook: "♖", bishop: "♗", knight: "♘", pawn: "♙" },
  green: { king: "♚", queen: "♛", rook: "♜", bishop: "♝", knight: "♞", pawn: "♟" },
};

const PIECE_CSS: Record<Color, string> = {
  white: styles.whitePiece,
  black: styles.blackPiece,
  red: styles.redPiece,
  green: styles.greenPiece,
};

const PLAYER_TAG_CSS: Record<Color, string> = {
  white: styles.playerTagWhite,
  black: styles.playerTagBlack,
  red: styles.playerTagRed,
  green: styles.playerTagGreen,
};

const COOLDOWN_MS = 1500;

// ── Move calculation (mirrors chess-server.js) ────────────────────────────

function fileIdx(f: string) { return f.charCodeAt(0) - 97; }
function toPos(f: number, r: number) { return `${String.fromCharCode(97 + f)}${r + 1}`; }
function fromPos(pos: string) { return { f: fileIdx(pos[0]), r: parseInt(pos.slice(1)) - 1 }; }

function getPawnConfig(color: Color, map: MapDef): { dir: number; startR: number } {
  if (map.playerSlots) {
    const slot = map.playerSlots.find(s => s.color === color);
    if (slot) return { dir: slot.dir, startR: slot.pawnStartR };
  }
  if (color === "white") return { dir: 1, startR: map.whitePawnStartR ?? 1 };
  return { dir: -1, startR: map.blackPawnStartR ?? 6 };
}

function getLegalMoves(board: Record<string, Piece>, from: string, color: Color, map: MapDef): string[] {
  const piece = board[from];
  if (!piece || piece.color !== color) return [];

  const { f, r } = fromPos(from);
  const moves: string[] = [];

  const canLand = (tf: number, tr: number) => {
    if (tf < 0 || tf >= map.files || tr < 0 || tr >= map.ranks) return false;
    if (map.active && !map.active.has(toPos(tf, tr))) return false;
    return true;
  };

  const slide = (df: number, dr: number) => {
    let tf = f + df, tr = r + dr;
    while (canLand(tf, tr)) {
      const dest = toPos(tf, tr);
      const dp = board[dest];
      if (dp) { if (dp.color !== color) moves.push(dest); break; }
      moves.push(dest);
      tf += df; tr += dr;
    }
  };

  const step = (df: number, dr: number) => {
    const tf = f + df, tr = r + dr;
    if (!canLand(tf, tr)) return;
    const dest = toPos(tf, tr);
    if (!board[dest] || board[dest].color !== color) moves.push(dest);
  };

  switch (piece.type) {
    case "pawn": {
      const { dir, startR } = getPawnConfig(color, map);
      if (canLand(f, r + dir) && !board[toPos(f, r + dir)]) {
        moves.push(toPos(f, r + dir));
        if (r === startR && canLand(f, r + dir * 2) && !board[toPos(f, r + dir * 2)]) {
          moves.push(toPos(f, r + dir * 2));
        }
      }
      for (const df of [-1, 1]) {
        if (canLand(f + df, r + dir)) {
          const cap = toPos(f + df, r + dir);
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

function countAttackers(board: Record<string, Piece>, square: string, attackerColor: Color, map: MapDef): number {
  let count = 0;
  for (const from of Object.keys(board)) {
    if (board[from].color !== attackerColor) continue;
    if (getLegalMoves(board, from, attackerColor, map).includes(square)) count++;
  }
  return count;
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
  const [mapId, setMapId] = useState("standard");
  const [errorMsg, setErrorMsg] = useState("");
  const [connectionError, setConnectionError] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [opponentCursor, setOpponentCursor] = useState<{ hover: string | null; selected: string | null }>({ hover: null, selected: null });

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

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

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
      const me = state.players.find((p) => p.id === newSocket.id);
      if (me) { setMyColor(me.color); myColorRef.current = me.color; }
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
    return () => { clearInterval(hb); newSocket.disconnect(); };
  }, []);

  // ── Actions ──

  const handleReturnToLobby = useCallback(() => {
    setGameCode(""); setGameState(null); setPlayerId(""); setMyColor(null);
    setSelectedSquare(null); setLegalMoves([]); setJoinMode(null);
    gameCodeRef.current = ""; playerIdRef.current = ""; myColorRef.current = null;
  }, []);

  const handlePlayVsBot = () => {
    if (!socket || !playerName.trim()) return;
    socket.emit("createSinglePlayerGame", { playerName: playerName.trim(), mapId });
    setJoinMode("create");
  };

  const handleCreate = () => {
    if (!socket || !playerName.trim()) return;
    socket.emit("createGame", { playerName: playerName.trim(), mapId });
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
    setSelectedSquare(null); setLegalMoves([]);
  };

  // ── Board interaction ──

  const selectSquare = useCallback((sq: string) => {
    if (!gameState) return;
    const color = myColorRef.current;
    if (!color) return;
    const map = CLIENT_MAPS[gameState.mapId ?? "standard"] ?? CLIENT_MAPS.standard;
    if ((gameState.cooldowns?.[sq] ?? 0) > Date.now()) return;
    const moves = getLegalMoves(gameState.board, sq, color, map).filter(to => {
      const target = gameState.board[to];
      if (target?.type === "king") return countAttackers(gameState.board, to, color, map) >= 2;
      return true;
    });
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
        setSelectedSquare(null); setLegalMoves([]);
        emitCursor(hoveredSquareRef.current, null);
      } else if (piece && piece.color === myColor) {
        selectSquare(sq);
      } else {
        selectedSquareRef.current = null;
        setSelectedSquare(null); setLegalMoves([]);
        emitCursor(hoveredSquareRef.current, null);
      }
    } else {
      if (piece && piece.color === myColor) selectSquare(sq);
    }
  }, [gameState, myColor, socket, gameCode, selectedSquare, legalMoves, selectSquare, emitCursor]);

  // ── Render helpers ──

  const renderBoard = (map: MapDef) => {
    if (!gameState?.board) return null;

    const rankList = Array.from({ length: map.ranks }, (_, i) => i + 1);
    const fileList = Array.from({ length: map.files }, (_, i) => String.fromCharCode(97 + i));
    // Multi-player: flip based on slot dir; 2-player: black flips ranks+files
    const mySlot = map.playerSlots?.find(s => s.color === myColor);
    const flipRanks = mySlot ? mySlot.dir === -1 : myColor === "black";
    const flipFiles = map.playerSlots ? false : myColor === "black";
    const rankOrder = flipRanks ? rankList : [...rankList].reverse();
    const fileOrder = flipFiles ? [...fileList].reverse() : fileList;
    const totalRanks = rankOrder.length;

    return rankOrder.flatMap((rank, ri) =>
      fileOrder.map((file, fi) => {
        const sq = `${file}${rank}`;
        const isActive = !map.active || map.active.has(sq);
        const showRankLabel = fi === 0;
        const showFileLabel = ri === totalRanks - 1;

        if (!isActive) {
          return (
            <div key={sq} className={styles.inactiveSquare}>
              {showRankLabel && <span className={styles.rankLabel}>{rank}</span>}
            </div>
          );
        }

        const piece = gameState.board[sq];
        const isLight = (fileIdx(file) + rank) % 2 === 1;
        const isSelected = selectedSquare === sq;
        const isLegal = legalMoves.includes(sq);
        const isCapture = isLegal && !!piece;
        const coolUntil = gameState.cooldowns?.[sq] ?? 0;
        const onCooldown = coolUntil > now;
        const coolFrac = onCooldown ? Math.max(0, (coolUntil - now) / COOLDOWN_MS) : 0;
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
            {showRankLabel && <span className={styles.rankLabel}>{rank}</span>}
            {showFileLabel && <span className={styles.fileLabel}>{file}</span>}
            {piece && (
              <span className={[
                styles.piece,
                PIECE_CSS[piece.color] ?? styles.whitePiece,
                onCooldown ? styles.cooldownPiece : "",
              ].filter(Boolean).join(" ")}>
                {PIECE_GLYPHS[piece.color]?.[piece.type]}
              </span>
            )}
            {onCooldown && (
              <>
                <div className={styles.cooldownBar} style={{ width: `${coolFrac * 100}%` }} />
                <div className={styles.cooldownOverlay}>
                  <span className={styles.cooldownBadge}>{((coolUntil - now) / 1000).toFixed(1)}s</span>
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
        <h1 className={styles.title}>Knepprath&apos;s Double Check Chess</h1>
        <p className={styles.error}>Could not connect to game server.</p>
      </div>
    );
  }

  // Lobby
  if (!gameCode) {
    const selectedMap = CLIENT_MAPS[mapId] ?? CLIENT_MAPS.standard;
    const botUnavailable = (selectedMap.maxPlayers ?? 2) > 2;
    return (
      <div className={styles.page}>
        <Head title="Knepprath's Double Check Chess" />
        <h1 className={styles.title}>Knepprath&apos;s Double Check Chess</h1>
        <p className={styles.subtitle}>Real-time · double check to capture the king</p>
        <div className={styles.lobby}>
          <input
            className={styles.input}
            placeholder="Your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !botUnavailable && handlePlayVsBot()}
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
          <div className={styles.mapSelector}>
            <span className={styles.mapLabel}>Map:</span>
            {Object.values(CLIENT_MAPS).map(m => (
              <button
                key={m.id}
                className={`${styles.btn} ${styles.mapBtn} ${mapId === m.id ? styles.mapBtnSelected : styles.btnSecondary}`}
                onClick={() => setMapId(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>
          {!botUnavailable && (
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handlePlayVsBot}
              disabled={!playerName.trim() || joinMode === "join"}
              style={{ width: "100%" }}
            >
              Play vs Bot
            </button>
          )}
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
    const waitingMap = CLIENT_MAPS[gameState?.mapId ?? mapId] ?? CLIENT_MAPS.standard;
    const maxP = waitingMap.maxPlayers ?? 2;
    const canStart = (gameState?.players.length ?? 0) >= maxP && gameState?.players.some(p => p.id === playerId);
    return (
      <div className={styles.page}>
        <Head title="Knepprath's Double Check Chess" />
        <h1 className={styles.title}>Knepprath&apos;s Double Check Chess</h1>
        <div className={styles.waiting}>
          <p>Share this code with your {maxP - 1 === 1 ? "opponent" : `${maxP - 1} opponents`}:</p>
          <div className={styles.gameCode}>{gameCode}</div>
          <p className={styles.status}>Map: {waitingMap.name} · {maxP} players</p>
          <ul className={styles.playerList}>
            {gameState?.players.map((p) => (
              <li key={p.id}>
                <span className={`${styles.colorDot} ${styles[`colorDot${p.color.charAt(0).toUpperCase() + p.color.slice(1)}`]}`} />
                {p.name} {p.id === playerId && "(you)"}
              </li>
            ))}
            {Array.from({ length: Math.max(0, maxP - (gameState?.players.length ?? 0)) }).map((_, i) => (
              <li key={`empty-${i}`} style={{ opacity: 0.5 }}>Waiting for player…</li>
            ))}
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

  const currentMap = CLIENT_MAPS[gameState.mapId ?? "standard"] ?? CLIENT_MAPS.standard;
  const isMultiPlayer = (currentMap.maxPlayers ?? 2) > 2;
  const boardStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${currentMap.files}, 1fr)`,
    width: `min(${currentMap.files * 60}px, 100vw - 32px)`,
    aspectRatio: `${currentMap.files} / ${currentMap.ranks}`,
  };
  const boardWidth = `min(${currentMap.files * 60}px, 100vw - 32px)`;

  // End screen
  if (gameState.gameEnded) {
    const iWon = gameState.winner === playerId;
    return (
      <div className={styles.page}>
        <Head title="Knepprath's Double Check Chess" />
        <h1 className={styles.title}>Knepprath&apos;s Double Check Chess</h1>
        <div className={styles.endScreen}>
          <div className={styles.endTitle}>{iWon ? "You win! 🏆" : `${gameState.winnerName} wins`}</div>
          <p className={styles.endSubtitle}>{iWon ? "You captured the last king." : "The last king was captured."}</p>
          <div className={styles.board} style={{ ...boardStyle, marginBottom: 0 }}>
            {renderBoard(currentMap)}
          </div>
          {isMultiPlayer ? (
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleReturnToLobby} style={{ width: "100%" }}>
              Return to lobby
            </button>
          ) : (
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handlePlayAgain} style={{ width: "100%" }}>
              {gameState.singlePlayer ? "Play again" : "Play again (colors swap)"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Active game
  const me = gameState.players.find((p) => p.id === playerId);
  const myInCheck = myColor ? (gameState.inCheck[myColor] ?? false) : false;

  return (
    <div className={styles.page}>
      <Head title="Chess" />
      <div className={styles.gameLayout}>
        {isMultiPlayer ? (
          <div className={styles.playerInfo4} style={{ width: boardWidth }}>
            {gameState.players.map(p => {
              const inCheckForP = gameState.inCheck[p.color] ?? false;
              const isMe = p.id === playerId;
              return (
                <div
                  key={p.id}
                  className={[
                    styles.playerTag,
                    PLAYER_TAG_CSS[p.color],
                    isMe ? styles.isYou4 : "",
                    inCheckForP ? styles.inCheck : "",
                  ].filter(Boolean).join(" ")}
                >
                  <span>{PIECE_GLYPHS[p.color].king}</span>
                  {p.name}{isMe && " ✓"}{inCheckForP && " ⚠"}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.playerInfo} style={{ width: boardWidth }}>
            {gameState.players.filter(p => p.id !== playerId).map(opp => (
              <div key={opp.id} className={`${styles.playerTag} ${gameState.inCheck[opp.color] ? styles.inCheck : ""}`}>
                <span>{PIECE_GLYPHS[opp.color].king}</span>
                {opp.name}
                {gameState.inCheck[opp.color] && " — check!"}
              </div>
            ))}
            {me && (
              <div className={`${styles.playerTag} ${styles.isYou} ${myInCheck ? styles.inCheck : ""}`}>
                <span>{PIECE_GLYPHS[me.color].king}</span>
                {me.name} (you){myInCheck && " — check!"}
              </div>
            )}
          </div>
        )}

        <div
          className={styles.board}
          style={boardStyle}
          onMouseLeave={() => {
            hoveredSquareRef.current = null;
            emitCursor(null, selectedSquareRef.current);
          }}
        >{renderBoard(currentMap)}</div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </div>
    </div>
  );
}
