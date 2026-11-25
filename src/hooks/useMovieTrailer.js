import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    // Already in the store: skip the refetch
    if (trailerVideo) return;

    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS,
      );
      const json = await data.json();

      const filterData = json.results.filter(
        (video) => video.type === "Trailer",
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
    };

    getMovieVideos();
  }, [dispatch, movieId, trailerVideo]);
};

export default useMovieTrailer;
