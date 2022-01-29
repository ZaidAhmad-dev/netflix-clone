import './Banner.css'
import React, { useEffect, useState } from 'react';
import axios from './axios.js';
import requests from "./request.js";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)]);

    }
    fetchData();
  }, []);

    function truncate(str, max) {
      return str?.length > max ? str.substr(0, max - 1) + "…" : str;
    }
  

    return (
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          {/* title */}
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* div > 2 buttons */}
          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>
          {/* description */}
          <p className="banner__description">
            {truncate(movie?.overview, 150)}
          </p>
        </div>
        {/* <div className="banner--fadeBottom"/> */}
      </header>
    );
};

export default Banner;
