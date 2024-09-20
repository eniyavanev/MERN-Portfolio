import { apiSlice } from "./apiSlice";
import {
  signUp,
  login,
  resendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  profile,
} from "../Constant/constants";
import { logoutc } from "../Constant/constants";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAPI: builder.mutation({
      query: (data) => ({
        url: login,
        method: "POST",
        body: data,
      }),
    }),
    logOutAPI: builder.mutation({
      query: () => ({
        url: logoutc,
        method: "POST",
      }),
    }),
    signUpAPI: builder.mutation({
      query: (data) => ({
        url: signUp,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtpAPI: builder.mutation({
      query: (data) => ({
        url: verifyOtp,
        method: "POST",
        body: data,
      }),
    }),
    resendOtpAPI: builder.mutation({
      query: (data) => ({
        url: resendOtp,
        method: "POST",
        body: data,
      }),
    }),
    forgotAPI: builder.mutation({
      query: (data) => ({
        url: forgotPassword,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordAPI: builder.mutation({
      query: ({ inputs, token }) => {
        // Log the data and token here
        console.log("Reset Password API Request Data:", inputs);
        console.log("Reset Password API Token:", token);
    
        return {
          url: `${resetPassword}/${token}`, // Ensure the correct endpoint
          method: "PUT",
          body: inputs, // Use 'inputs' instead of 'data'
        };
      },
    }),
    
    getProfileAPI: builder.query({
      query: () => ({
        url: profile,
        method: "GET",
      }),
    }),
    updateProfileAPI: builder.mutation({
      query: (data) => ({
        url: profile,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginAPIMutation,
  useLogOutAPIMutation,
  useSignUpAPIMutation,
  useVerifyOtpAPIMutation,
  useResendOtpAPIMutation,
  useForgotAPIMutation,
  useResetPasswordAPIMutation,
  useGetProfileAPIQuery,
  useUpdateProfileAPIMutation,
} = userSlice;
