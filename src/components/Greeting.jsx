import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, Text } from "@gluestack-ui/themed"

const Greeting = () => {
    return (
        <SafeAreaView>
            <Heading>Good morning, Nam!</Heading>
            <Text>Rise up, start fresh!</Text>
        </SafeAreaView>
    );
};

export default Greeting;