import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-15 py-7 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-45"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAfwxusEeCteu-L_QQ56_G2cohyI1E4BIh2uyr5t9gDhH0CKWHw3NVhndjuF7yQ26z3cYq_lnzY5pP6OarHyiibuiy2jIIa5sIhSvgal1S6u9YDVAyVoX6osPniEKN-dYy77H_pLfOCD7.svg"
        alt="logo"
      />
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
