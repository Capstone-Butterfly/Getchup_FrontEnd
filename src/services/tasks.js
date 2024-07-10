import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const base_url = BASE_URL;

const fetchTasks = async () => {
  const { data } = await axios.get( `${base_url}/tasks/`);
  return data;
};
 
const fetchTasksByTaskId = async (taskId) => {
    const { data } = await axios.get( `${base_url}/tasks/${taskId}`);
    return data;
};

const fetchTasksByUserId = async (userId) => {
    console.log("fetch data from axios!!!");
    const { data } = await axios.get( `${base_url}/tasks/user/${userId}`);
    return data;
};

const addTask = async (newTask) => {
  try {
    //console.log("newTask :", newTask);
    const { data } = await axios.post(`${base_url}/tasks/`, newTask);
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

const getAISubTasks = async (newTitle) => {
  try {
    const { data } = await axios.post(`${base_url}/tasks/aisubtasks/`, newTitle);
    //const data = {subtask: [{"movement": true, "status": "new", "sub_title": "Warm up stretching exercises", "time": "5 minutes"}, {"movement": true, "status": "new", "sub_title": "Jog at a moderate pace", "time": "15 minutes"}, {"movement": true, "status": "new", "sub_title": "Sprint intervals", "time": "5 minutes"}, {"movement": true, "status": "new", "sub_title": "Cool down walking", "time": "5 minutes"}]}
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

const updateTaskStartTime = async (taskId, start_date, mainTaskStartTime, subtaskStartTime, MAIN_STATUS, STATUS, subtaskIndex) => {
  try {
    console.log("Starting task with task id: ", taskId);
          const requestBody = {
          start_date: start_date,
          start_time: mainTaskStartTime,
          subtask: [{
              index: subtaskIndex, 
              start_time: subtaskStartTime,
              status: STATUS
          }]
      };
      const { data } = await axios.patch(`${base_url}/tasks/${taskId}`, requestBody);
      return data;
  } catch (error) {
      console.error("Error updating task start time:", error);
      handleAxiosError(error);
  }
};

const updateTaskEndTime = async (taskId, mainTaskEndTime, subtaskEndTime, MAIN_STATUS, STATUS, subtaskIndex, isLastStep) => {
  try {
    console.log("Ending task with task id: ", taskId);
      
      const requestBody = {
          subtask: [{
              index: subtaskIndex,
              end_time: subtaskEndTime,
              status: STATUS
          }]
      };

      if (isLastStep) {
          requestBody.end_time = mainTaskEndTime;
          requestBody.main_status = MAIN_STATUS;
      }

      console.log("request body is: ", requestBody);

      const { data } = await axios.patch(`${base_url}/tasks/${taskId}`, requestBody);
      return data;
  } catch (error) {
      console.error("Error updating task end time:", error);
      handleAxiosError(error);
  
  }
};

const markSubtaskAsComplete = async (taskId, subtaskEndTime, STATUS, subtaskIndex, totalSubtasks) => {
  try {
    console.log("Completing subtask of task with task id: ", taskId);

    const isLastStep = subtaskIndex === totalSubtasks - 1;
    const requestBody = {
      subtask: [{
        index: subtaskIndex,
        end_time: subtaskEndTime,
        status: STATUS
      }]
    };

    if (isLastStep) {
      console.log("is last step");
      requestBody.end_time = subtaskEndTime;
      requestBody.main_status = 'complete';
    }

    console.log("request body is: ", requestBody);

    const { data } = await axios.patch(`${base_url}/tasks/${taskId}`, requestBody);
    return data;
  } catch (error) {
    console.error("Error updating subtask end time:", error);
    handleAxiosError(error);
  }
};



const pauseTask = async (taskId, pause_time, MAIN_STATUS, STATUS, subtaskIndex) => {
  try {
    console.log("Pausing task with task id: ", taskId);
    const requestBody = {
      main_status: MAIN_STATUS,
      subtask: [{
        index: subtaskIndex,
        status: STATUS,
        pause_time: pause_time,
      }]
    };
    const { data } = await axios.patch(`${base_url}/tasks/${taskId}`, requestBody);
    return data;
  } catch (error) {
    console.error("Error pausing task:", error);
    handleAxiosError(error);
  }
};

const manualCompleteTask = async (taskId) => {
  const { data } = await axios.patch( `${base_url}/tasks/manualcomplete/${taskId}`);
  return data;
};

const handleAxiosError = (error) => {
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("Request made but no response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
  throw error;
};

export { fetchTasks, fetchTasksByTaskId, fetchTasksByUserId, 
  addTask, getAISubTasks, updateTaskStartTime, updateTaskEndTime, 
  pauseTask, manualCompleteTask, handleAxiosError, markSubtaskAsComplete};