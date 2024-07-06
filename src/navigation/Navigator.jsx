import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeTab from "./HomeTab";
import CalendarTab from "./CalendarTab";
import AddTaskTab from "./AddTaskTab";
import ProgressTab from "./ProgressTab";
import ProfileTab from "./ProfileTab";

const Tab = createBottomTabNavigator();

const Navigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeTab}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen name="Calendar" component={CalendarTab} options={{ headerShown: false }} />
            <Tab.Screen name="Add Task" component={AddTaskTab} options={{ headerShown: false }} />
            <Tab.Screen name="Progress" component={ProgressTab} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileTab} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default Navigator