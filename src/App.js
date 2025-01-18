import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/ui/Search";
import NumList from "./components/NumList";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import StarRating from "./components/ui/StarRating";
import Loader from "./components/ui/Loader";
import ErrorMessage from "./components/ui/ErrorMessage";
import noimgAvatar from "../src/img/no_searching-removebg-preview.png";
import useFetchMovies from "./hook/useFetchMovies";
import MovieDetails from "./components/MovieDetails";
import useKeydown from "./hook/useKeydown";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [movies, setMovies] = useState([]);
  const KEY = "f84fc31d";
  const apiUrl = query
  ? `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  : "";

  const { data: movies, isLoading, error } = useFetchMovies(query, apiUrl, 2000);

  // const [movies2, setMovies2] = useState(null);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [idMovie, setIdMovie] = useState(null);

 
  const setIdHandler = (objMovieId) => {
    // setIdMovie("")
    setIdMovie(objMovieId);
  };
  const romoveIdHandler = () => {
    setIdMovie("");
  };
  const removieMovie = (idObj) => {
    const storedWatched = JSON.parse(localStorage.getItem("watched")) || [];

    const updatedWatched = storedWatched.filter(
      (movie) => movie.imdbID !== idObj
    );

    localStorage.setItem("watched", JSON.stringify(updatedWatched));

    setWatched(updatedWatched);
  };

  useEffect(() => {
    const storedWatched = JSON.parse(localStorage.getItem("watched"));
    if (storedWatched) {
      setWatched(storedWatched);
    }
  }, [idMovie]);

  useEffect(() => {
    if (watched.length > 0) {
      localStorage.setItem("watched", JSON.stringify(watched));
    }
  }, [watched]);


  useKeydown("Escape", romoveIdHandler);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumList movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {error && <ErrorMessage message={error} />}
          {query.trim() === "" ? (
            <div className="img-nosearching-container">
              <div className="img-nocontainer">
                <img className="no-img" src={noimgAvatar} alt="noob" />
              </div>
            </div>
          ) : isLoading ? (
            <Loader />
          ) : (
            <>
              <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
              >
                {isOpen1 ? "–" : "+"}
              </button>
              {isOpen1 && (
                <ul className="list">
                  {movies?.map((movie) => (
                    <li
                      onClick={() => setIdHandler(movie.imdbID)}
                      className="list-movies"
                      key={movie.imdbID}
                    >
                      <img src={movie.Poster} alt={`${movie.Title} poster`} />
                      <h3>{movie.Title}</h3>
                      <div>
                        <p>
                          <span>🗓</span>
                          <span>{movie.Year}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </ListBox>
        <WatchedBox>
          {idMovie ? (
            // اگر idMovie مقدار داشت، MovieDetails رندر می‌شود
            <MovieDetails
              idObj={idMovie}
              romoveIdHandler={romoveIdHandler}
              setIdMovie={setIdMovie}
            />
          ) : (
            <>
              <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
              >
                {isOpen2 ? "–" : "+"}
              </button>
              {isOpen2 && (
                <>
                  <div className="summary">
                    <h2>Movies you watched</h2>
                    <div>
                      <p>
                        <span>#️⃣</span>
                        {/* {watched.length} */}
                        <span> {watched.length} movies</span>
                      </p>
                      <p>
                        <span>⭐️</span>
                        {/* {avgImdbRating.toFixed(1)} */}
                        <span>0</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        {/* {avgUserRating.toFixed(1)} */}
                        <span>0</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        {/* {avgRuntime.toFixed(1)} */}
                        <span> 0 min</span>
                      </p>
                    </div>
                  </div>
                  <ul className="list">
                    {watched.map((movie) => (
                      <li key={movie.imdbID}>
                        <img src={movie.poster} alt={`${movie.Title} poster`} />
                        <div>
                        <h3>{movie.title}</h3>
                          <p>
                            <span>⭐️</span>
                            <span>{movie.averageRating}</span>
                          </p>
                          <p>
                            <span>🌟</span>
                            <span>{movie.userRating}</span>
                          </p>
                          <p>
                            <span>⏳</span>
                            <span>{movie.runtime} min</span>
                          </p>
                        </div>
                        <div
                          onClick={() => removieMovie(movie.imdbID)}
                          className="removeMovie"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="20" // تنظیم عرض به 30 پیکسل
                            height="20" // تنظیم ارتفاع به 30 پیکسل
                            // style={{ width: "50px", height: "50px" }}
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </WatchedBox>
      </Main>
    </>
  );
}
