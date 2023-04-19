import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./components/MainLayout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import PhoneDetails from "./components/PhoneDetails/PhoneDetails";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import AuthProviders from "./providers/AuthProviders";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:50001/phones"),
      },
      {
        path: "phones/:id",
        element: (
          <PrivateRoutes>
            <PhoneDetails></PhoneDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:50001/phones/${params.id}`),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>
);
