import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Mainbody = ({darkMode,setDarkMode}) => {
  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <>
        <Outlet />
      </>
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default Mainbody;
