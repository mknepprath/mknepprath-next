import NextHead from "next/head";
import Head from "@core/head";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./lilt.module.css";

const API_URL = "https://lilt.up.railway.app";
const STORAGE_KEY = "lilt-session";

interface GameState {
  position: string;
  inventory: Record<string, { quantity: number }>;
  events: Record<string, Record<string, string>>;
}

interface LogEntry {
  type: "move" | "response";
  text: string;
}

// Map layout: each node has a position, label, and connections
const MAP_NODES: Record<string, { x: number; y: number; label: string }> = {
  start:      { x: 0, y: 0, label: "start" },
  room:       { x: 2, y: 0, label: "room" },
  cellar:     { x: 2, y: 1, label: "cellar" },
  tunnels:    { x: 2, y: 2, label: "tunnels" },
  reservoir:  { x: 0, y: 2, label: "reserv." },
  crescent:   { x: 4, y: 0, label: "cresc." },
  garden:     { x: 4, y: 2, label: "garden" },
  spookytown: { x: 6, y: 0, label: "spooky" },
  graveyard:  { x: 8, y: 0, label: "grave" },
  swamp:      { x: 6, y: 1, label: "swamp" },
  tower:      { x: 8, y: 1, label: "tower" },
  void:       { x: 8, y: 2, label: "void" },
};

const MAP_EDGES: [string, string][] = [
  ["start", "room"],
  ["room", "crescent"],
  ["room", "cellar"],
  ["cellar", "tunnels"],
  ["tunnels", "reservoir"],
  ["tunnels", "garden"],
  ["crescent", "garden"],
  ["crescent", "spookytown"],
  ["spookytown", "graveyard"],
  ["spookytown", "swamp"],
  ["spookytown", "tower"],
  ["spookytown", "garden"],
  ["tower", "void"],
];

function buildMap(visited: Set<string>, current: string): string {
  // Grid: each cell is 9 chars wide, 3 lines tall
  const CW = 9;
  const CH = 3;
  const cols = 9;
  const rows = 3;
  const W = cols * CW;
  const H = rows * CH;
  const grid: string[][] = Array.from({ length: H }, () =>
    Array(W).fill(" ")
  );

  const put = (x: number, y: number, s: string) => {
    for (let i = 0; i < s.length; i++) {
      if (x + i >= 0 && x + i < W && y >= 0 && y < H) grid[y][x + i] = s[i];
    }
  };

  // Draw edges first
  for (const [a, b] of MAP_EDGES) {
    const na = MAP_NODES[a];
    const nb = MAP_NODES[b];
    if (!na || !nb) continue;
    const bothVisited = visited.has(a) && visited.has(b);
    const ax = na.x * CW + Math.floor(CW / 2);
    const ay = na.y * CH + 1;
    const bx = nb.x * CW + Math.floor(CW / 2);
    const by = nb.y * CH + 1;

    if (ay === by) {
      // Horizontal
      const minX = Math.min(ax, bx);
      const maxX = Math.max(ax, bx);
      for (let x = minX + 1; x < maxX; x++) {
        put(x, ay, bothVisited ? "-" : "·");
      }
    } else if (ax === bx) {
      // Vertical
      const minY = Math.min(ay, by);
      const maxY = Math.max(ay, by);
      for (let y = minY + 1; y < maxY; y++) {
        put(ax, y, bothVisited ? "|" : "·");
      }
    } else {
      // Diagonal — draw L-shape (go vertical then horizontal)
      const midY = by;
      const minY = Math.min(ay, midY);
      const maxY = Math.max(ay, midY);
      for (let y = minY + 1; y < maxY; y++) {
        put(ax, y, bothVisited ? "|" : "·");
      }
      const minX = Math.min(ax, bx);
      const maxX = Math.max(ax, bx);
      for (let x = minX + 1; x < maxX; x++) {
        put(x, midY, bothVisited ? "-" : "·");
      }
      if (minY !== maxY || minX !== maxX) {
        put(ax, midY, bothVisited ? "+" : "·");
      }
    }
  }

  // Draw nodes on top
  for (const [id, node] of Object.entries(MAP_NODES)) {
    const cx = node.x * CW + Math.floor(CW / 2);
    const cy = node.y * CH + 1;
    const isCurrent = id === current;
    const isVisited = visited.has(id);

    let label: string;
    if (isCurrent) {
      label = `[${node.label.toUpperCase()}]`;
    } else if (isVisited) {
      label = node.label;
    } else {
      label = "?";
    }
    const startX = cx - Math.floor(label.length / 2);
    put(startX, cy, label);
  }

  return grid.map((row) => row.join("").trimEnd()).join("\n");
}

function loadSession(): { state: GameState; log: LogEntry[] } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSession(state: GameState, log: LogEntry[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ state, log }));
  } catch {
    // sessionStorage unavailable (e.g. private browsing)
  }
}

export default function Lilt(): React.ReactNode {
  const [state, setState] = useState<GameState | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  // Save to session storage whenever state or log changes
  useEffect(() => {
    if (state) saveSession(state, log);
  }, [state, log]);

  const startGame = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/start`, { method: "POST" });
      const data = await res.json();
      setState(data.state);
      setLog([{ type: "response", text: data.response }]);
    } catch {
      setLog([{ type: "response", text: "Failed to connect to game server." }]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const saved = loadSession();
    if (saved) {
      setState(saved.state);
      setLog(saved.log);
    } else {
      startGame();
    }
  }, [startGame]);

  const submitMove = async (e: React.FormEvent) => {
    e.preventDefault();
    const move = input.trim();
    if (!move || loading || !state) return;

    if (move.toLowerCase() === "restart") {
      setInput("");
      sessionStorage.removeItem(STORAGE_KEY);
      await startGame();
      return;
    }

    if (move.toLowerCase() === "map") {
      setInput("");
      const visited = new Set(Object.keys(state.events));
      const mapText = buildMap(visited, state.position);
      setLog((prev) => [
        ...prev,
        { type: "move", text: move },
        { type: "response", text: mapText },
      ]);
      return;
    }

    setInput("");
    setLog((prev) => [...prev, { type: "move", text: move }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ move, state }),
      });
      const data = await res.json();
      setState(data.state);
      setLog((prev) => [...prev, { type: "response", text: data.response }]);
    } catch {
      setLog((prev) => [
        ...prev,
        { type: "response", text: "Connection lost. Try again." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container} onClick={() => inputRef.current?.focus()}>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, interactive-widget=resizes-content"
        />
      </NextHead>
      <Head title="Lilt" description="A text adventure game." />
      <div className={styles.header}>
        <img src="/assets/lilt.png" alt="Lilt" className={styles.logo} />
        <p className={styles.subtitle}>a text adventure</p>
      </div>

      <div className={styles.terminal}>
        <ul ref={logRef} className={styles.log}>
          {log.map((entry, i) => (
            <li
              key={i}
              className={`${styles.entry} ${
                entry.type === "move" ? styles.move : styles.response
              }`}
            >
              {entry.text.replace(/\\n/g, "\n")}
            </li>
          ))}
          {loading && (
            <li className={`${styles.entry} ${styles.loading}`}>...</li>
          )}
        </ul>

        <form onSubmit={submitMove} className={styles.inputRow}>
          <span className={styles.prompt}>&gt;</span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={state ? "type a command" : "connecting..."}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!state || loading || !input.trim()}
            aria-label="Send"
          >
            &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
