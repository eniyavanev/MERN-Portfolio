import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const isLoggedin = useSelector((state) => state.userInfo.user);
  return isLoggedin ? <Outlet /> : <Navigate to="/Login" replace/>;
};

export default ProtectedRoutes;
