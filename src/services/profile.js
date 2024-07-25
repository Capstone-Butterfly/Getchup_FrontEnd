// src/services/profile.js
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';
import profileStore from '../store/profileStore';

const base_url = BASE_URL;

const signInProfile = async (email, password) => {
    try {
        const response = await axios.post(`${base_url}/login`, { email, password });
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
        const response = await axios.post(`${base_url}/createaccount`, { first_name: firstName, last_name: lastName, email, password, phone });
        return response.data;
    } catch (error) {
        console.error("Error signUp:", error);
        throw error;
    }
};

const surveyQuestionProfile = async (questions) => {
    try {
        const { token } = profileStore.getState();
        const response = await axios.post(`${base_url}/surveys/submit`, { questions }, {
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
        const response = await axios.get(`${base_url}/getUserDetails/${userId}`, {
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
        const response = await axios.put(`${base_url}/update/${userId}`, userInfo, {
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