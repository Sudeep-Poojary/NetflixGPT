import { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

// Cached across mounts so switching pages doesn't refetch
let cachedPosters = null;

const fetchTrendingPosters = async () => {
  if (cachedPosters) return cachedPosters;
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
    API_OPTIONS,
  );
  if (!res.ok) throw new Error("Failed to load trending movies");
  const json = await res.json();
  cachedPosters = (json.results ?? [])
    .map((movie) => movie.poster_path)
    .filter(Boolean);
  return cachedPosters;
};

/**
 * Full-screen, tilted wall of trending movie posters behind a dark vignette.
 * Falls back to a plain gradient if TMDB can't be reached.
 * `dim` controls how dark the overlay is ("normal" | "strong").
 */
const PosterBackdrop = ({ dim = "normal" }) => {
  const [posters, setPosters] = useState(cachedPosters ?? []);

  useEffect(() => {
    if (cachedPosters) return;
    let ignore = false;
    fetchTrendingPosters()
      .then((result) => !ignore && setPosters(result))
      .catch(() => {
        // Keep the gradient fallback
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Repeat posters so the tilted grid always fills the screen
  const tiles = posters.length
    ? Array.from({ length: 48 }, (_, i) => posters[i % posters.length])
    : [];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
      {/* Gradient fallback / base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,46,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.25),transparent_55%)]" />

      {tiles.length > 0 && (
        <div className="absolute -inset-1/4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 -rotate-12 opacity-60">
          {tiles.map((path, i) => (
            <img
              key={i}
              src={IMG_CDN_URL + path}
              alt=""
              loading="lazy"
              className="aspect-2/3 w-full rounded-md object-cover"
            />
          ))}
        </div>
      )}

      {/* Darkening layers */}
      <div
        className={`absolute inset-0 ${dim === "strong" ? "bg-bg/85" : "bg-bg/65"}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg)_80%)]" />
    </div>
  );
};

export default PosterBackdrop;
