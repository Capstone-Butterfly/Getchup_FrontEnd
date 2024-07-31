import axiosInstance from './axiosInstance';

const getTodayChartDetails = async (userId, startDate, endDate) => {
    const { data } = await axiosInstance.get( `/todaychartdetails/${userId}/${startDate}/${endDate}`);
    return data;
};

const getWeeklyChartDetails = async (userId, sDate, eDate) => {
    const { data } = await axiosInstance.get( `/weeklychartdetails/${userId}/${sDate}/${eDate}`);
    return data;
};

const getMonthlyChartDetails = async (userId, sDate, eDate) => {
    const { data } = await axiosInstance.get( `/monthlychartdetails/${userId}/${sDate}/${eDate}`);
    return data;
};

export {  getTodayChartDetails, getWeeklyChartDetails, getMonthlyChartDetails }