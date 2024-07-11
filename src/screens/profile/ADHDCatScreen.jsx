
import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import profileStore from '../../store/profileStore';
import { useNavigation } from '@react-navigation/native';
import { config } from '../../styles/themeConfig'; 
import { defaultStyles } from './../../styles/styles'

// Get device dimensions
const { width, height } = Dimensions.get('window');

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
        <View style={styles.container}>
            <Text style={[defaultStyles.TypographyH2]}>All done! Let's Get Started!</Text>
            <Button style={[defaultStyles.TypographyLink, styles.callToNavigate]} color={config.tokens.colors.primaryDark}   fontFamily= {"Archivo_600SemiBold"}
        fontSize={16}
        lineHeight={22}
        textDecorationLine="underline" title="Go to Home" onPress={handleGoToHome} />
        <View style={styles.circlesContainer}>
        <View style={[styles.circle, styles.circleYellow]} />
        <View style={[styles.circle, styles.circleRed]} />
        <View style={[styles.circle, styles.circleBlue]} />
      </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: config.tokens.colors.background,
        position: 'relative',
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    callToNavigate: {
        color: config.tokens.colors.primaryDark,
        textAlign: 'center',
      },
      circlesContainer: {
        position: 'absolute',
        bottom: -180,
        width: width,
        height: height * 0.2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
      },
      circle: {
        width: 300,
        height: 300,
        borderRadius: config.tokens.borderRadius.xl,
      },
      circleYellow: {
        backgroundColor: config.tokens.colors.mediumPriority,
      },
      circleRed: {
        backgroundColor: config.tokens.colors.highPriority,
        zIndex: 10,
      },
      circleBlue: {
        backgroundColor: config.tokens.colors.blue,
      },
  });
  
export default ADHDCatScreen;