import React, { useContext, useState } from "react";
import app from "../firebase.init";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { toast } from "react-toastify";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(auth);
  const { signInUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate()

  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailLogIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const loggedInUser = result.user
        console.log(loggedInUser);
        toast("Log in Successful")
        form.reset()
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
        toast(error.message)
      })
  };

  const handleSignInWithGithub = () => {
    signInWithGithub()
    .then((result) => {
      toast("Log in successful")
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="p-6 lg:p-16 lg:h-[calc(100vh-300px)] flex justify-center items-center">
      {user ? (
        <div>
          {console.log(user)}
          <h1>User</h1>
          <h3>{user.displayName}</h3>
          <button
            className="bg-gray-200 px-3 py-2 rounded font-medium cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold text-center pb-5">Log In</h1>
          <div className="border p-3 mb-5 rounded">
            <form className="space-y-4" onSubmit={handleEmailLogIn}>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-base text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-gray-300 rounded ps-3 py-1 text-sm text-black w-full"
                  placeholder="Email"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-base text-gray-700 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="border border-gray-300 rounded ps-3 py-1 text-sm text-black w-full"
                  placeholder="Password"
                />
              </div>
              <div>
                <button
                  className="bg-sky-400 px-4 py-2 rounded text-white text-base font-medium"
                  type="submit"
                >
                  Log in
                </button>
              </div>

              <p className="text-xs text-gray-500">
                New Here !
                <Link
                  to="../signup"
                  replace
                  className="text-sky-800 font-bold pl-1"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
          {/* social */}
          <h1 className="text-xl font-semibold text-center mb-4">
            Social Log in
          </h1>
          <div className="border border-solid p-7 flex justify-center gap-5 items-center">
            <div
              className="bg-orange-500 px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => handleGoogleSignIn()}
            >
              <h1 className="text-lg font-bold text-white">Google</h1>
            </div>
            <div className="bg-green-900 px-4 py-2 rounded-lg cursor-pointer" onClick={handleSignInWithGithub}>
              <h1 className="text-lg font-bold text-white">Github</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
