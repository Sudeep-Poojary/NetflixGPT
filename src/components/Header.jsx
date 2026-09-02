import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute w-screen px-15 py-7 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-45" src={LOGO} alt="logo" />
      {user && (
        <div className="flex w-40 p-2 justify-evenly">
          <img
            className="w-10 h-10 rounded-sm object-cover"
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
