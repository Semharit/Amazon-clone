import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-36250/us-central1/api",
  baseURL: "https://api-c5fpcpnuxa-uc.a.run.app",
});

export{axiosInstance}