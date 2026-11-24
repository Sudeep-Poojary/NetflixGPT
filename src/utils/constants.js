export const USER_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd1Th5gae2Q5TMYAq3IehJ43kLHoGBI_7f3DcM5D5bBg&s=10";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_API_TOKEN,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const BACKDROP_CDN_URL = "https://image.tmdb.org/t/p/w1280";

export const SUPPORTED_LANGUAGES = [
  { identifier: "english", name: "English" },
  { identifier: "hindi", name: "हिंदी" },
  { identifier: "french", name: "Français" },
];
