import React, { useEffect, useState } from "react";
import Loader from "./ui/Loader";
import StarRating from "./ui/StarRating";
export default function MovieDetails({
  idObj,
  romoveIdHandler,
  setWatched,
  setIdMovie,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  const getMovieDetails = async (idObj) => {
    const KEY = "f84fc31d";
    const url = `http://www.omdbapi.com/?apikey=${KEY}&i=${idObj}`;

    try {
      setIsLoading(true);
      setError(null);
      //   setStatusMessage(""); // حذف پیام قبلی در حالت بارگذاری

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      setMovieDetails(data);
      setIsLoading(true);
      console.log("data", data);
      // setStatusMessage("اوکی! داده‌ها بارگذاری شد."); // پیام موفقیت
    } catch (error) {
      setError(error.message);
      // setStatusMessage("نه! خطا در بارگذاری داده‌ها."); // پیام خطا
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (idObj) {
      getMovieDetails(idObj);
    }
  }, [idObj]);

  const handleRatingChange = (rating) => {
    setUserRating(rating); // ذخیره امتیاز کاربر
    const imdbRating = parseFloat(movieDetails.imdbRating) || 0;
    const avgRating = (rating + imdbRating) / 2;
    setAverageRating(avgRating.toFixed(1));
  };

  const handleAddToList = () => {
    const watchedMovie = {
      imdbID: movieDetails.imdbID,
      title: movieDetails.Title,
      poster: movieDetails.Poster,
      runtime: movieDetails.Runtime,
      userRating: userRating,
      averageRating: averageRating,
    };

    // ذخیره در state
    if (setWatched) setWatched((prevWatched) => [...prevWatched, watchedMovie]);

    const existingWatched = JSON.parse(localStorage.getItem("watched")) || [];
    const updatedWatched = [...existingWatched, watchedMovie];
    localStorage.setItem("watched", JSON.stringify(updatedWatched));
    alert("add to list");
    setIdMovie("");
  };

  return (
    <div className="container-moviedetails">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div onClick={() => romoveIdHandler()} className="backMovie">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19l-7-7 7-7"></path>
              <path d="M22 19v-2a4 4 0 0 0-4-4H3"></path>
            </svg>
          </div>

          {movieDetails && (
            <div className="datails-movie">
              <div className="poster-container">
                <div className="poster-img">
                  <img
                    className="no-img"
                    alt="noimage"
                    src={movieDetails?.Poster}
                  />
                </div>
                <div className="decT">
                  <h2>{movieDetails.Title}</h2>
                  <div className="rate-relesed">
                    <h3>{movieDetails.Released}</h3>
                    <h4>{movieDetails.Runtime}</h4>
                  </div>
                  <div className="rate-relesed">
                    <p>{movieDetails.imdbRating < 7 ? "👎" : "👍"}</p>
                    <p>imdbRating:</p>
                    <p>{movieDetails.imdbRating}</p>
                  </div>
                </div>
              </div>
              <StarRating
                maxRating={10}
                color="gold"
                buttonText="Add to List"
                onRatingChange={handleRatingChange}
                onButtonClick={handleAddToList}
              />

              <div className="description-movie">
                <p>{movieDetails.Plot}</p>
                <p>{movieDetails.Actors}</p>
              </div>
           
            </div>
          )}
        </>
      )}
    </div>
  );
}
