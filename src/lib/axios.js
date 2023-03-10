import {boot} from "quasar/wrappers";
import axios from "axios";

const api = axios.create({baseURL: process.env.APP_URL_SERVICE});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "Bearer " + JSON.parse(token).access;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default boot(({app}) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export {axios, api};
