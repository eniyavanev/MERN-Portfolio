import React from "react";
import { ReactTyped } from "react-typed";
import { FiAward } from "react-icons/fi";
import { BiBriefcase, BiDesktop } from "react-icons/bi";

import Ev from "../../assets/Images/img-2.png";

/* Import Aos Libraray for Move the content */
import Aos from "aos";
import "aos/dist/aos.css";

import { RiDownloadCloudFill } from "react-icons/ri";
import Heading from "../../Components/ResuableComponents/Heading/Heading";
import { aboutData } from "../../Components/Data/Data";

const About = () => {
  React.useEffect(() => {
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
      <section id="About" className="">
        <div className="w-full relative ">
          {/* Background Image above Opacity */}
          <div className=" absolute w-full h-full opacity-50 dark:bg-gray-800"></div>

          {/* Image Above about-me section */}
          <div className="bg-gray-200 w-full mx-auto relative py-16 md:py-20 px-2 dark:bg-gray-800">
            {/* About me design */}
            <div>
              <Heading title="About Me" detail={"Know Me More"} />
            </div>
            {/* End About-me design */}

            {/* About-me information section(Image and Info) */}
            <div className="w-full py-3 md:py-7">
              {/* About-me flex part section*/}
              <div
                className="max-w-[1250px] flex flex-col lg:flex-row gap-y-3 md:gap-x-11 mx-auto py-3 items-center 
                        rounded-lg shadow-lg bg-white dark:bg-tshirt "
              >
                {/* flex-1 (Images) */}
                <div
                  className="basis-1/2 items-center mx-auto px-3"
                  data-aos="fade-up"
                >
                  <img
                    src={Ev}
                    alt="Error!"
                    className="bg-center bg-cover rounded-lg"
                  />
                </div>

                {/* flex-2 (info) */}
                <div
                  className="basis-1/2 text-justify text-gray-800 overflow-hidden px-5 space-y-3"
                  data-aos="fade-up"
                >
                  {/* Experience, Completed & Learning Design Section */}
                  <div
                    className="flex flex-row space-x-3 items-center justify-center"
                    data-aos="zoom-out-up"
                  >
                    {aboutData.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col  items-center space-y-0 text-center py-3 px-2 sm:py-4 sm:px-8 border rounded-lg"
                      >
                        <h1>{item.icon}</h1>
                        <h2 className="text-gray-800 font-semibold text-[13px]">
                          {item.title}
                        </h2>
                        <h3 className="text-gray-500 text-[11px] dark:text-white">
                          {item.description}
                        </h3>
                      </div>
                    ))}
                  </div>
                  {/* End of Experience, Completed & Learning Design Section */}

                  <div className="hidden sm:block">
                    <div className="flex flex-col  sm:flex-row font-bold text-[25px] md:text-2xl tab:text-[33px] text-ink text-left dark:text-white">
                      Hey, I'm Eniyavan and I'm a
                      <h2>
                        {" "}
                        &nbsp;
                        <ReactTyped
                          className="text-sketch dark:text-gold text-[25px] md:text-2xl tab:text-[33px] font antialiased font-bold"
                          strings={[
                            " React Developer",
                            " Frontend Developer",
                            " MERN Developer",
                          ]}
                          typeSpeed={90}
                          backSpeed={60}
                          loop
                        />
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 md:text-[15px] leading-6 sm:pr-5 dark:first-letter:text-gold first-letter:text-3xl first-letter:text-sketch first-letter:font-semibold dark:text-white">
                    I am Eniyavan Arumugam from Banglore, currently I'm working
                    as a Software Developer and I have 1+ years hands on
                    experience in Frontend Develoment. I have solid
                    Understanding in backend Technologies, Which Improves me as
                    a capable of MERN stack Developer. I had opportunity to work
                    on various project that honed my skills. I'm passionate
                    about solving real-world problem with innotive solution and
                    continously learning new technology.
                    <b> I'm currently learning on AWS, React-Native.</b>
                  </p>

                  <a
                    download="Resume_Eniyavan.pdf"
                    href="/Eniyavan Frontend.pdf"
                  >
                    <button
                      className="w-[150px] rounded-md flex flex-row items-center gap-1 
    font-medium my-5 py-3 text-white px-1 bg-sketch hover:bg-tshirt shadow-lg shadow-soap text-[17px] dark:bg-gold"
                    >
                      <RiDownloadCloudFill className="ml-2" />
                      Download CV
                    </button>
                  </a>
                </div>
                {/* End flex-2 (info) */}
              </div>
              {/* End About-me flex part section*/}
            </div>
            {/* End About-me information section(Image and Info) */}
          </div>
          {/* End Image Above about-me section */}
        </div>
      </section>
    </>
  );
};
export default About;
