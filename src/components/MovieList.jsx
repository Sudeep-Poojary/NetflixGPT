import { useRef } from "react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";

const ArrowButton = ({ direction, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    className={`absolute top-0 bottom-0 z-20 hidden w-12 items-center justify-center opacity-0 transition group-hover/row:opacity-100 focus:opacity-100 md:flex ${
      direction === "left"
        ? "left-0 bg-linear-to-r from-bg to-transparent"
        : "right-0 bg-linear-to-l from-bg to-transparent"
    }`}
  >
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-fg ring-1 ring-white/10 backdrop-blur transition hover:scale-110 hover:bg-surface-2">
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path
          d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </button>
);

export const MovieListSkeleton = ({ title }) => (
  <section className="px-4 md:px-12">
    {title ? (
      <h2 className="py-3 font-display text-2xl tracking-wide text-fg md:text-3xl">
        {title}
      </h2>
    ) : (
      <div className="my-4 h-6 w-40 rounded skeleton" />
    )}
    <div className="flex gap-3 overflow-hidden py-3 md:gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  </section>
);

const MovieList = ({ title, movies }) => {
  const rowRef = useRef(null);

  if (!movies) return <MovieListSkeleton title={title} />;

  const visibleMovies = movies.filter((movie) => movie.poster_path);
  if (!visibleMovies.length) return null;

  const scroll = (direction) => {
    const row = rowRef.current;
    if (!row) return;
    const amount = row.clientWidth * 0.8;
    row.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="px-4 md:px-12">
      <h2 className="py-3 font-display text-2xl tracking-wide text-fg md:text-3xl">
        {title}
      </h2>

      <div className="group/row relative -mx-4 md:-mx-12">
        <ArrowButton direction="left" onClick={() => scroll("left")} />

        <div
          ref={rowRef}
          className="scrollbar-hide flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-3 md:scroll-px-12 md:gap-4 md:px-12"
        >
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <ArrowButton direction="right" onClick={() => scroll("right")} />
      </div>
    </section>
  );
};

export default MovieList;
