import { useState, useEffect } from "react";

export default function (query, apiUrl, delay = 2000) {
    const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  useEffect(() => {
    if (!debouncedQuery.trim() || !apiUrl) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        if (result.Response === "False") {
          throw new Error(result.Error);
        }

        setData(result.Search || result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, apiUrl]);

  return { data, isLoading, error };
}
