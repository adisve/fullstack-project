import axios from 'axios';
axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: 'http://localhost:7036/',
    withCredentials: true,
});
export default instance;
