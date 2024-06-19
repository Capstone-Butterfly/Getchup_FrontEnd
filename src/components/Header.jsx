import { SafeAreaView } from "react-native-safe-area-context";
import { BellIcon, HStack, Icon, Text } from "@gluestack-ui/themed"

const Header = () => {
    return (
        <SafeAreaView>
            <HStack>
                <Text>Getchup!</Text>
                <Icon as={BellIcon}/>
                {/* Replace Bell icon when designers provide the asset */}
            </HStack>            
        </SafeAreaView>
    );
};

export default Header;