import axios from "axios";

export const checkAuthTokens = () => {
  let authTokens = localStorage.getItem("ayattToken") ? JSON.parse(localStorage.getItem("ayattToken")) : null;
  return authTokens;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // headers: { Authorization: `Bearer ${checkAuthTokens()?.access_token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (checkAuthTokens()) {
    console.log(checkAuthTokens())
    req.headers.Authorization = `Bearer ${checkAuthTokens()}`;
  }
  req.headers.requester = req.baseURL;
  req.headers["Access-Control-Allow-Origin"] = "*";
  return req;
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 403 || error.response.data.error === "authorize") {
//       localStorage.removeItem("ayattToken")
//       await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
