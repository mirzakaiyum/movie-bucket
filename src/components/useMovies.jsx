import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_OMDB_KEY;

export function useMovies(query) {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
    //   callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok)
            throw new Error("Something went wrong with Fetching movies");

          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMoviesData(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMoviesData([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return {moviesData, isLoading, error};
}
