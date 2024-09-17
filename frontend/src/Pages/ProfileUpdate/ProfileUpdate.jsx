import React, { useState, useEffect } from 'react';
import { useGetProfileAPIQuery } from '../../Components/ReduxState/Slices/userApiSlice';
import 'tailwindcss/tailwind.css';

const ProfileUpdate = () => {
  const { data } = useGetProfileAPIQuery();
  const [inputs, setInputs] = useState({
    name: '',
    password: '',
    confirmpassword: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (data) {
      setInputs({
        name: data.name || '',
        password: '',
        confirmpassword: '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 p-4">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Update Profile</h1>

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
            autoComplete='off'
            autoCapitalize='on'
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full border-b-2 border-gray-400 py-2 px-3 bg-transparent focus:outline-none focus:border-indigo-500 transition duration-300"
            placeholder="Enter new password"
            value={inputs.email}
            onChange={handleChange}
            
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmpassword"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            className="w-full border-b-2 border-gray-400 py-2 px-3 bg-transparent focus:outline-none focus:border-indigo-500 transition duration-300"
            placeholder="Confirm your new password"
            value={inputs.confirmpassword}
            onChange={handleChange}
           
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Update Profile
        </button>

        {submitted && (
          <p className="text-green-500 mt-4 text-center">Profile updated successfully!</p>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdate;
