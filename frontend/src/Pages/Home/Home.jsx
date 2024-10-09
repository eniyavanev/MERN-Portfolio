import React, { useEffect, useState } from "react";
import Img_1 from "../../assets/Images/bg-dark.png";
import Img_2 from "../../assets/Images/bg-light.png";
import { ReactTyped } from "react-typed";
import Aos from "aos";
import "aos/dist/aos.css";
import lightImg from "../../assets/Images/img-1.1.png";
import darkImg from "../../assets/Images/bg-dark1.jpg";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaArrowAltCircleUp } from "react-icons/fa";
import Education from "../Education/Education";
import Projects from "../Projects/Projects";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Contact from "../Contact/Contact";
import { socialMedia } from "../../Components/Data/Data";

const Home = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    Aos.init({
      duration: 600,
      easing: "ease-in",
      once: true,
      delay: 100,
      offset: 200,
    });
  }, []);

  const backgroundImage = darkMode ? Img_1 : Img_2;

  const [toggleTopBtn, setToggleTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setToggleTopBtn(true);
      } else {
        setToggleTopBtn(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {toggleTopBtn && (
        <button
          className="fixed bottom-5 z-10 right-5 bg-sketch  text-white rounded-full p-2 dark:bg-[#fc036f] max-md:bottom-20"
          onClick={scrollToTop}
        >
          <FaArrowAltCircleUp size={30} />
        </button>
      )}
      <section id="Home" className="relative ">
        <div
          className="w-full max-sm:min-h-screen  bg-cover  bg-center bg-fixed"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-black absolute w-full h-full opacity-20 dark:opacity-70"></div>
          <div className="w-full flex flex-col md:flex-row gap-y-8 lg:gap-y-5 items-center justify-between pt-4  overflow-hidden">
            <div
              className="basis-1/2 px-5 md:px-20 space-y-1 md:space-y-4 max-md:order-2 text-center md:text-start"
              data-aos="fade-right"
            >
              <h2 className="font-bold  text-sketch text-[22px] md:text-4xl font dark:text-tshirt">
                Hello, It's Me
              </h2>
              <h1 className="text-white text- font-bold font text-[35px] md:text-6xl">
                Eniyavan Arumugam
              </h1>
              <h2 className="text-4xl dark:text-white text-[24px] md:text-4xl">
                & I'm a{" "}
                <span>
                  <ReactTyped
                    className="text-3xl md:text-5xl font-bold text-sketch dark:text-tshirt"
                    strings={[
                      "MERN Developer",
                      "Frontend Developer",
                      "UI/UX Designer",
                    ]}
                    typeSpeed={100}
                    backSpeed={100}
                    loop
                  />
                </span>
              </h2>

              <p className="text-white">
                I am a Web Developer, Designer and Content Creator. I have rich
                experience in Frontend and Backend Development.
              </p>
              <div className="flex flex-row space-x-3 lg:space-x-5 pt-3 justify-center md:justify-start">
                {socialMedia.map((social, index) => (
                  <div
                    key={index}
                    title={social.title}
                    className="bg-transparent border-sketch group hover:bg-sketch cursor-pointer duration-300 rounded-full p-4 border dark:border-gray-100 items-center shadow-lg shadow-sketch dark:shadow-tshirt dark:hover:bg-tshirt"
                  >
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-white"
                    >
                      <div className="dark:text-gray-100 text-sketch group-hover:text-white">
                        {social.icon}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <br />
            </div>
            <div
              className="basis-1/2  lg:py-10 overflow-hidden"
              data-aos="fade-left"
            >
              <div className="w-full">
                <img
                  src={darkMode ? darkImg : lightImg}
                  alt="Eniyavan"
                  className="mx-auto rounded-full w-[550px]  md:h-[300px] lg:h-[550px]   "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
