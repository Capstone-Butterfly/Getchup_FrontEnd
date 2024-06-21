import React from 'react';
import { SafeAreaView } from 'react-native';
import AgendaDetails from '../../components/AgendaDetails';

const AgendaScreen = ({ route }) => {
    const { selectedDate } = route.params;
    const parsedDate = new Date(selectedDate); // Parse the date string back to a Date object

    return (
        <SafeAreaView>
            <AgendaDetails selectedDate={parsedDate} />
        </SafeAreaView>
    );
};

export default AgendaScreen;
