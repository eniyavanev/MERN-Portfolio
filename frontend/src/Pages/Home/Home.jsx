import React, { useEffect } from "react";
import Img_1 from "../../assets/Images/bg-dark.png";
import { ReactTyped } from "react-typed";
import Aos from "aos";
import "aos/dist/aos.css";
import lightImg from "../../assets/Images/img-1.1.png";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import Education from "../Education/Education";
import Projects from "../Projects/Projects";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Contact from "../Contact/Contact";

const Home = () => {
  useEffect(() => {
    Aos.init({
      duration: 600,
      easing: "ease-in",
      once: true,
      delay: 100,
      offset: 200,
    });
  }, []);
  return (
    <>
      <section id="Home">
        <div className="w-full relative">
          <img
            src={Img_1}
            alt=""
            className="mx-auto absolute w-full h-full bg-center bg-cover"
          />
          <div className="bg-black absolute w-full h-full opacity-70"></div>
          <div className="w-full flex flex-col md:flex-row gap-y-8 lg:gap-y-5 items-center justify-between py-16 pt-28  overflow-hidden">
            <div
              className="basis-1/2 px-5 md:px-20 space-y-1 md:space-y-4 max-md:order-2 text-center md:text-start"
              data-aos="fade-right"
            >
              <h2 className="font-bold text-[#fc036f] text-[22px] md:text-4xl font">
                Hello, It's Me
              </h2>
              <h1 className="text-white font-bold font text-[35px] md:text-6xl">
                Eniyavan Arumugam
              </h1>
              <h2 className="text-4xl text-white text-[24px] md:text-4xl">
                & I'm a{" "}
                <span>
                  <ReactTyped
                    className="text-3xl md:text-5xl font-bold text-white"
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
                <div
                  title="Github"
                  className="bg-transparent hover:bg-[#fc036f] cursor-pointer duration-300 rounded-full p-4 border border-gray-100 items-center shadow-lg shadow-[#fc036f]"
                >
                  <a href="https://github.com/eniyavanev" target="_blank">
                    <FaGithub size={20} className="text-gray-100" />
                  </a>
                </div>
                <div
                  title="Instagram"
                  className="bg-transparent hover:bg-[#fc036f] cursor-pointer duration-300 rounded-full p-4 border border-gray-100 items-center shadow-lg shadow-[#fc036f]"
                >
                  <a
                    href="https://www.instagram.com/thamizh_ev/"
                    target="_blank"
                  >
                    <PiInstagramLogoFill size={20} className="text-gray-100" />
                  </a>
                </div>
                <div
                  title="Linkedin"
                  className="bg-transparent hover:bg-[#fc036f] cursor-pointer duration-300 rounded-full p-4 border border-gray-100 items-center shadow-lg shadow-[#fc036f]"
                >
                  <a
                    href="https://www.linkedin.com/in/eniyavan-a-738a20288/"
                    target="_blank"
                    className=""
                  >
                    <IoLogoLinkedin size={20} className="text-gray-100 " />
                  </a>
                </div>
              </div>
              <br />
            </div>
            <div
              className="basis-1/2 px-8 lg-py-5 overflow-hidden"
              data-aos="fade-left"
            >
              <div className="">
                <img
                  src={lightImg}
                  alt=""
                  className="mx-auto rounded-full w-[550px] header_img"
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
