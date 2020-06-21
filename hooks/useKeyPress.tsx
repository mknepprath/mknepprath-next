import React from "react";

export default function useKeyPress(
  key: KeyboardEvent["key"],
  callback: () => void
) {
  React.useEffect(() => {
    const handler = function (event: KeyboardEvent) {
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
