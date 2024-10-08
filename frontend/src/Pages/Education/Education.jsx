import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaUserGraduate } from "react-icons/fa";
import { education } from "../../Components/Data/Data";

const Card = (props) => {
  return (
    <div
      className="flex flex-row gap-10 mx-auto max-w-[500px] p-5"
      data-aos="fade-up"
    >
      <div className="p-0.5 mt-1 bg-gray-800 rounded-full"></div>

      <div className="p-3 absolute drop-shadow-md ml-[-17px] bg-gray-800 rounded-full">
        <FaUserGraduate color="white" />
      </div>

      <div className="flex flex-col">
        <h1 className="font-bold text-[20px] md:text-xl">{props.course}</h1>
        <p className="text-cyan-600 font-semibold">{props.college}</p>
        <p className="text-[14px]">{`Percentage ${props.percentage}%`}</p>
        <p className="text-[14px]">{props.year}</p>
        <p className="text-gray-500 text-[13px]">{props.summary}</p>
      </div>
      <div className="hidden md:block mt-0 w-20 h-20">
        <img
          src={props.img}
          alt="Error"
          className="w-11 h-11 bg-contain bg-center mx-auto"
        />
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
  });
  return (
    <div>
      <section id="Education" className="bg-white w-full pt-20 sm:pt-24 px-5">
        <div className="max-w-[968px] mx-auto text-center">
          <h1 className="font-bold text-3xl md:text-5xl text-gray-800 font-serif">
            Education
          </h1>
          <div className="w-full flex flex-row gap-x-3 items-center justify-center mt-3">
            <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
            <h1 className="text-[#fc036f] font-semibold text-center">
              What I Doing
            </h1>
            <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
          </div>
        </div>
        <div className="max-w-[600px] mx-auto">
          <div className="flex flex-col">
            {education.map((ele) => (
              <>
                <Card
                  key={ele.id}
                  course={ele.course}
                  year={ele.year}
                  summary={ele.summary}
                  college={ele.college}
                  img={ele.image}
                  percentage={ele.percentage}
                />
              </>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
