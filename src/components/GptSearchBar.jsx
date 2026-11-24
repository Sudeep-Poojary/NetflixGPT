import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, setGptLoading } from "../utils/gptSlice";

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
        isIdle ? "pt-[32vh]" : "pt-40 md:pt-32"
      }`}
    >
      <h1 className="font-display text-4xl tracking-wide text-fg md:text-5xl">
        {t.gptTitle}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-bg/70 p-1.5 pl-5 backdrop-blur-xl transition focus-within:border-ai-to/70 focus-within:shadow-[0_0_30px_-12px_var(--color-ai-to)]"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={t.gptSearchPlaceHolder}
          aria-label={t.gptSearchPlaceHolder}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-fg placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-ai-from to-ai-to px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isLoading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {isLoading ? t.searching : t.search}
        </button>
      </form>

      {errorMessage && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default GptSearchBar;
