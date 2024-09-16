import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../Constant/constants";


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const apiSlice = createApi({
  name: "api",
  tagTypes: ["User"],
  baseQuery,
  endpoints: (builder) => ({}),
});
