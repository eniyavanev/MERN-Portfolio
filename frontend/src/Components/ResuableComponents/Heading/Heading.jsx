import React from "react";

const Heading = ({ title, detail }) => {
  return (
    <div className="max-w-[968px] mx-auto text-center">
      <h1 className="font-bold text-3xl md:text-5xl text-gray-800 font-serif dark:text-white">
        {title}
      </h1>
      <div className="w-full flex flex-row gap-x-3 items-center justify-center mt-3">
        <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
        <h1 className="text-[#fc036f] font-semibold text-center">{detail}</h1>
        <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
      </div>
    </div>
  );
};

export default Heading;
