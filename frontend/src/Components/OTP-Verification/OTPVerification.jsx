import React, { useState } from "react";

const OTPVerification = () => {
  const [inputbox, setInputbox] = useState(new Array(6).fill(""));

  const handleInputBox = (e, i) => {
    if (isNaN(e.target.value)) return; // Prevent non-numeric input

    const data = [...inputbox];
    data[i] = e.target.value;

    setInputbox(data);

    // Move focus to the next or previous input box
    if (e.target.nextSibling && e.target.value) {
      e.target.nextSibling.focus();
    } else if (e.target.previousSibling && !e.target.value) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        OTP Verification
      </h1>
      <div className="flex space-x-2 mb-6">
        {inputbox.map((item, index) => (
          <input
            type="text"
            maxLength={1}
            pattern="[0-9]*"
            key={index}
            onChange={(e) => handleInputBox(e, index)}
            value={item}
            className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors duration-200"
          />
        ))}
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
        Submit
      </button>
    </div>
  );
};

export default OTPVerification;
