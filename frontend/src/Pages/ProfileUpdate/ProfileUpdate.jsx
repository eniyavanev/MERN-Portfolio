import React, { useState, useEffect } from "react";
import {
  useGetProfileAPIQuery,
  useUpdateProfileAPIMutation,
} from "../../Components/ReduxState/Slices/userApiSlice";
import "tailwindcss/tailwind.css";
import { isValidPassword } from "../../Utils/Validation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing icons from react-icons

const ProfileUpdate = () => {
  const { data } = useGetProfileAPIQuery();
  const [updateProfileAPI, { isLoading }] = useUpdateProfileAPIMutation();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo.user);
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    password: "",
    confirmpassword: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // state for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // state for confirm password visibility

  useEffect(() => {
    if (data) {
      setInputs({
        name: data.name || "",
        password: "",
      });
    }
  }, [data]);

  const handleValidation = (data) => {
    let error = {};

    if (data.name === "") {
      error.name = "Name is required";
    }

    if (data.password === "") {
      error.password = "Password is required";
    } else if (!isValidPassword(data.password)) {
      error.password = "Password must be at least 8 characters";
    }

    if (data.password !== data.confirmpassword) {
      error.confirmpassword = "Password and Confirm Password should match";
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleErrors = (obj) => {
    return Object.values(obj).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const inputData = {
      name: inputs.name,
      password: inputs.password,
    };
    try {
      if (handleErrors(newError)) {
        console.log("Profile Update API Request Data:", inputs);
        const data = await updateProfileAPI(inputData).unwrap();
        setInputs({
          name: "",
          password: "",
          confirmpassword: "",
        })
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-4">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Update Profile
        </h1>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full border-b-2 border-gray-400 py-2 px-3 bg-transparent focus:outline-none focus:border-indigo-500 transition duration-300"
            placeholder="Enter your name"
            value={inputs.name}
            onChange={handleChange}
            autoComplete="off"
            autoCapitalize="on"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        )}

        {/* Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="w-full border-b-2 border-gray-400 py-2 px-3 bg-transparent focus:outline-none focus:border-indigo-500 transition duration-300"
            placeholder="Enter new password"
            value={inputs.password}
            onChange={handleChange}
          />
          {/* Eye Icon for password visibility toggle */}
          <div
            className="absolute top-9 right-2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiFillEye className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}

        {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="confirmpassword"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmpassword"
            id="confirmpassword"
            className="w-full border-b-2 border-gray-400 py-2 px-3 bg-transparent focus:outline-none focus:border-indigo-500 transition duration-300"
            placeholder="Enter confirm password"
            value={inputs.confirmpassword}
            onChange={handleChange}
          />
          {/* Eye Icon for confirm password visibility toggle */}
          <div
            className="absolute top-9 right-2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiFillEye className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </div>
        {errors.confirmpassword && (
          <p className="text-red-500 text-xs italic">{errors.confirmpassword}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
