import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { toast } from "react-toastify";

const Signup = () => {
  const [error, setError] = useState("");
  const { createUser, setProfileName } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignUp = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirmPass.value;

    if (password !== confirm) {
      setError("Confirm Password doesn't match");
      return;
    } else {
      createUser(email, password)
        .then((result) => {
          const signedUpUser = result.user;
          setProfileName(name).then((result) => {
            console.log(signedUpUser);
            form.reset();
            toast("User Created Successfully");
            navigate("../login")
          })
          .catch((error) => {
            console.log(error.message);
          })
        })
        .catch((error) => {
          setError(error.message);
          toast(error);
        });
    }

    console.log(password, isPasswordValid, error);
  };

  const checkPassword = (e) => {
    const password = e.target.value;
    setError("");
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/(?=.*\d)/.test(password)) {
      setError("Password must contain at least one numerical digit");
      return false;
    }
    if (!/(?=.*[\W_])/.test(password)) {
      setError("Password must contain at least one special character");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be 6 characters or longer");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="w-9/12 lg:w-3/5 mx-auto">
      <form
        className="border rounded space-y-4 p-4 lg:p-8"
        onSubmit={handleSignUp}
      >
        <h2 className="text-xl lg:text-2xl text-center underline">Sign Up</h2>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-base text-gray-700 font-medium"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="border border-gray-300 rounded ps-3 py-1 text-sm text-black w-full"
            placeholder="Name"
          />
        </div>
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
            onBlur={checkPassword}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPass"
            className="block text-base text-gray-700 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPass"
            required
            className="border border-gray-300 rounded ps-3 py-1 text-sm text-black w-full"
            placeholder="confirm password"
          />
          <p className="text-red-500 text-xs font-semibold">{error && error}</p>
        </div>
        <div>
          <button
            className="bg-sky-400 px-4 py-2 rounded text-white text-base font-medium"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Already Have Account ?{" "}
          <Link to="../login" replace className="text-sky-800 font-bold">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
