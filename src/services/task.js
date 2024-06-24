import axios from 'axios';

//EXAMPLE ONLY:
const fetchTasks = async () => {
  const { data } = await axios.get('http://192.168.1.69:5003/tasks');
  //const { data } = await axios.get('http://127.0.0.1:5003/tasks');
  return data;
};