import React, { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  const inputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (document.activeElement === inputRef.current) {
          return;
        }
        inputRef.current.focus();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <input
      className="search"
      ref={inputRef}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
