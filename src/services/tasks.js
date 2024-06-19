import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const base_url = BASE_URL;

const fetchTasks = async () => {
  const { data } = await axios.get( `${base_url}/tasks`);
  //const { data } = await axios.get('http://127.0.0.1:8080/api/v1/tasks');
  return data;
};
 
const fetchTasksByTaskId = async (taskId) => {
    const { data } = await axios.get( `${base_url}/tasks/${taskId}`);
    return data;
};

const fetchTasksByUserId = async (userId) => {
    console.log("userId : ", userId);
    const { data } = await axios.get( `${base_url}/tasks/user/${userId}`);
    return data;
};

const addTask = async (newTask) => {
  try {
    const { data } = await axios.post(`${base_url}/tasks`, newTask);
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export { fetchTasks, fetchTasksByTaskId, fetchTasksByUserId, addTask };