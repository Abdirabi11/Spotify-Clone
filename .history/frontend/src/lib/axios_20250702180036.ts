
import axios from 'axios'

export const axiosInstance= axios.create({
    baseURL: "https://spotify-clone-6p2f.onrender.com" || "http://localhost:4003"
})
