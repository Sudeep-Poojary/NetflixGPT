import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import Logo from "./Logo";

const SparkleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1.5c.6 4.9 2.6 6.9 8.5 8.5-5.9 1.6-7.9 3.6-8.5 8.5-.6-4.9-2.6-6.9-8.5-8.5 5.9-1.6 7.9-3.6 8.5-8.5Z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" strokeLinejoin="round" />
  </svg>
);

const SignOutIcon = () => (
  <svg className="w-4 h-4 sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch(() => {
      navigate("/error");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  // Turn the transparent header solid once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-bg/85 backdrop-blur-md shadow-lg shadow-black/40"
          : "bg-linear-to-b from-black/90 via-black/40 to-transparent"
      }`}
    >
      {/* One row at every width: labels collapse to icons on small phones */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-12 md:py-4">
        <Logo />

        {user && (
          <div className="flex items-center gap-2 md:gap-3">
            {showGptSearch && (
              <select
                value={langKey}
                onChange={handleLanguageChange}
                aria-label="Language"
                className="field h-9 max-w-28 cursor-pointer px-2 text-sm sm:max-w-none sm:px-2.5"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* The GPT entry point: the only gradient button in the header */}
            <button
              onClick={handleGptSearchClick}
              aria-label={showGptSearch ? "Home" : "GPT Search"}
              className="btn btn-ai h-9 px-2.5 text-sm sm:px-4"
            >
              {showGptSearch ? <HomeIcon /> : <SparkleIcon />}
              <span className="hidden sm:inline">
                {showGptSearch ? "Home" : "GPT Search"}
              </span>
            </button>

            {user.photoURL && (
              <img
                className="hidden md:block w-9 h-9 rounded-md object-cover"
                src={user.photoURL}
                alt={user.displayName ?? "User avatar"}
                title={user.displayName ?? ""}
              />
            )}

            <button
              onClick={handleSignOut}
              aria-label="Sign Out"
              className="btn btn-ghost h-9 px-2.5 text-sm sm:px-4"
            >
              <SignOutIcon />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
