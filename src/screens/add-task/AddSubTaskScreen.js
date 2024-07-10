import React, { useState } from "react";
import { StyleSheet, TextInput, Modal, } from "react-native";
import { Picker } from '@react-native-picker/picker';
import usecreateTaskStore from "../../store/createTaskStore";
import { Box, Card, Text, View,  Button, VStack, HStack, ButtonText  } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { config } from '../../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from './../../styles/styles'


const AddSubTaskScreen = ({}) => {
    const { setNewSubTaskTitle, setNewSubTaskDuration, newSubTaskDuration } = usecreateTaskStore((state) => ({
        setNewSubTaskTitle: state.setNewSubTaskTitle,
        setNewSubTaskDuration: state.setNewSubTaskDuration,
        newSubTaskDuration: state.newSubTaskDuration,
      }));

    //const [subTaskDuration, setSubTaskDuration] = useState("5 minutes");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMinute, setSelectedMinute] = useState(5);
    

    const handleSubTitleChange = (newSubTitle) => {
        if (newSubTitle.length > 0){
            setNewSubTaskTitle(newSubTitle);
        }
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const applyMinuteSelection = () => {
        if(selectedMinute > 0){
            setNewSubTaskDuration(`${selectedMinute} minutes`);
            closeModal();
        }
    };

    const clearMinuteSelection = () => {
        setSelectedMinute(0);
    };


    return(
        <>
         <Card style={styles.cardBody}>
            <TextInput
                style={styles.input}
                placeholder="Add Task Title"
                onChangeText={handleSubTitleChange}
            />
        </Card>  
        <Card style={styles.cardBody}>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Time</Text>
                {newSubTaskDuration ? (<Text>{newSubTaskDuration}</Text>) :
                    (<Image
                        source={require("../../../assets/tickIcon.png")}
                        style={styles.tickImage} alt="tick icon"
                    />)}
            </View>
            {/* <View style={styles.detailItem}>
                <Text style={styles.label}>No explicit time</Text>
                {subTaskDuration ? (null) :
                    (<Image
                        source={require("../../../assets/tickIcon.png")}
                        style={styles.tickImage} alt="tick icon"
                    />)}
            </View> */}
            <View style={styles.detailLastItem}>
                <Text style={styles.label}>Minutes</Text>
                <TouchableOpacity onPress={openModal} >
                    <Image source={require("../../../assets/rightAngle.png")} alt="right arrow" style={styles.tickImage}/>
                    </TouchableOpacity>
            </View>
        </Card>
        <Modal
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
                {Array.from({ length: 60 }, (_, i) => (
                    <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} color={config.tokens.colors.black} fontWeight={defaultStyles.TypographyBodyHeavy}/>
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
          </VStack>
        </VStack>
      </Modal>
        </>    
    );
};

export default AddSubTaskScreen;

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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '35%',
        margin: 0,
        padding: 0,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 60,
        marginBottom: 40,
    },
    picker: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        backgroundColor: config.tokens.colors.highPriority,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
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
    submitButtonText: {
        color:config.tokens.colors.white,
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