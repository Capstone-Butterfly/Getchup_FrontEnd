import profileStore from '../store/profileStore';
import axiosInstance from './axiosInstance';

const signInProfile = async (email, password) => {
    try {
        const response = await axiosInstance.post(`/login`, { email, password });
        const { token, userId } = response.data;
        profileStore.setState({ token, userId, is_login: true });

        return response.data;
    } catch (error) {
        console.error("Error signIn:", error);
        throw error;
    }
};

const signUpProfile = async (firstName, lastName, email, password, phone) => {
    try {
        phone = " ";
        const response = await axiosInstance.post(`/createaccount`, { first_name: firstName, last_name: lastName, email, password, phone });
        return response.data;
    } catch (error) {
        console.error("Error signUp:", error);
        throw error;
    }
};

const surveyQuestionProfile = async (questions) => {
    try {
        const { token } = profileStore.getState();
        const response = await axiosInstance.post(`/surveys/submit`, { questions }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error surveyQuestion:", error);
        throw error;
    }
};

const userDataProfile = async (userId) => {
    try {
        const { token } = profileStore.getState();
        const response = await axiosInstance.get(`/getUserDetails/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error userData:", error);
        throw error;
    }
};

const updateUserProfile = async (userId, userInfo) => {
    try {
        const { token } = profileStore.getState();
        const response = await axiosInstance.put(`/update/${userId}`, userInfo, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updateUserProfile:", error);
        throw error;
    }
};

export { signInProfile, signUpProfile, surveyQuestionProfile, userDataProfile, updateUserProfile };