import React from 'react';
import { SafeAreaView } from 'react-native';
import AgendaDetails from '../../components/AgendaDetails';

const AgendaScreen = ({ route, navigation }) => {
  const { selectedDate } = route.params;
    const parsedDate = new Date(selectedDate); 

  return (
    <SafeAreaView>
      <AgendaDetails selectedDate={parsedDate} navigation={navigation}/>
    </SafeAreaView>
  );
};

export default AgendaScreen;