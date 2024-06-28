import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';
import DateFormatter from '../utils/DateFormatter';

const base_url = BASE_URL;
const todayDate = DateFormatter(new Date()).toLocaleString('en-CA').split(',')[0];

const getTodayProgress = async (userId) => {
    //console.log("todayDate ", todayDate);
    const { data } = await axios.get( `${base_url}/tasks/stats/${userId}/${todayDate}/${todayDate}`);
    //console.log("today progress data ", data)
    return data;
};

export { getTodayProgress }