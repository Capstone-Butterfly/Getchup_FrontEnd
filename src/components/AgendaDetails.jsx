import React from 'react';
import { View, Text } from 'react-native';

const AgendaDetails = ({ selectedDate }) => {
    return (
        <View>
            <Text>Selected Date: {selectedDate.toISOString().split('T')[0]}</Text>
        </View>
    );
};

export default AgendaDetails;
