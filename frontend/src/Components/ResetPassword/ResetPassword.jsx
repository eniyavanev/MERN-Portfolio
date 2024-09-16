import { useState } from "react";
import { isValidPassword } from "../../Utils/Validation";

const ResetPassword = () => {
  //Empty state
  const initialState = {
    password: "",
    confirmpassword: "",
  };

  //Initial state validation
  const [inputs, setInputs] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialState);

  //Validation
  const handleValidation = (data) => {
    let error = { ...initialState };
    if (data.password === "") {
      error.password = "Password is required";
    }
    if (!isValidPassword(data.password)) {
      error.password = "Password must be at least 8 characters";
    }
    if (data.confirmpassword === "") {
      error.confirmpassword = "Confirm Password is required";
    }
    if (data.password !== data.confirmpassword) {
      error.confirmpassword = "Password and Confirm Password should match";
    }
    return error;
  };

  //Input change
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };
  //Error handling
  const handleErrors = (obj) => {
    return Object.values(obj).every((error) => error === "");
  };

  //Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      //console.log(inputs);
      
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Reset Password
        </h1>

        {/* New Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            New Password
          </label>
          <input
            title="Password must be at least 8 characters"
            type="password"
            name="password"
            className="w-full border-b-2 border-gray-400 py-2 px-4 bg-transparent focus:border-indigo-500 focus:outline-none transition duration-300"
            placeholder="Enter new password"
            onChange={handleChnage}
            value={inputs.password}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        {/* Confirm Password Input */}
        <div className="mb-6">
          <label
            htmlFor="confirmpassword"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            title="Password must be at least 8 characters"
            type="password"
            name="confirmpassword"
            className="w-full border-b-2 border-gray-400 py-2 px-4 bg-transparent focus:border-indigo-500 focus:outline-none transition duration-300"
            placeholder="Confirm new password"
            onChange={handleChnage}
            value={inputs.confirmpassword}
          />
        </div>
        {errors.confirmpassword && (
          <p className="text-red-500 text-sm">{errors.confirmpassword}</p>
        )}
        {/* Submit Button */}
        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
