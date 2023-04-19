import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
