import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, setGptLoading } from "../utils/gptSlice";
import Alert from "./Alert";

const searchMovieTMDB = async (movie) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(movie) +
      "&include_adult=false&language=en-US&page=1",
    API_OPTIONS,
  );
  if (!res.ok) throw new Error("TMDB search failed");
  const json = await res.json();
  return json.results ?? [];
};

// "1. Sholay, \"Don\"\nGolmaal" -> ["Sholay", "Don", "Golmaal"]
const parseMovieNames = (content = "") =>
  content
    .split(/,|\n/)
    .map((name) => name.replace(/^\s*\d+[.)]\s*/, "").replace(/["'*]/g, "").trim())
    .filter(Boolean)
    .slice(0, 5);

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const isLoading = useSelector((store) => store.gpt.isLoading);
  const hasResults = useSelector((store) => !!store.gpt.movieNames);
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const t = lang[langKey];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = searchText.current.value.trim();
    if (!query || isLoading) return;

    setErrorMessage(null);
    dispatch(setGptLoading(true));
    dispatch(addGptMovieResult({ movieNames: null, movieResults: null }));

    try {
      const gptQuery =
        "Act as a Movie Recommendation System and suggest some movies for the query: " +
        query +
        ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptResults = await openai.chat.completions.create({
        model: "gpt-5.5",
        messages: [{ role: "developer", content: gptQuery }],
      });

      const gptMovies = parseMovieNames(gptResults.choices[0]?.message?.content);
      if (!gptMovies.length) throw new Error("No movies returned");

      const tmdbResults = await Promise.all(gptMovies.map(searchMovieTMDB));

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
      );
    } catch {
      setErrorMessage(t.errorMessage);
    } finally {
      dispatch(setGptLoading(false));
    }
  };

  const isIdle = !hasResults && !isLoading;

  return (
    <div
      className={`mx-auto max-w-2xl px-4 text-center transition-all duration-500 ${
        isIdle ? "pt-[30vh]" : "pt-24 md:pt-32"
      }`}
    >
      <h1 className="font-display text-4xl tracking-wide text-fg sm:text-5xl">
        {t.gptTitle}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <div className="relative min-w-0 flex-1">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={searchText}
            type="text"
            placeholder={t.gptSearchPlaceHolder}
            aria-label={t.gptSearchPlaceHolder}
            className="field h-12 w-full pl-12 pr-4 text-base"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-ai h-12 px-4 text-sm sm:px-6 md:text-base"
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {isLoading ? t.searching : t.search}
        </button>
      </form>

      {errorMessage && <Alert className="mt-4">{errorMessage}</Alert>}
    </div>
  );
};

export default GptSearchBar;
