import axios from "axios";

export const BaseApiUrl = {
  dev: "http://185.8.174.74:8000/",
  prod: "http://185.8.174.74:8000/",
};

export const AXIOS = axios.create({
  baseURL: BaseApiUrl.dev,
});
