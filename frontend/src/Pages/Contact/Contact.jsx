import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2svzjzo",
        "template_7bnexf6",
        e.target,
        "DUynvEdnhJjxn9aHi"
      )
      .then(
        (result) => {
          Swal.fire("Success", "Your message has been sent!", "success");
          e.target.reset();
        },
        (error) => {
          Swal.fire(
            "Error",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      );
  };

  return (
    <>
      <div id="ContactMe" className="max-w-[300px] mx-auto p-5 text-center">
        <h1 className="font-bold text-3xl tab:text-5xl md:text-4xl  font-serif">
          Contact Me !
        </h1>

        <div className="w-[200px] mx-auto flex flex-row gap-x-3 items-center">
          <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
          <h1 className="text-[#fc036f] font-semibold whitespace-nowrap">
            Get In Touch
          </h1>
          <div className="w-[50px] h-1 bg-cyan-500 rounded-md"></div>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl max-w-5xl w-full">
          {/* Left Side - Personal Information */}
          <div className="md:w-1/2 bg-gray-800 text-white p-8 rounded-l-xl">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="mb-4">
              Hi! I'm <span className="font-bold">Eniyavan Arumugam</span>, feel free to
              reach out to me.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3" /> <span>+91 8940650248.</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3" />{" "}
                <span>eniyavanev@gmail.com.</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3" /> <span>Banglore, India.</span>
              </li>
            </ul>
            <p className="mt-6">
              I'm passionate about creating high-quality projects, let's build
              something amazing together!
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-8">
              Send a Message
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="from_number"
                  required
                  maxLength={10}
                  minLength={10}
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write your message here"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
