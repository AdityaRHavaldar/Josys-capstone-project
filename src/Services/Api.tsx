import axios from "axios";

const BASE_URL = "http://localhost:3200";

const Api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
