import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import for pagination styles
import "swiper/css/navigation"; // Import for navigation styles

// Import Autoplay and Pagination

import { FaGithub, FaYoutube, FaChrome } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import { projectData } from "../../Components/Data/Data";
import Heading from "../../Components/ResuableComponents/Heading/Heading";

const Projectcards = (props) => {
  return (
    <div
      className="w-[300px] bg-gray-100   rounded-md shadow-lg mx-auto dark:bg-tshirt"
      data-aos="zoom-in-out"
    >
      <div className="p-2 overflow-hidden">
        <img src={props.img} alt="Error" className="rounded-md h-[200px]" />
      </div>
      <div className="flex flex-row space-x-1 items-center justify-between">
        <h1 className="text-sketch  uppercase text-base pl-5 py-2 font-semibold dark:text-gold">
          {props.title}
        </h1>
        <div className="flex flex-row mx-auto py-2 gap-x-4 px-5">
          <a  target="_blank" rel="noreferrer">
            <FaGithub size={20} className="text-black dark:text-white" />
          </a>
          {props.id === 0 || props.id === 1 ? (
            <a >
              <FaYoutube size={20} className="text-[#fc036f]" />
            </a>
          ) : (
            <a >
              <FaChrome size={20} className=" text-red-500  dark:text-white" />
            </a>
          )}
        </div>
      </div>
      <p className="text-black  text-[13px] md:text-[13px] text-justify px-5 pt-2 pb-8 dark:text-white">
        {props.detail}
      </p>
    </div>
  );
};

const Projects = () => {
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
      <section id="Projects" className="bg-gray-200 dark:bg-gray-800 w-full pt-20 sm:pt-24">
        <div>
          <Heading title="Projects" detail={"Some of my recent works"} />
        </div>

        <div className="max-w-[1200px] mx-auto p-3 flex flex-row mt-[25px] place-items-center">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="mySwiper"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1000: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            {projectData.map((ele) => (
              <SwiperSlide key={ele.id}>
                <Projectcards
                  key={ele.id}
                  img={ele.image}
                  title={ele.title}
                  detail={ele.details}
                  github={ele.github}
                  youtube={ele.youtube}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Projects;
