import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../Utils/Authentication";

const ProtectedRoutes = () => {
  const auth = useAuth();
  console.log("auth",auth);
  
  const isLoggedin = useSelector((state) => state.userInfo.user);
  return isLoggedin ? <Outlet /> : <Navigate to="/Login" replace/>;
};

export default ProtectedRoutes;
