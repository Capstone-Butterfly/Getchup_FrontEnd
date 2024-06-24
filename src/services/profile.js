import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

const base_url = BASE_URL;

const signInProfile = async (email, password) => {
    try {
        const response = await axios.post(`${base_url}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error signIn:", error);
        throw error;
    }
};

const signUpProfile = async (firstName, lastName, email, password, phone) => {
    try {
        const response = await axios.post(`${base_url}/createaccount`, { first_name: firstName, last_name: lastName, email, password, phone });
        return response.data;
    } catch (error) {
        console.error("Error sigUp:", error);
        throw error;
    }
};

const surveyQuestionProfile = async (questions) => {
    try {
        const response = await axios.post(`${base_url}/surveys/submit`, { questions });
        return response.data;
    } catch (error) {
        console.error("Error surveyQuestion:", error);
        throw error;
    }
};
  
export { signInProfile, signUpProfile, surveyQuestionProfile };