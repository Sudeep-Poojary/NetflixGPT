const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-14 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-sm w-1/3">{overview}</p>

      <div className="my-4 md:m-0 flex items-center gap-3">
        <button className="flex items-center gap-2 rounded bg-white px-2 md:px-6 py-1 md:py-2 text-base font-semibold text-black transition duration-150 hover:bg-white/80">
          <svg
            className="w-4 md:w-6 h-4 md:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>

        <button className="hidden md:flex items-center gap-2 rounded bg-gray-500/40 px-6 py-2 text-base font-semibold text-white backdrop-blur-sm transition duration-150 hover:bg-gray-500/25">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M12 16v-4M12 8h.01"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
