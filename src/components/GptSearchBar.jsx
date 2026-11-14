import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS,
      ),
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // Make an API call to GPT API and get movie results

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      model: "gpt-5.5",
      messages: [{ role: "developer", content: gptQuery }],
    });
    console.log(gptResults.choices[0].message.content);

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }),
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black/80 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-2 m-4 col-span-9 bg-white rounded-sm"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3 m-4 rounded bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
