
import React from 'react';
import { View, Text, Button } from 'react-native';
import profileStore from '../../store/profileStore';
import { useNavigation } from '@react-navigation/native';

const ADHDCatScreen = () => {
    const setIsLogin = profileStore((state) => state.setIsLogin);
    const setSurveyDone = profileStore((state) => state.setSurveyDone);
    const navigation = useNavigation();

    const handleGoToHome = () => {
        setIsLogin(true); 
        setSurveyDone(true);
        navigation.navigate('HomeScreen');
    };

    return (
        <View>
            <Text>ADHD Cat Screen</Text>
            <Button title="Go to Home" onPress={handleGoToHome} />
        </View>
    );
};

export default ADHDCatScreen;