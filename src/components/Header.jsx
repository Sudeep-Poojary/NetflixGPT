import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
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
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-15 py-7 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-45" src={LOGO} alt="logo" />

      {user && (
        <div className="flex w-auto p-2 justify-between">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="cursor-pointer rounded border border-gray-500 bg-black/50 pl-3 pr-5 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white mr-2"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="rounded bg-orange-600 px-4 py-1.5 text-sm font-semibold text-white transition duration-200 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange mr-2"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>

          <img
            className="w-10 h-10 mr-2 rounded-sm object-cover"
            src={user.photoURL}
            alt="usericon"
          />

          <button
            onClick={handleSignOut}
            className="rounded bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
