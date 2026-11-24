import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  useEffect(() => {
    // Already in the store: skip the refetch
    if (nowPlayingMovies) return;

    const getMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?&page=1",
        API_OPTIONS,
      );

      const json = await data.json();

      dispatch(addNowPlayingMovies(json.results));
    };

    getMovies();
  }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;
