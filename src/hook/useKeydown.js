import { useEffect } from "react";

function useKeydown(key, callback) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
}

export default useKeydown;
