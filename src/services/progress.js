import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const base_url = BASE_URL;

const getTodayChartDetails = async (userId, startDate, endDate) => {
    const { data } = await axios.get( `${base_url}/todaychartdetails/${userId}/${startDate}/${endDate}`);
    return data;
};

const getWeeklyChartDetails = async (userId, sDate, eDate) => {
    const { data } = await axios.get( `${base_url}/weeklychartdetails/${userId}/${sDate}/${eDate}`);
    return data;
};

const getMonthlyChartDetails = async (userId, sDate, eDate) => {
    const { data } = await axios.get( `${base_url}/monthlychartdetails/${userId}/${sDate}/${eDate}`);
    return data;
};

export {  getTodayChartDetails, getWeeklyChartDetails, getMonthlyChartDetails }