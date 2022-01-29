import "./Row.css";
import { useEffect, useState } from "react";
import axios from "./axios.js";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl]  = useState("");

  // A snipped of code which runs based on a specific condition
  useEffect(() => {
    console.log("useEffect");
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }

    const handleClick = async (movie) => {
      console.log(movie.id);
      // if (trailerUrl) {
      //   setTrailerUrl("");
      // } else {
      //   movieTrailer(movie?.name || "")
      //     .then((url) => {
      //       console.log(url);
      //       const urlParams = new URLSearchParams(new URL(url).search);
      //       setTrailerUrl(urlParams.get("v"));
      //     })
      //     .catch((error) => console.log(error));
      // }

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=d2e79296fabab05d2cce5298c7a9b5fe&append_to_response=videos`
      );
      console.log(data);
      const videoId = data.videos.results[0].key;

      if(data.videos && data.videos.results){
        // finding the official trailer from results
        const trailer = data.videos.results.find(video => video.name === "Official Trailer");
        console.log(trailer);
        // if trailer is found, set the trailer url
        if(trailer){
          setTrailerUrl("")
          setTrailerUrl(trailer.key);

        }else{
            // if trailer is not found, set the trailer url to the first trailer
            setTrailerUrl("")
            setTrailerUrl(data.videos.results[0].key);
          }
      }
      

    }

  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>

      {/* container -> posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
