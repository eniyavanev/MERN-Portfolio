import React, { useEffect } from "react";
import Data from "../../Components/Data/Data";

/* Import Aos Libraray for Move the content */
import Aos from "aos";
import "aos/dist/aos.css";
import Heading from "../../Components/ResuableComponents/Heading/Heading";

const Pic = (props) => {
  return (
    <>
      <div
        className="flex flex-col space-y-4 bg-white items-center p-5 rounded-lg hover:scale-105 dark:bg-tshirt"
        data-aos="fade-up"
      >
        <div className="w-32 h-32 rounded-full border-1 shadow-lg relative bg-white">
          <img src={props.img} className="bg-center bg-contain p-5" />
        </div>

        <h2 className="text-center font-bold text-sketch dark:text-gold">
          {props.title}
        </h2>
        <p className="font-semibold text-center text-gray-700 text-[13px] sm:text-[12px] dark:text-white">
          {props.subtitle}
        </p>
      </div>
    </>
  );
};

const Skills = () => {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in",
      once: true,
      delay: 100,
    });
  }, []);

  return (
    <>
      <section
        className="bg-gray-200 w-full  sm:pt-24 px-3 dark:bg-gray-800"
        id="Skills"
      >
        <div className="w-full h-full">
          {/* About me design */}
          <div>
            <Heading title="Skills" detail={"What Do I Know"} />
          </div>
          {/* End About-me design */}

          {/* Skills Grid section */}
          <div className="flex items-center justify-center">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-3 sm:p-5">
              {Data.map((elem) => {
                return (
                  <Pic
                    key={elem.id}
                    img={elem.image}
                    title={elem.title}
                    subtitle={elem.subTitle}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Skills;
