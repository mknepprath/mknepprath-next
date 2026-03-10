import Head from "@core/head";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./lilt.module.css";

const API_URL = "https://lilt.up.railway.app";

interface GameState {
  position: string;
  inventory: Record<string, { quantity: number }>;
  events: Record<string, Record<string, string>>;
}

interface LogEntry {
  type: "move" | "response";
  text: string;
}

export default function Lilt(): React.ReactNode {
  const [state, setState] = useState<GameState | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLUListElement>(null);

  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 480;

  // Lock body scroll on mobile so the page doesn't bounce
  useEffect(() => {
    if (!isMobile()) return;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  const scrollToBottom = () => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  // On iOS, the keyboard doesn't shrink the viewport — it overlaps it.
  // Use visualViewport to pin the container to the actual visible area.
  useEffect(() => {
    if (!isMobile()) return;
    if (typeof window === "undefined" || !window.visualViewport) return;
    const vv = window.visualViewport;
    const update = () => {
      if (!containerRef.current) return;
      containerRef.current.style.height = `${vv.height}px`;
      containerRef.current.style.transform = `translateY(${vv.offsetTop}px)`;
      scrollToBottom();
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

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
    startGame();
  }, [startGame]);

  const submitMove = async (e: React.FormEvent) => {
    e.preventDefault();
    const move = input.trim();
    if (!move || loading || !state) return;

    if (move.toLowerCase() === "restart") {
      setInput("");
      await startGame();
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
    inputRef.current?.focus();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={styles.container} onClick={focusInput}>
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
            disabled={!state || loading}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
          />
        </form>
      </div>
    </div>
  );
}
