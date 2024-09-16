import React from "react";
import { isValidEmail } from "../../Utils/Validation";
import { useForgotAPIMutation } from "../ReduxState/Slices/userApiSlice";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState(""); // Handle email separately
  const [error, setError] = React.useState(""); // Handle errors separately

  const [forgotAPI, { isLoading }] = useForgotAPIMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      setError("Enter your email");
      return;
    } else if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    setError(""); // Clear error when input is valid

    forgotAPI({ email })
      .then((res) => {
        if (res?.data?.success === true) {
          toast.success(res.data.message);
          setEmail(""); // Reset email field after successful submission
        } else {
          toast.error(res?.error?.data?.message || "Failed to send reset link");
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Internal server error");
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="peer placeholder-transparent pl-4 border-gray-500 border-b-2 focus:outline-none w-full focus:border-violet-600 py-2 bg-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-0 pl-4 text-gray-500 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all duration-300 peer-focus:text-violet-600 peer-focus:top-0 text-sm peer-placeholder-shown:text-base"
            >
              Email
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
