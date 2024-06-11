import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const checkAuthorization = async (navigation) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log("Token inside authUtils is", token);

    if (token) {
      // Token exists, perform validation
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp < currentTime) {
        // Token is expired, navigate to login screen
        navigation.navigate('Login');
        return false;
      } else {
        // Token is valid
        return true;
      }
    } else {
      // Token does not exist, navigate to login screen
      navigation.navigate('Login');
      return false;
    }
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
};
