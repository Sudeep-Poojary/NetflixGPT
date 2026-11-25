import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import PosterBackdrop from "./PosterBackdrop";

const GptSearch = () => {
  return (
    // `isolate` keeps the -z-10 backdrop above body's background
    <div className="relative isolate flex-1">
      <PosterBackdrop dim="strong" />
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
