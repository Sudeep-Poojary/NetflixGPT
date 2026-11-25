import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { BACKDROP_CDN_URL } from "../utils/constants";

const VideoBackground = ({ movieId, backdropPath }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Backdrop still (or shimmer) shown until the trailer is ready */}
      {backdropPath ? (
        <img
          src={BACKDROP_CDN_URL + backdropPath}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 skeleton" />
      )}

      {trailerVideo?.key && (
        <iframe
          // Sized to always cover the hero; scaled up slightly to crop YouTube's chrome
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-125"
          src={
            "https://www.youtube.com/embed/" +
            trailerVideo.key +
            "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
            trailerVideo.key +
            "&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0"
          }
          title="Movie trailer"
          tabIndex={-1}
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      )}

      {/* Overlay that blocks interaction with the embedded player */}
      <div className="absolute inset-0" />
    </div>
  );
};

export default VideoBackground;
