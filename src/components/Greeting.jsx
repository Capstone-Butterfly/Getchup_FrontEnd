import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, Text } from "@gluestack-ui/themed"

const Greeting = ({name}) => {
    return (
        <SafeAreaView>
            <Heading>Good morning, {name}!</Heading>
            <Text>Rise up, start fresh!</Text>
        </SafeAreaView>
    );
};

export default Greeting;