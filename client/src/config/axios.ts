import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://protracker-fullstack-project.onrender.com/',
});
export default instance;
