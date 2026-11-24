import { IMG_CDN_URL } from "../utils/constants";

export const CARD_WIDTH = "w-32 sm:w-40 md:w-48";

export const MovieCardSkeleton = () => (
  <div className={`${CARD_WIDTH} shrink-0`}>
    <div className="aspect-2/3 w-full rounded-lg skeleton" />
  </div>
);

const MovieCard = ({ movie }) => {
  const { poster_path, title, original_title, vote_average, release_date } = movie;
  if (!poster_path) return null;

  const year = release_date?.slice(0, 4);
  const name = title ?? original_title;

  return (
    <div
      className={`group/card relative ${CARD_WIDTH} shrink-0 snap-start cursor-pointer rounded-lg transition duration-300 ease-out hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-black/70`}
      tabIndex={0}
    >
      <img
        alt={name}
        src={IMG_CDN_URL + poster_path}
        loading="lazy"
        className="aspect-2/3 w-full rounded-lg bg-surface object-cover ring-1 ring-white/5"
      />

      {/* Details revealed on hover / keyboard focus */}
      <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-linear-to-t from-black/95 via-black/40 to-transparent p-3 opacity-0 transition duration-300 group-hover/card:opacity-100 group-focus/card:opacity-100">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-white">
          {name}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted">
          {vote_average > 0 && (
            <span className="flex items-center gap-1 text-fg">
              <span className="text-amber-400">★</span>
              {vote_average.toFixed(1)}
            </span>
          )}
          {year && <span>{year}</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
