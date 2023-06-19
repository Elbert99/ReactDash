import axios from "axios";

// const baseURL = "http://127.0.0.1:8000/sensordata/";
const AxiosInstance = axios.create({
  baseURL: "http://172.16.154.8:8080/",
});

export default AxiosInstance;
