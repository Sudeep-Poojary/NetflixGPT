import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const HeroSkeleton = () => (
  <div className="relative h-[70vh] w-full md:h-auto md:aspect-video">
    <div className="absolute inset-0 skeleton" />
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bg to-transparent" />
  </div>
);

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies?.length) return <HeroSkeleton />;

  const mainMovie = movies[0];
  const { title, original_title, overview, id, backdrop_path, vote_average, release_date } =
    mainMovie;

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-bg md:h-auto md:aspect-video">
      <VideoBackground movieId={id} backdropPath={backdrop_path} />
      <VideoTitle
        title={title ?? original_title}
        overview={overview}
        rating={vote_average}
        year={release_date?.slice(0, 4)}
      />
    </section>
  );
};

export default MainContainer;
