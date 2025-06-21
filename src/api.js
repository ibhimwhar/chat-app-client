import axios from "axios";

const API = axios.create({ baseURL: "/api", });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default API;
