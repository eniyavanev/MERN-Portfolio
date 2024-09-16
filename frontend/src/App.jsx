import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainbody from "./Components/Mainbody/Mainbody";
import Home from "./Pages/Home/Home";
import Error from "./Components/Error-404/Error";
import Signup from "./Components/Signup/Signup";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProfileUpdate from "./Pages/ProfileUpdate/ProfileUpdate";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import OTPVerification from "./Components/OTP-Verification/OTPVerification";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainbody />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/ProtectedRoutes",
          element: <ProtectedRoutes />,
          children: [
            {
              path: "/ProtectedRoutes/profile",
              element: <ProfileUpdate />,
            },
          ],
        },
      ],
    },
    {
      path: "/Signup",
      element: <Signup />,
      errorElement: <Error />,
    },
    {
      path: "/Login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/ForgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/ResetPassword",
      element: <ResetPassword />,
    },
    {
      path: "/OTPVerification",
      element: <OTPVerification />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
