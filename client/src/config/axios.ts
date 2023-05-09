import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:7036' });
export default instance;
