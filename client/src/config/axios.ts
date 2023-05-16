import axios from 'axios';
axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: 'https://protracker-fullstack-project.onrender.com/',
    withCredentials: true,
});
export default instance;
