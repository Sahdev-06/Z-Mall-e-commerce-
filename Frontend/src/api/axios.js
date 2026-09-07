import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "http://localhost:3000/api/v1",
    // baseURL : "http://192.168.1.4:3000/api/v1",
    withCredentials : true
})


export default axiosInstance