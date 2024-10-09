import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import Heading from "../../Components/ResuableComponents/Heading/Heading";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Form Validation for Gmail
    const formData = new FormData(e.target);
    const email = formData.get("from_email");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      Swal.fire("Error", "Please enter a valid Gmail address.", "error");
      return;
    }

    // Sending email using emailjs
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
          Swal.fire("Error", "Something went wrong. Please try again.", "error");
        }
      );
  };

  useEffect(() => {
    Aos.init({ offset: 200, duration: 600, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-800 min-h-screen pt-16">
      <div>
        <Heading title="Contact" detail="Get In Touch" />
      </div>

      {/* Container for the form and contact details */}
      <div className="flex justify-center pt-10 px-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-100 shadow-lg rounded-lg overflow-hidden">
          
          {/* Left Side - Contact Info */}
          <div className="w-full md:w-1/2 bg-sketch dark:bg-tshirt text-white p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 dark:text-gold">Get In Touch</h2>
            <p className="mb-4">
              Hi! I'm <span className="font-bold">Eniyavan Arumugam</span>, feel free to reach out to me.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3" /> <span>+91 8940650248</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3" /> <span>eniyavanev@gmail.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-3" /> <span>Bangalore, India</span>
              </li>
            </ul>
            <p className="mt-6">
              I'm passionate about creating high-quality projects, let's build something amazing together!
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-sketch dark:text-tshirt text-center mb-8">
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
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sketch dark:focus:ring-tshirt"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="from_number"
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sketch dark:focus:ring-tshirt"
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
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sketch dark:focus:ring-tshirt"
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
                  className="w-full px-4 py-2 mt-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sketch dark:focus:ring-tshirt"
                  placeholder="Write your message here"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-sketch rounded-md dark:bg-tshirt"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
