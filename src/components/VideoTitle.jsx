const VideoTitle = ({ title, overview, rating, year }) => {
  return (
    <div className="absolute inset-0 z-10 text-fg">
      {/* Light gradients: enough for readable text while keeping the trailer visible */}
      <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-bg/75 via-bg/25 via-40% to-transparent md:w-2/3" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bg via-bg/40 to-transparent" />

      {/* Content sits in the lower-left, above where the first movie row overlaps */}
      <div className="relative flex h-full flex-col justify-end px-5 pb-12 md:px-12 md:pb-[16%]">
        <div className="max-w-sm md:max-w-md lg:max-w-lg">
          <div className="mb-2 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted md:text-xs">
            <span className="rounded-sm bg-primary px-1.5 py-0.5 text-white">
              Now Playing
            </span>
            {rating > 0 && (
              <span className="flex items-center gap-1 text-fg">
                <span className="text-amber-400">★</span>
                {rating.toFixed(1)}
              </span>
            )}
            {year && <span>{year}</span>}
          </div>

          <h1 className="font-display text-4xl leading-none tracking-wide drop-shadow-lg md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-3 hidden text-sm leading-relaxed text-fg/80 line-clamp-2 sm:block lg:line-clamp-3">
            {overview}
          </p>

          <div className="mt-4 flex items-center gap-2.5">
            <button className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover md:h-10 md:px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>

            <button className="flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 md:h-10 md:px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
