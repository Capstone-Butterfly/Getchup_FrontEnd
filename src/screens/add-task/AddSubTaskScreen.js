import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import usecreateTaskStore from "../../store/createTaskStore";
import { Box, Card, Text, View,  Button, VStack, HStack, ButtonText, Modal, ModalContent, ModalBackdrop, ModalBody, ModalFooter, ModalOverlay  } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { config } from '../../styles/themeConfig'; // Import the theme configuration
import { defaultStyles } from './../../styles/styles'
import ChevronRightIcon from '../../../assets/icons/chevron-right.svg';
import { SafeAreaView } from "@gluestack-ui/themed";

const AddSubTaskScreen = ({}) => {
    const { setNewSubTaskTitle, setNewSubTaskDuration, newSubTaskDuration } = usecreateTaskStore((state) => ({
        setNewSubTaskTitle: state.setNewSubTaskTitle,
        setNewSubTaskDuration: state.setNewSubTaskDuration,
        newSubTaskDuration: state.newSubTaskDuration,
      }));

    //const [subTaskDuration, setSubTaskDuration] = useState("5 minutes");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMinute, setSelectedMinute] = useState(5);
    const [isPressed, setIsPressed] = useState(false);
    

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

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
        applyMinuteSelection();
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
        <View style={styles.container}>
         <Card style={[defaultStyles.card, styles.cardBody]}>
            <TextInput
                style={[defaultStyles.TypographyBody, styles.input ]}
                placeholder="Add subtask title"
                onChangeText={handleSubTitleChange}
                
            />
        </Card>  
        <Card style={[defaultStyles.card, styles.cardBody]}>
            <View style={styles.detailItem}>
                <Text style={[defaultStyles.TypographyBodyHeavy]}>Time</Text>
                {newSubTaskDuration ? (<Text style={[defaultStyles.TypographyBody]}>{newSubTaskDuration}</Text>) :
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
                <Text style={[defaultStyles.TypographyBody]}>Minutes</Text>
                <TouchableOpacity onPress={openModal} >
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
                        style={[defaultStyles.TypographyBodySmallHeavy, styles.picker]}
                    >
                        {Array.from({ length: 60 }, (_, i) => (
                            <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} color={config.tokens.colors.black} style={defaultStyles.TypographyBodySmallHeavy}/>
                        ))}
                    </Picker>
                    <Text style={[styles.modalTitle, defaultStyles.TypographyBodyHeavy]}>Minutes</Text>
                </HStack>
                <HStack style={styles.buttonContainer}>
                    <Button style={styles.clearButton} onPress={clearMinuteSelection}>
                        <ButtonText style={[styles.clearButtonText, defaultStyles.TypographyBodyHeavy]}>Clear</ButtonText>
                    </Button>
                    <Button
                        style={[
                            styles.submitButton,
                            isPressed && styles.submitButtonPressed
                        ]}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <ButtonText
                            style={[
                                styles.submitButtonText,
                                defaultStyles.TypographyBodyHeavy,
                                isPressed && styles.submitButtonTextPressed
                            ]}
                        >
                            Apply
                        </ButtonText>
                    </Button>
                </HStack>
            </ModalContent>
        </Modal>
        </View>    
    );
};

export default AddSubTaskScreen;

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