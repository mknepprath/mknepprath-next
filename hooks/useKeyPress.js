import { useEffect } from "react";

export default function useKeyPress(key, callback) {
  useEffect(() => {
    const handler = function(event) {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [key, callback]);
}
