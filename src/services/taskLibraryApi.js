import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const base_url = BASE_URL;

const fetchCommonTasks = async () => {
  const { data } = await axios.get( `${base_url}/commonTasks`);
  return data;
};

export { fetchCommonTasks };