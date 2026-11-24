const VideoTitle = ({ title, overview, rating, year }) => {
  return (
    <div className="absolute inset-0 z-10 text-fg">
      {/* Readability gradients: from the left, and fading into the page at the bottom */}
      <div className="absolute inset-0 bg-linear-to-r from-bg/95 via-bg/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-bg via-bg/60 to-transparent" />

      <div className="relative flex h-full flex-col justify-end px-5 pb-14 md:justify-start md:px-12 md:pb-0 md:pt-[16%] lg:pt-[14%]">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted md:text-sm">
            <span className="rounded bg-primary px-2 py-0.5 text-white">
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

          <h1 className="font-display text-5xl leading-none tracking-wide drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>

          <p className="mt-4 hidden max-w-xl text-sm leading-relaxed text-fg/85 line-clamp-3 sm:block md:text-base">
            {overview}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-md bg-primary px-5 py-2 font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-hover md:px-7 md:py-2.5 md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>

            <button className="flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-2 font-semibold text-white backdrop-blur-md transition hover:bg-white/20 md:px-7 md:py-2.5 md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
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
