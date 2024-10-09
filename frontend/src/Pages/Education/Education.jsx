import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaUserGraduate } from "react-icons/fa";
import { education } from "../../Components/Data/Data";
import Heading from "../../Components/ResuableComponents/Heading/Heading";

const Card = (props) => {
  return (
    <div
      className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-lg transition-transform transform mb-2 hover:scale-105 dark:bg-tshirt dark:border-gray-800"
      data-aos="fade-up"
    >
      <div className="relative w-full h-32">
        <img
          src={props.img}
          alt="Course Image"
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>
        <div className="absolute top-2 left-4 p-2 bg-sketch rounded-full dark:bg-gold">
          <FaUserGraduate className="text-white text-2xl " />
        </div>
      </div>

      <div className="p-5">
        <h1 className="font-bold text-lg md:text-xl dark:text-gold">
          {props.course}
        </h1>
        <p className="text-sketch font-semibold dark:text-white">
          {props.college}
        </p>
        <p className="text-sm font-bold dark:text-gold">{props.year}</p>
        <p className="text-black text-sm dark:text-white">{props.summary}</p>
      </div>
    </div>
  );
};

const Education = () => {
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
    <div>
      <section
        id="Education"
        className="bg-gray-200 dark:bg-gray-800 shadow-lg w-full pt-16 sm:pt-24 px-5"
      >
        <div>
          <Heading title="Education" detail={"What I Study"} />
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {education.map((ele) => (
            <Card
              key={ele.id}
              course={ele.course}
              year={ele.year}
              summary={ele.summary}
              college={ele.college}
              img={ele.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Education;
