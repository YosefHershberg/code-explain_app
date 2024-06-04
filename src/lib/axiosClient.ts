import axios from 'axios';
const VITE_GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN

const axiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VITE_GITHUB_ACCESS_TOKEN}`
    },
    // withCredentials: true,
});

export default axiosClient;