import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://52.55.48.104:8080/api/v1/', // Replace with your local backend URL and port
});

export default instance;
