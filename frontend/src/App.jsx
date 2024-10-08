import React,{ useEffect, useState } from "react";
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
import Header from "./Components/Header/Header";
import HashLoader from "react-spinners/HashLoader";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainbody  darkMode={darkMode} setDarkMode={setDarkMode}/>,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home  darkMode={darkMode} setDarkMode={setDarkMode}/>,
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
      path: "/ResetPassword/:token",
      element: <ResetPassword />,
    },
    {
      path: "/OTPVerification",
      element: <OTPVerification />,
    },
  ]);
  const [loading, setLoading] = useState(true); // State to control loading
  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000);
  }, []);
 
  return (
    <div>
      {loading ? (
        <HashLoader
          color="#0bb8f1"
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="flex mx-auto mt-[20rem]" // Center the loader
        />  
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;
