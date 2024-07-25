import React, { useState } from "react";
import { StyleSheet, TextInput} from "react-native";
import usecreateTaskStore from "../../store/createTaskStore";
import { Box, Card, Text, View, Button, Modal, HStack, ButtonText, ModalBackdrop, ModalContent} from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import { config } from '../../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from './../../styles/styles'
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import { SafeAreaView } from "@gluestack-ui/themed";


const SubTaskScreen = ({index}) => {

    const { subTasks, updateSubtask } = usecreateTaskStore((state) => ({
        subTasks: state.subTasks,
        updateSubtask: state.updateSubtask,
      }));

    const selectedSubTask = subTasks[index];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMinute, setSelectedMinute] = useState(
        selectedSubTask.time ? parseInt(selectedSubTask.time) : 5
    );

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const applyMinuteSelection = () => {
        if(selectedMinute > 0){
            const updatedSubtask = { ...selectedSubTask, time: `${selectedMinute} minutes` };
            updateSubtask(index, updatedSubtask);
            closeModal();
        }
    };

    const clearMinuteSelection = () => {
        // const updatedSubtask = { ...selectedSubTask, time: "" };
        // updateSubtask(index, updatedSubtask);
        //closeModal();
        setSelectedMinute(0);
    };

      const handleSubTitleChange = (newTitle) => {
        const updatedSubtask = { ...selectedSubTask, sub_title: newTitle };
        updateSubtask(index, updatedSubtask);
    };

    if (!selectedSubTask) {
        return <Text>Subtask not found</Text>;
    }

    return(
        <View style={styles.container}>
         <Card style={[defaultStyles.card, styles.cardBody]}>
            <TextInput
                style={[defaultStyles.TypographyBodyHeavy, styles.input ]}
                placeholder="Add Task Title"
                value={selectedSubTask.sub_title}
                onChangeText={handleSubTitleChange}
            />
        </Card>  
        <Card style={[defaultStyles.card, styles.cardBody]}>
            <View style={styles.detailItem}>
                <Text style={[defaultStyles.TypographyBodyHeavy]}>Time</Text>
                {selectedSubTask.time ? (<Text style={[defaultStyles.TypographyBody]}>{selectedSubTask.time}</Text>) :
                    (<Image
                        source={require("../../../assets/tickIcon.png")}
                        style={styles.tickImage} alt="tick icon"
                    />)}
            </View>
            {/* <View style={styles.detailItem}>
                <Text style={styles.label}>No explicit time</Text>
                {selectedSubTask.time ? (null) :
                    (<Image
                        source={require("../../../assets/tickIcon.png")}
                        style={styles.tickImage} alt="tick icon"
                    />)}
            </View> */}
            <View style={styles.detailLastItem}>
                <Text style={[defaultStyles.TypographyBody]}>Minutes</Text>
                <TouchableOpacity onPress={openModal}>
                    <ChevronRightIcon/>
                </TouchableOpacity>
            </View>
        </Card>
        <Modal isOpen={isModalVisible} onClose={closeModal}>
            <ModalBackdrop/>
            <ModalContent style={styles.modalContent}>
                <HStack style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedMinute}
                        onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                        style={styles.picker}
                    >
                        {Array.from({ length: 60 }, (_, i) => (
                            <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} color={config.tokens.colors.black} style={defaultStyles.TypographyBodyHeavy}/>
                        ))}
                    </Picker>
                    <Text style={[styles.modalTitle, defaultStyles.TypographyBodyHeavy]}>Minutes</Text>
                </HStack>
                <HStack style={styles.buttonContainer}>
                    <Button style={styles.clearButton} onPress={clearMinuteSelection}>
                        <ButtonText style={[styles.clearButtonText, defaultStyles.TypographyBodyHeavy]}>Clear</ButtonText>
                    </Button>
                    <Button style={styles.submitButton} onPress={applyMinuteSelection}>
                        <ButtonText style={[styles.submitButtonText, defaultStyles.TypographyBodyHeavy]}>Apply</ButtonText>
                    </Button>
                </HStack>
            </ModalContent>
        </Modal>
        {/* <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <VStack style={styles.modalContainer}>
            <VStack style={styles.modalContent}>
                <HStack style={styles.pickerContainer}>
                    <Picker
                    selectedValue={selectedMinute}
                    onValueChange={(itemValue) => setSelectedMinute(itemValue)}
                    style={styles.picker}
                    >
                    {Array.from({ length: 61 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={i} color={config.tokens.colors.black} style={[defaultStyles.TypographyBodyHeavy]}/>
                    ))}
                    </Picker>
                    <Text style={[styles.modalTitle, defaultStyles.TypographyBodyHeavy]}>Minutes</Text>
                </HStack>
                <HStack style={styles.buttonContainer}>
                    <Button style={styles.clearButton} onPress={clearMinuteSelection}>
                        <ButtonText style={[styles.clearButtonText, defaultStyles.TypographyBodyHeavy]}>Clear</ButtonText>
                    </Button>
                    <Button style={[defaultStyles.TypographyBodyHeavy, styles.submitButton]} onPress={applyMinuteSelection}>
                        <ButtonText style={[styles.submitButtonText, defaultStyles.TypographyBodyHeavy]}>Apply</ButtonText>
                    </Button>
                </HStack>
            </VStack>
            </VStack>
        </Modal> */}
        </View>    
    );
};

export default SubTaskScreen;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingRight: 20,
        paddingLeft: 20,
    },
    cardBody:{
        marginTop: 10,
        marginVertical: 0,
        marginBottom:0,
        paddingTop:10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: config.tokens.colors.neutralLight,
        paddingHorizontal: 10,
        paddingVertical:10,
        justifyContent: 'space-between'
    },
    detailLastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginBottom: 10,
        paddingHorizontal: 10,
        paddingTop:10,
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        borderBottomColor: config.tokens.colors.neutralLight,
        borderBottomWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    tickImage: {
        width: 15,
        height: 15,
        marginRight: 20,
    },
    modalContent: {
        width: '100%',
        height: '25%',
        margin: 0,
        padding: 0,
        borderRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: config.tokens.colors.background,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.125)',
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: -10,
    },
    picker: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        backgroundColor: config.tokens.colors.highPriority,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
    },
    submitButton: {
        backgroundColor: config.tokens.colors.primaryDark,
        borderRadius: config.tokens.borderRadius.sm,
        fontSize: 20,
        alignSelf: 'flex-start',
        marginVertical: config.tokens.spacing.md,
        marginHorizontal: 'auto',
        width: '40%'
    },
    submitButtonPressed: {
        backgroundColor: config.tokens.colors.neutralLight,
    },
    submitButtonText: {
        color:config.tokens.colors.white,
    },
    submitButtonTextPressed: {
        color: config.tokens.colors.neutral,
    },
    clearButton: {
        backgroundColor: config.tokens.colors.neutralLight,
        borderRadius: config.tokens.borderRadius.sm,
        fontSize: 20,
        alignSelf: 'flex-start',
        marginVertical: config.tokens.spacing.md,
        marginHorizontal: 'auto',
        width: '40%'
    },
    clearButtonText: {
        color:config.tokens.colors.lightBlack,
    },
});