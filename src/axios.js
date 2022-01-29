import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    // params: {
    //     api_key: "d2e79296fabab05d2cce5298c7a9b5fe",
    //     language: "en-US"
    // }
});


export default instance;