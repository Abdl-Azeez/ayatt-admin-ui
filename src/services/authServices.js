import HttpService from "./HttpService";

export const LoginService = (payload) => {
  const http = new HttpService();
  const url = "user/login";
  return http.postData(payload, url);
};

