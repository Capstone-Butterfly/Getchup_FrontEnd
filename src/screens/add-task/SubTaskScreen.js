import { StyleSheet, TextInput } from "react-native";
import usecreateTaskStore from "../../store/createTaskStore";
import { Box, Card, Text, View } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

const SubTaskScreen = ({index}) => {

    const { subTasks, updateSubtask } = usecreateTaskStore((state) => ({
        subTasks: state.subTasks,
        updateSubtask: state.updateSubtask,
      }));

      const selectedSubTask = subTasks[index];

      const handleSubTitleChange = (newTitle) => {
        const updatedSubtask = { ...selectedSubTask, sub_title: newTitle };
        updateSubtask(index, updatedSubtask);
    };

    if (!selectedSubTask) {
        return <Text>Subtask not found</Text>;
    }

    return(
        <>
         <Card style={styles.cardBody}>
            <TextInput
                style={styles.input}
                placeholder="Add Task Title"
                value={selectedSubTask.sub_title}
                onChangeText={handleSubTitleChange}
            />
        </Card>  
        <Card style={styles.cardBody}>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Time</Text>
                {selectedSubTask.time ? (<Text>{selectedSubTask.time}</Text>) :
                    (<Image
                        source={require("../../../assets/tickIcon.png")}
                        style={styles.tickImage} alt="tick icon"
                    />)}
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>No explicit time</Text>
                {selectedSubTask.time ? (null) :
                    (<Image
                        source={require("../../../assets/tickIcon.png")}
                        style={styles.tickImage} alt="tick icon"
                    />)}
            </View>
            <View style={styles.detailLastItem}>
                <Text style={styles.label}>Minutes</Text>
                <TouchableOpacity onPress={() =>  console.log('minute')}>
                    <Image source={require("../../../assets/rightAngle.png")} alt="right arrow" style={styles.tickImage}/>
                    </TouchableOpacity>
            </View>
        </Card>
        </>    
    );
};

export default SubTaskScreen;

const styles = StyleSheet.create({
    cardBody:{
        width:'80%',
        borderRadius:20,
        marginBottom:20,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        paddingHorizontal: 10,
        paddingVertical:20,
        justifyContent: 'space-between'
    },
    detailLastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical:20,
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 16,
        height: 40,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
      },
      label: {
        fontSize: 16,
        fontWeight: "bold",
      },
      tickImage: {
        width: 15,
        height: 15,
        marginRight: 20,
      },
});