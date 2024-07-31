import axiosInstance from './axiosInstance';


const fetchCommonTasks = async () => {
  const { data } = await axiosInstance.get( `/commonTasks`);
  return data;
};

const fetchRepeatedTasks = async (userId) => {
  const { data } = await axiosInstance.get( `/repeatedTasks/${userId}`);
  return data;
};

export { fetchCommonTasks, fetchRepeatedTasks };