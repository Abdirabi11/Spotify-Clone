
import axios from 'axios'

export const axiosInstance= axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4003/api",
})
