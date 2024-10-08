import React, { useState } from "react";
import BgImage from "../../assets/Images/bg-light.png";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../Utils/Validation"; // Assuming validation functions exist
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  useResendOtpAPIMutation,
  useSignUpAPIMutation,
  useVerifyOtpAPIMutation,
} from "../ReduxState/Slices/userApiSlice";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialStateErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false); // State to show OTP form
  const [inputbox, setInputbox] = useState(new Array(6).fill("")); // OTP Input state
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.name === "") {
      error.name = "Name is required.";
    }
    if (data.email === "") {
      error.email = "Email is required.";
    } else if (!isValidEmail(data.email)) {
      error.email = "Email is invalid.";
    }
    if (data.password === "") {
      error.password = "Password is required.";
    } else if (!isValidPassword(data.password)) {
      error.password = "Password must be at least 8 characters.";
    }
    if (data.confirmPassword === "") {
      error.confirmPassword = "Confirm Password is required.";
    } else if (data.confirmPassword !== data.password) {
      error.confirmPassword = "Passwords do not match.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));

    // Validate the inputs
    const newError = handleValidation({
      ...inputs,
      [name]: value,
    });
    setErrors(newError);
  };

  const handleErrors = (obj) => {
    return Object.values(obj).every((error) => error === "");
  };

  const handleOTPSubmit = () => {
    // Handle OTP submission logic here
    console.log("OTP Submitted:", inputbox.join(""));
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpAPI, { isLoading }] = useSignUpAPIMutation({});
  const [verifyOtpAPI, { isLoading: otpLoading }] = useVerifyOtpAPIMutation({});
  const [resendOtpAPI, { isLoading: resendOtpLoading }] =
    useResendOtpAPIMutation({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = handleValidation(inputs);
    setErrors(newErrors);
    setSubmitted(true);

    if (handleErrors(newErrors)) {
      signUpAPI(inputs)
        .then((res) => {
          setShowOTP(true);
          toast(res.data.message, {
            icon: "👍",
          });
        })
        .catch((error) => {
          console.error("Error signing up:", error.data.message);
          toast.error("An error occurred during sign up.");
        });
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otp = inputbox.join(""); // Join OTP inputs to get the final OTP string

    // Ensure OTP is 6 digits before proceeding
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    // Send OTP along with email or user data for verification
    verifyOtpAPI({ otp, email: inputs.email })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res.data.message, {
            icon: "👍",
          });
          setShowOTP(false);
          navigate("/Login"); // Navigate to login after successful OTP verification
          setInputs({ name: "", email: "", password: "", confirmPassword: "" });
        } else {
          toast.error(res?.error?.data?.message || "OTP verification failed.");
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        toast.error("An error occurred during OTP verification.");
      });
  };

  const handleResendOTP = (e) => {
    e.preventDefault();

    resendOtpAPI({ email: inputs.email })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res.data.message, {
            icon: "👍",
          });
        } else {
          toast.error(res?.error?.data?.message || "OTP resend failed.");
        }
      })
      .catch((error) => {
        console.error("Error resending OTP:", error);
        toast.error("An error occurred during OTP resend.");
      });
    // Send email or user data for OTP resending
  };

  return (
    <section
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent backdrop-blur-xl p-8 rounded-lg shadow-lg w-full max-w-sm">
          {!showOTP ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Signup</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Name Field */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    autoComplete="off"
                    className="peer placeholder-transparent pl-2 border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2"
                    placeholder="Name"
                    title="Enter Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 pl-2 peer-focus:pl-1 -top-1 peer-focus:text-sm peer-focus:text-violet-600 peer-placeholder-shown:top-2 peer-focus:-top-1"
                  >
                    Name
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                {/* Email Field */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    autoComplete="off"
                    className="peer placeholder-transparent pl-2 border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2"
                    placeholder="Email"
                    title="Enter Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 pl-2 peer-focus:pl-1 -top-1 peer-focus:text-sm peer-focus:text-violet-600 peer-placeholder-shown:top-2 peer-focus:-top-1"
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                {/* Password Field */}
                <div className="relative mb-6">
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-violet-600 cursor-pointer"
                    onClick={togglePassword}
                    title="Show Password"
                  >
                    {showPassword ? <IoMdEyeOff /> : <MdRemoveRedEye />}
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className="peer placeholder-transparent pl-2 border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2"
                    placeholder="Password"
                    title="Enter Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 pl-2 peer-focus:pl-1 -top-1 peer-focus:text-sm peer-focus:text-violet-600 peer-placeholder-shown:top-2 peer-focus:-top-1"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                {/* Confirm Password Field */}
                <div className="relative mb-6">
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-violet-600 cursor-pointer"
                    onClick={toggleConfirmPassword}
                    title="Show Confirm Password"
                  >
                    {showConfirmPassword ? <IoMdEyeOff /> : <MdRemoveRedEye />}
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={inputs.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    className="peer placeholder-transparent pl-2 border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2"
                    placeholder="Confirm Password"
                    title="Enter Confirm Password"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-0 pl-2 peer-focus:pl-1 -top-1 peer-focus:text-sm peer-focus:text-violet-600 peer-placeholder-shown:top-2 peer-focus:-top-1"
                  >
                    Confirm Password
                  </label>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                {/* Verify Email Button */}
                <button
                  type="button"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors"
                  onClick={handleSubmit}
                >
                  {isLoading ? "Loading..." : "Get OTP"}
                </button>
                <p className="text-center mt-4">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-indigo-600 hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Enter OTP
              </h2>
              <div className="flex justify-center space-x-2 mb-6">
                {inputbox.map((item, index) => (
                  <input
                    type="text"
                    maxLength={1}
                    key={index}
                    onChange={(e) => handleInputBox(e, index)}
                    value={item}
                    className="w-10 h-10 text-center border-b-2 border-gray-500 focus:border-violet-600 focus:outline-none"
                  />
                ))}
              </div>
              <p>
                <button
                  type="button"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors"
                  onClick={handleVerifyOTP}
                >
                  {isLoading ? "Loading..." : "Verify OTP"}
                </button>
                <span>
                  Didn't receive OTP?{" "}
                  <button
                    onClick={handleResendOTP}
                    className="text-white hover:underline"
                  >
                    {isLoading ? "Loading..." : "Resend OTP"}
                  </button>
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Signup;
