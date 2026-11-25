import { useSelector } from "react-redux";
import MovieList, { MovieListSkeleton } from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, isLoading } = useSelector(
    (store) => store.gpt,
  );

  if (!isLoading && !movieNames) return null;

  return (
    <section className="mt-10 pb-16 space-y-2">
      {isLoading
        ? Array.from({ length: 3 }, (_, i) => <MovieListSkeleton key={i} />)
        : movieNames.map((movieName, index) => (
            <MovieList
              key={`${index}-${movieName}`}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
    </section>
  );
};

export default GptMovieSuggestions;
