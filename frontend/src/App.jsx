import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainbody from "./Components/Mainbody/Mainbody";
import Home from "./Pages/Home/Home";
import Error from "./Components/Error-404/Error";
import Signup from "./Components/Signup/Signup";

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
        
      ],
    },
    {
      path:"/signup",
      element:<Signup/>,
      errorElement:<Error/>
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
