
import axios from 'axios'

export const axiosInstance= axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://spotify-clone-6p2f.onrender.com" : "/api",
})
