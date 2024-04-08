import axios from "axios";

export const checkAuthTokens = () => {
  let authTokens = localStorage.getItem("bnbToken") ? JSON.parse(localStorage.getItem("bnbToken")) : null;

  return authTokens;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // headers: { Authorization: `Bearer ${checkAuthTokens()?.access_token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (checkAuthTokens()) {
    req.headers.Authorization = `Bearer ${checkAuthTokens()}`;
  }
  req.headers.requester = req.baseURL;
  req.headers["Access-Control-Allow-Origin"] = "*";

  return req;
});


export default axiosInstance;
