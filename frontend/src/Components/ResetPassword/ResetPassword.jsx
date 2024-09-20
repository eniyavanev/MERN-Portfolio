import { useState } from "react";
import { isValidPassword } from "../../Utils/Validation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordAPIMutation } from "../ReduxState/Slices/userApiSlice";

const ResetPassword = () => {
  const [resetPasswordAPI, { isLoading }] = useResetPasswordAPIMutation();
  // Empty state
  const initialState = {
    password: "",
    confirmPassword: "",
  };

  // Initial state validation
  const [inputs, setInputs] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialState);

  // Validation
  const handleValidation = (data) => {
    let error = { ...initialState };
    if (data.password === "") {
      error.password = "Password is required";
    }
    if (!isValidPassword(data.password)) {
      error.password = "Password must be at least 8 characters";
    }
    if (data.confirmPassword === "") {
      error.confirmPassword = "Confirm Password is required";
    }
    if (data.password !== data.confirmPassword) {
      error.confirmPassword = "Password and Confirm Password should match";
    }
    return error;
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };

  // Error handling
  const handleErrors = (obj) => {
    return Object.values(obj).every((error) => error === "");
  };

  const navigate = useNavigate();
  let { token } = useParams();
  //console.log("Token params:", token);

  const location = useLocation();
  //console.log(location.pathname.split("/")[2]);
  let resetPassword = location.pathname.split("/")[2];
  // Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
      // console.log("Reset Password API Request Data:", inputs);
      // console.log("Token:", token);

      resetPasswordAPI({ inputs, token }) // Make sure inputs and token are correctly passed
        .unwrap()
        .then((data) => {
          console.log(data);
          setInputs(initialState);
          navigate("/login", { replace: true });
          toast(data.message, {
            icon: "👍",
          });
        })
        .catch((error) => {
          console.error("Error resetting password:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          {/* New Password Input */}
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              title="Password must be at least 8 characters"
              type="password"
              name="password"
              id="new-password"
              className="w-full border-b-2 border-gray-400 py-2 px-4 bg-transparent focus:border-indigo-500 focus:outline-none transition duration-300"
              placeholder="Enter new password"
              onChange={handleChange}
              autoComplete="off"
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
              name="confirmPassword"
              className="w-full border-b-2 border-gray-400 py-2 px-4 bg-transparent focus:border-indigo-500 focus:outline-none transition duration-300"
              placeholder="Confirm new password"
              onChange={handleChange}
              autoComplete="off"
              value={inputs.confirmPassword}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
