import React, { useState } from "react";
import BgImage from "../../assets/Images/bg-light.png";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Components/ReduxState/Slices/authSlice";
import { useLoginAPIMutation } from "../ReduxState/Slices/userApiSlice";
import { isValidEmail, isValidPassword } from "../../Utils/Validation";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginAPI, { isLoading }] = useLoginAPIMutation({});

  const initialState = {
    email: "",
    password: "",
  };

  const initialStateErrors = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
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
    return error;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));

    if (submitted) {
      // Always validate input changes
      const newError = handleValidation({
        ...inputs,
        [name]: value,
      });
      setErrors(newError);
    }
  };

  const handleErrors = (obj) => {
    return Object.values(obj).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleValidation(inputs);
    setErrors(newErrors);
    setSubmitted(true);

    if (handleErrors(newErrors)) {
      try {
        const data = await loginAPI(inputs).unwrap();
        console.log("data", data);

        if (data.isVerified === true) {
          dispatch(login(data));
          navigate("/");
          toast(data.message, {
            icon: "👍",
          });
        }
      } catch (err) {
        console.error(err.data.message);
        toast(err.data.message, {
          icon: "❌",
        });
      }
    }
  };

  return (
    <section
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2.5 text-white bg-indigo-600 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
      >
        Back to Home
      </Link>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-transparent backdrop-blur-xl p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="relative mb-6">
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                autoComplete="off"
                className="peer placeholder-transparent border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2"
                placeholder=""
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
                className="peer placeholder-transparent border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2"
                placeholder=""
                title="Enter Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 pl-2 peer-focus:pl-1 -top-1 peer-focus:text-sm peer-focus:text-violet-600 peer-placeholder-shown:top-2 peer-focus:-top-1"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="text-right cursor-pointer mb-6">
              <Link to="/ForgetPassword">
                <small className="hover:underline">Forgot Password?</small>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/Signup" className="text-indigo-600 hover:underline">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
