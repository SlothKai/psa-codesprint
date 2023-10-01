import axios from "axios";

export const withAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SHTNR_BACKEND}`,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  //   withCredentials: true,
});
