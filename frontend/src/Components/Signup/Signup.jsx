// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-300">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Sign Up
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <div className="relative">
//             <input
//               type="text"
//               id="name"
//               className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 py-2 px-1 transition-all"
//               placeholder="Name"
//               required
//               minLength={4}
//               autoComplete="off"
//               onInvalid={(e) =>
//                 e.target.setCustomValidity("Please enter your name")
//               }
//             />
//             <label
//               htmlFor="name"
//               className="absolute left-1 top-1 text-gray-600 text-sm transition-transform duration-300 transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-600"
//             >
//               Name
//             </label>
//           </div>

//           {/* Email Field */}
//           <div className="relative">
//             <input
//               type="email"
//               id="email"
//               className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 py-2 px-1 transition-all"
//               placeholder="Email"
//               required
//               autoComplete="off"
//               pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
//               onInvalid={(e) =>
//                 e.target.setCustomValidity("Please enter a valid email address")
//               }
//             />
//             <label
//               htmlFor="email"
//               className="absolute left-1 top-1 text-gray-600 text-sm transition-transform duration-300 transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-600"
//             >
//               Email
//             </label>
//           </div>

//           {/* Password Field */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className={`peer w-full border-b-2 ${
//                 passwordError ? "border-red-500" : "border-gray-300"
//               } text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 py-2 px-1 transition-all`}
//               placeholder="Password"
//               autoComplete="off"
//               pattern=".{8,}"
//               onInvalid={(e) =>
//                 e.target.setCustomValidity(
//                   "Password must be at least 8 characters long"
//                 )
//               }
//               required
//               value={password}
//               onChange={handlePasswordChange}
//             />
//             <label
//               htmlFor="password"
//               className="absolute left-1 top-1 text-gray-600 text-sm transition-transform duration-300 transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-600"
//             >
//               Password
//             </label>
//             <span className="absolute right-1 top-2 cursor-pointer text-gray-600"></span>
//           </div>

//           {/* Confirm Password Field */}
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               className={`peer w-full border-b-2 ${
//                 passwordError ? "border-red-500" : "border-gray-300"
//               } text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 py-2 px-1 transition-all`}
//               placeholder="Confirm Password"
//               required
//               autoComplete="off"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//             />
//             <label
//               htmlFor="confirmPassword"
//               className="absolute left-1 top-1 text-gray-600 text-sm transition-transform duration-300 transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-indigo-600"
//             >
//               Confirm Password
//             </label>
//             <span className="absolute right-1 top-2 cursor-pointer text-gray-600"></span>
//           </div>

//           {/* Password Error Message */}

//           {/* Send OTP Button */}
//           <button
//             type="button"
//             onClick={handleSendOtp}
//             className="w-full text-indigo-600 font-semibold hover:underline mb-4"
//           >
//             Send OTP to Email
//           </button>

//           {/* OTP Fields */}

//           {/* Signup Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors"
//           >
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React from 'react'

const Signup = () => {
  return (
    <div>
      sd
    </div>
  )
}

export default Signup
