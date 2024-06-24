import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import WeeklyCalendar from "../../components/WeeklyCalendar2";

const userId = '6668b7f95dbce97bc28322d2';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Header />
            <Greeting />
            <WeeklyCalendar userId={userId} navigation={navigation}/>
        </SafeAreaView>
    );
};

export default HomeScreen;
