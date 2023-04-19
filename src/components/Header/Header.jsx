import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout, isLoading } = useContext(AuthContext);
  // console.log(user ? user.displayName : "no user")

  // useEffect(() => {
  //   if (user) {
  //     console.log(user.displayName);
  //   } else {
  //     console.log("no user");
  //   }
  // }, [user])

  const navigate = useNavigate();
  const handleLogOut = () => {
    logout()
      .then((result) => {
        toast("Log out successful");
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full px-7 py-8 flex justify-between">
      <h1 className="text-3xl font-bold">Phones World</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ol className="flex gap-4 items-center">
          {user ? (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg text-sky-400 font-medium transition-colors duration-300"
                    : "text-gray-400 text-lg"
                }
              >
                Home
              </NavLink>

              <h1 className="text-lg font-extrabold">
                {user.displayName || user.email}
              </h1>
              <button
                className="bg-red-300 px-4 py-2 rounded text-white font-semibold cursor-pointer"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg text-sky-400 font-medium transition-colors duration-300"
                    : "text-gray-400 text-lg"
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"login"}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg text-sky-400 font-medium transition-colors duration-300"
                    : "text-gray-400 text-lg"
                }
              >
                Sign in
              </NavLink>
              <NavLink
                to={"signup"}
                className={({ isActive }) =>
                  isActive
                    ? "text-lg text-sky-400 font-medium transition-colors duration-300"
                    : "text-gray-400 text-lg"
                }
              >
                Sign up
              </NavLink>
            </>
          )}
        </ol>
      )}
    </div>
  );
};

export default Header;
