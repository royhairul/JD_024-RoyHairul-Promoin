import axios from "axios";

// buat instance axios
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // untuk cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor untuk menambahkan Bearer token otomatis
api.interceptors.request.use(
  (config) => {
    // ambil token dari localStorage atau cookie
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor untuk response (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // redirect ke login atau tampilkan notifikasi
      console.log("Unauthorized, please login again");
    }
    return Promise.reject(error);
  }
);
