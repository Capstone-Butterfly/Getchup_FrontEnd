import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import WeeklyCalendar from "../../components/WeeklyCalendar";
import { Text } from "@gluestack-ui/themed";

const userId = '6668b7f95dbce97bc28322d2';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Header />
            <Greeting />
            <WeeklyCalendar userId={userId} />
        </SafeAreaView>
    );
};

export default HomeScreen;
