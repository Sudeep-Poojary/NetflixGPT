# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NetflixGPT: a Netflix-style movie browsing app (React 19 + Vite) with Firebase email/password auth, movie data from the TMDB API, and an OpenAI-powered "GPT Search" that recommends movies from a free-text query. `README.md` is a chronological log of features built.

## Commands

- `npm run dev`: Vite dev server
- `npm run build`: production build to `dist/`
- `npm run lint`: ESLint (flat config in `eslint.config.js`)
- `npm run preview`: serve the built `dist/`
- Deploy: Vercel, linked to the GitHub repo (pushes trigger deployments). `vercel.json` rewrites all paths to `index.html` for client-side routing. Firebase is used only for authentication; `firebase.json` / `.firebaserc` are leftover Firebase Hosting config and are not used for deploys.

There is no test framework configured.

## Environment

All secrets come from a git-ignored `.env` and are read via `import.meta.env` (so they must be `VITE_`-prefixed):

- `VITE_TMDB_API_TOKEN`: used verbatim as the `Authorization` header (include the `Bearer ` prefix), see `API_OPTIONS` in `src/utils/constants.js`
- `VITE_OPEN_AI_KEY`: OpenAI client in `src/utils/openai.js` (runs in the browser with `dangerouslyAllowBrowser: true`)
- `VITE_FIREBASE_*` (API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID): `src/utils/firebase.js`

## Architecture

- **Build**: Vite with `@vitejs/plugin-react`, the React Compiler (via `@rolldown/plugin-babel` + `reactCompilerPreset`), and Tailwind CSS v4 via `@tailwindcss/vite`. All styling is Tailwind utility classes inline in JSX; there is no Tailwind config file.
- **Routing**: `src/components/Body.jsx` defines a `createBrowserRouter` with two routes: `/` (Login) and `/browse` (Browse). `App.jsx` wraps `Body` in the Redux `Provider`.
- **Auth flow lives in `Header.jsx`**, not in the router: its `onAuthStateChanged` listener dispatches `addUser`/`removeUser` and navigates to `/browse` or `/`. This is the only route guard, so any page needing auth-redirect behaviour must render `Header`. `Login.jsx` handles sign-in/sign-up (validated by `src/utils/validate.js`) and sets displayName/photoURL via `updateProfile` after sign-up.
- **State** (`src/utils/appStore.js`, Redux Toolkit) has four slices:
  - `user`: the current Firebase user (or null)
  - `movies`: TMDB lists (now playing, popular, top rated, upcoming) and the trailer video
  - `gpt`: `showGptSearch` toggle (swaps Browse between the main view and `GptSearch`), plus `movieNames`/`movieResults` from the last GPT search
  - `config`: `lang`, the selected UI language
- **Data fetching** goes through custom hooks in `src/hooks/` (`useNowPlayingMovies`, `usePopularMovies`, etc., called from `Browse.jsx`; `useMovieTrailer` from `VideoBackground`). Each fetches TMDB with `API_OPTIONS` and dispatches into the `movies` slice, and skips the fetch if the store already holds the data (memoization).
- **Browse UI**: `MainContainer` shows the first now-playing movie's YouTube trailer (`VideoBackground`) with `VideoTitle`. `SecondaryContainer` renders several `MovieList` rows of `MovieCard`s (posters via `IMG_CDN_URL`).
- **GPT Search**: `GptSearchBar.jsx` sends a prompt to OpenAI chat completions asking for 5 comma-separated movie titles, searches TMDB for each title in parallel (`Promise.all`), and stores both arrays in the `gpt` slice. `GptMovieSuggestions` reuses `MovieList` to render one row per suggested title.
- **i18n**: UI strings for GPT Search live in `src/utils/languageConstants.js`, keyed by language identifier (`english`, `hindi`, `french`). They are looked up as `lang[store.config.lang].<key>`. Adding a language means adding it to both `languageConstants.js` and `SUPPORTED_LANGUAGES` in `constants.js`.
- Hardcoded URLs and config (logo, avatar, background image, TMDB image CDN) go in `src/utils/constants.js`.
