import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@gluestack-ui/themed"
import useTaskStore from "../../store/taskStore"



const AddTaskScreen = ({ navigation }) => {
    const { tasks, setTasks, selectedDate, setSelectedDate } = useTaskStore((state) => ({
        tasks: state.tasks,
        setTasks: state.setTasks,
        selectedDate: state.selectedDate,
        setSelectedDate: state.setSelectedDate
    }));
    
    const storedTasks = tasks;
    
    if (storedTasks){
        console.log("storedTasks in AddTaskScreen : ", storedTasks.length + "  " + new Date().toString());
    }

    return (
        <SafeAreaView>
            <Text>This is the add Task Screen {storedTasks.length}</Text>
        </SafeAreaView>
    );
};

export default AddTaskScreen;
