import { SafeAreaView } from "react-native-safe-area-context";
import { AddIcon, Box, Button, ButtonIcon, ButtonText, Card, Center, FlatList, HStack, Heading, Text } from "@gluestack-ui/themed"
import useTaskStore from "../../store/taskStore"
import { useEffect } from 'react';


const AddTaskScreen = ({ navigation }) => {
    const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate
    }));
    
    const storedTasks = tasks;
    
    useEffect(() => {
        if (storedTasks){
            console.log("storedTasks in AddTaskScreen : ", storedTasks.length + "  " + new Date().toString());
            console.log("selectedDate in AddTaskScreen : ", selectedDate.toString());
        }
      }, [tasks, selectedDate]);

    

    return (
        <SafeAreaView>
         
            <HStack space="4xl" reversed={false}>
            <Box width='20%'>
                <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText verticalAlign="middle"> Cancel </ButtonText>
                </Button>
            </Box>
            <Box width='40%'>
                <Center>
                    <Heading>New Task</Heading>
                </Center>
            </Box>
            <Box width='20%'>
                <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText verticalAlign="middle"> Save </ButtonText>
                </Button>
            </Box>
            </HStack>
            <Card>
                <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText>Add </ButtonText>
                </Button>
                <Button size="md" variant="link" action="primary" isDisabled={false} isFocusVisible={false} >
                    <ButtonText>Date </ButtonText>
                </Button>
            
            </Card>
        </SafeAreaView>
    );
};

export default AddTaskScreen;
