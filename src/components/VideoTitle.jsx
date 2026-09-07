const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-14 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="py-6 text-sm w-1/3">{overview}</p>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded bg-white px-6 py-2 text-base font-semibold text-black transition duration-150 hover:bg-white/80">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>
        <button className="flex items-center gap-2 rounded bg-gray-500/40 px-6 py-2 text-base font-semibold text-white backdrop-blur-sm transition duration-150 hover:bg-gray-500/25">
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
