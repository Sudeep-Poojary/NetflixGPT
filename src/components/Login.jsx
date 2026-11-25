import { useRef, useState } from "react";
import Header from "./Header";
import PosterBackdrop from "./PosterBackdrop";
import Alert from "./Alert";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const FIREBASE_ERRORS = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
};

const getFriendlyError = (error) =>
  FIREBASE_ERRORS[error.code] ?? "Something went wrong. Please try again.";

const inputClass = "field h-12 w-full px-4 text-base";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = checkValidData(
      email.current.value,
      password.current.value,
    );
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);
    try {
      if (!isSignInForm) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        );
        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: USER_AVATAR,
        });
        const { uid, email: userEmail, displayName, photoURL } =
          auth.currentUser;
        dispatch(
          addUser({ uid, email: userEmail, displayName, photoURL }),
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
        );
      }
      // Header's auth listener handles the redirect to /browse
    } catch (error) {
      setErrorMessage(getFriendlyError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    // `isolate` keeps the -z-10 backdrop above body's background
    <div className="relative isolate min-h-screen">
      <Header />
      <PosterBackdrop />

      <main className="flex min-h-screen items-center justify-center px-4 pt-24 pb-12">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-md rounded-xl border border-white/10 bg-bg/70 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8 md:p-10"
        >
          <h1 className="font-display text-4xl tracking-wide text-fg sm:text-5xl">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          <p className="mt-1 mb-6 text-sm text-muted">
            {isSignInForm
              ? "Welcome back. Your next movie is waiting."
              : "Create an account to get AI-powered picks."}
          </p>

          <div className="space-y-4">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                className={inputClass}
              />
            )}

            <input
              ref={email}
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className={inputClass}
            />

            <div>
              <input
                ref={password}
                type="password"
                autoComplete={isSignInForm ? "current-password" : "new-password"}
                placeholder="Password"
                className={inputClass}
              />
              {!isSignInForm && (
                <p className="mt-2 text-xs text-muted">
                  At least 8 characters, with an uppercase letter, a lowercase
                  letter and a number.
                </p>
              )}
            </div>
          </div>

          {errorMessage && <Alert className="mt-5">{errorMessage}</Alert>}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-6 h-12 w-full text-base"
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-6 text-sm text-muted">
            {isSignInForm ? "New to NetflixGPT? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleSignInForm}
              className="font-semibold text-fg underline-offset-4 hover:underline"
            >
              {isSignInForm ? "Sign up now" : "Sign in"}
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
