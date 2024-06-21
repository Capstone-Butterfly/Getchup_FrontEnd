import { SafeAreaView } from "react-native-safe-area-context";
import { AddIcon, Box, Button, ButtonIcon, ButtonText, Card, Center, FlatList, HStack, Heading, Icon, Input, InputField, InputIcon, InputSlot, Pressable, Text, TextareaInput } from "@gluestack-ui/themed"
import useTaskStore from "../../store/taskStore"
import { useEffect } from 'react';
import { CalendarDaysIcon } from "@gluestack-ui/themed";
import { addTask } from '../../services/tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddTaskScreen = ({ navigation }) => {
    const { tasks, addDataTask } = useTaskStore();
    const storedTasks = tasks;
    const title = 'Clean my desk';
    const userId = '6668b7f95dbce97bc28322d2';
    const queryClient = useQueryClient();

    const mutation = useMutation(
    {
        mutationFn: async (newTask) => await addTask(newTask),
        onSuccess: (data) => {
        queryClient.invalidateQueries(['tasks']);
        displayData(data);
        },
    });

    const displayData = (data) => {
        console.log("New Data ", JSON.stringify(data));
    }

    useEffect(() => {
        console.log("TASKS :", tasks);
    }, [tasks]);

    const addToTask = async () => {
    try {
        const newTask = { title: title, user_id: userId };
        await mutation.mutateAsync(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
    }
    };
    

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
                <Pressable
                    onPress={() => console.log('Title')} p="$5">
                    <Text color="black" fontWeight={"$bold"}>Add Task Title</Text>
                    <Input variant="underlined" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                    <InputField
                        placeholder='Enter Text here'
                        value={title}
                    />
                    {/* <InputSlot>
                        <InputIcon as={AddIcon}></InputIcon>
                    </InputSlot> */}
                    </Input>
                </Pressable>
                <Pressable
                    onPress={() => console.log('Date')} p="$5">   
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }}   size="md" />
                    <Text color="black" fontWeight={"$bold"}>Date</Text>
                </Pressable>
                <Pressable
                    onPress={() => console.log('Notes')} p="$5"> 
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }}   size="md" />
                    <Text color="black" fontWeight={"$bold"}>Notes</Text>
                </Pressable>
                <Pressable
                    onPress={() => console.log('Task priority')} p="$5">
                    <Icon as={CalendarDaysIcon} stroke={'black'} fill={'black'} style={{ color: 'black' }}   size="md" />
                    <Text color="black" fontWeight={"$bold"}>Task priority</Text>
                </Pressable>
            </Card>
            <Card>
            <Pressable
                onPress={() => console.log('Title')} p="$5">
                <Text color="black" fontWeight={"$bold"}>Add subtask</Text>
            </Pressable>
            <Text>OR</Text>
            <Button size="md" variant="solid" action="primary" isDisabled={false} isFocusVisible={false} onPress={addToTask} >
                <ButtonText verticalAlign="middle"> Add Subtask by AI </ButtonText>
            </Button>
            </Card>
        </SafeAreaView>
    );
};

export default AddTaskScreen;
