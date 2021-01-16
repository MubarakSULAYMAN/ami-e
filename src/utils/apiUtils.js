import axios from 'axios'

const apiRequest = axios.create({
    baseURL: `https://randomuser.me`,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default apiRequest