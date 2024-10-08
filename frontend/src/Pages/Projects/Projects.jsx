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

const Projectcards = (props) => {
  return (
    <div
      className="w-[300px] bg-gray-900 rounded-md shadow-lg mx-auto"
      data-aos="zoom-in-out"
    >
      <div className="p-2 overflow-hidden">
        <img src={props.img} alt="Error" className="rounded-md" />
      </div>
      <div className="flex flex-row space-x-1 items-center justify-between">
        <h1 className="text-white uppercase text-base pl-5 py-2 font-semibold">
          {props.title}
        </h1>
        <div className="flex flex-row mx-auto py-2 gap-x-4 px-5">
          <a href={props.github} target="_blank" rel="noreferrer">
            <FaGithub size={20} className="text-yellow-300" />
          </a>
          {props.id === 0 || props.id === 1 ? (
            <a href={props.youtube}>
              <FaYoutube size={20} className="text-[#fc036f]" />
            </a>
          ) : (
            <a href={props.youtube}>
              <FaChrome size={20} className="text-cyan-300" />
            </a>
          )}
        </div>
      </div>
      <p className="text-white text-[13px] md:text-[13px] text-justify px-5 pt-2 pb-8">
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
      <section id="Projects" className="bg-white w-full pt-20 sm:pt-24">
        <div className="max-w-[300px] mx-auto text-center">
          <h1 className="font-bold text-3xl md:text-4xl text-gray-800 font-serif">
            Projects
          </h1>
          <div className="w-[300px] flex flex-row gap-x-3 items-center justify-center">
            <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
            <h1 className="text-[#fc036f] font-semibold">What I Provide</h1>
            <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
          </div>
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
