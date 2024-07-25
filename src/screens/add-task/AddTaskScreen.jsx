import React, { useState, useCallback } from 'react';
import AddTaskHeader from '../../components/AddTaskHeader';
import { SafeAreaView, Dimensions, StyleSheet, Platform } from 'react-native';
import {
    Box, Button, ButtonText, Card, Center, FlatList,
    HStack, Heading, Icon, Text, Modal,
    ModalCloseButton, ModalContent, VStack,
    View,
    ButtonIcon,
    CloseCircleIcon,
    ImageBackground,
    ModalBackdrop,
    KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import { useFocusEffect } from '@react-navigation/native'; 
import useCreateTaskStore from '../../store/createTaskStore';
import useTaskStore from '../../store/taskStore';
import useAddTaskDateModelStore from '../../store/addTaskDateModelStore';
import profileStore from '../../store/profileStore'
import { addTask, getAISubTasks } from '../../services/tasks';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../services/QueryClient';
import TitleModalScreen from './TitleModelScreen';
import ToggleSwitch from "../../components/ToggleSwitch";
import NotesModalScreen from './NotesModelScreen';
import TaskPriorityModalScreen from './TaskPriorityModelScreen'
import DateTimeModelScreen from './DateTimeModelScreen'
import SubTaskScreen from './SubTaskScreen';
import AddSubTaskScreen from './AddSubTaskScreen';
import { Pressable } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Image } from '@gluestack-ui/themed';
import ConvertTimeStamp from '../../utils/ConvertTimeStamp';
import { scheduleNotification, saveNotification, fetchNotificationsByUserId } from '../../services/notificationService'
import useNotificationStore from '../../store/notificationStore';
import dayjs from 'dayjs';
import { defaultStyles } from '../../styles/styles';
import { config } from '../../styles/themeConfig';
import PlusCircleIcon from '../../../assets/icons/plus-circle.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import NotesIcon from '../../../assets/icons/notes.svg';
import TasksIcon from '../../../assets/icons/tasks.svg';
import Ai4Icon from '../../../assets/icons/ai4.svg';
import AI4 from '../../../assets/icons/ai4.svg';
import AI6 from '../../../assets/icons/ai6.svg';
import CloseIcon from '../../../assets/icons/x.svg';
import XIcon from '../../../assets/icons/x-circle.svg'
const image = require('../../../assets/background/background.png');

const { width, height } = Dimensions.get('window');


const AddTaskScreen = ({ navigation }) => {
    const [modalTitleVisible, setModalTitleVisible] = useState(false);
    const [modalNoteVisible, setModalNoteVisible] = useState(false);
    const [modalPriorityVisible, setModalPriorityVisible] = useState(false);
    const [modalDateTimeVisible, setModalDateTimeVisible] = useState(false);
    const [modalSubTaskVisible, setModalSubTaskVisible] = useState(false);
    const [modalAddSubTaskVisible, setModalAddSubTaskVisible] = useState(false);
    const [selectedSubTaskIndex, setSelectedSubTaskIndex] = useState(null);
    const [warningMessage, setWarningMessage] = useState('');
    const [dateTimeWarningMessage, setDateTimeWarningMessage] = useState('');
    const [isAnyModalVisible, setIsAnyModalVisible] = useState(false);

    const { first_name, userId, profile_movement_reminder, profile_task_reminder } = profileStore((state) => ({
        first_name: state.first_name,
        userId: state.userId,
        profile_movement_reminder: state.movement_reminder,
        profile_task_reminder: state.task_reminder
    }));

    const { addDataTask, setSelectedDate } = useTaskStore((state) => ({
        addDataTask: state.addDataTask,
        setSelectedDate: state.setSelectedDate,
    }));

    const [isAIPressed, setIsAIPressed] = useState(false);

    const { subTasks, title, addSubtask, removeSubtask, notes, task_urgency, clearCreateTaskStore,
        start_date, end_date, start_time, end_time, user_estimate_duration, movement_reminder,
        setMovementReminder, task_reminder, setTaskReminder, addCreateSubTask,
        newSubTaskTitle, newSubTaskDuration, setNewSubTaskTitle, setNewSubTaskDuration } = useCreateTaskStore((state) => ({
            subTasks: state.subTasks,
            title: state.title,
            setTitle: state.setTitle,
            addSubtask: state.addSubtask,
            removeSubtask: state.removeSubtask,
            notes: state.notes,
            task_urgency: state.task_urgency,
            clearCreateTaskStore: state.clearCreateTaskStore,
            start_date: state.start_date,
            end_date: state.end_date,
            start_time: state.start_time,
            end_time: state.end_time,
            user_estimate_duration: state.user_estimate_duration,
            task_reminder: state.task_reminder,
            setTaskReminder: state.setTaskReminder,
            movement_reminder: state.movement_reminder,
            setMovementReminder: state.setMovementReminder,
            addCreateSubTask: state.addCreateSubTask,
            newSubTaskTitle: state.newSubTaskTitle,
            newSubTaskDuration: state.newSubTaskDuration,
            setNewSubTaskTitle: state.setNewSubTaskTitle,
            setNewSubTaskDuration: state.setNewSubTaskDuration,
        }));
    
    const [dragSubTaskData, setDragSubTaskData] = useState(subTasks);

    useFocusEffect(
        useCallback(() => {
          setMovementReminder(profile_movement_reminder);
          setTaskReminder(profile_task_reminder);
          setWarningMessage('');
        }, [profile_movement_reminder, profile_task_reminder, subTasks])
      );
    
    const { clearAddTaskDateModelStore} = useAddTaskDateModelStore((state) => ({
        clearAddTaskDateModelStore: state.clearAddTaskDateModelStore,
    }));

    const getAIMutation = useMutation({
        mutationFn: async (title) => await getAISubTasks(title),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['createTask']);
            addSubtask(data.subtask);
        },
    });
    
    const saveTaskMutation = useMutation({
        mutationFn: async (task) => await addTask(task),
        onSuccess: async (data) => {
            queryClient.invalidateQueries(['tasks']); // Invalidate task queries
            addDataTask(data); // Add task to taskStore
            //setSelectedDate(dayjs(start_date).format('YYYY-MM-DD'));
            setSelectedDate(dayjs().format('YYYY-MM-DD'));
        },
    });

    const getAISubTasksResult = async () => {
        try {
            if (!title || title.trim() === '') {
                setWarningMessage('Title is required to generate AI subtasks.');
                return;
            }
            if (subTasks.length > 0) {
                return;
            }

            const newTitle = { title: title };
            await getAIMutation.mutateAsync(newTitle);
            setWarningMessage('');
        } catch (error) {
            console.error('Error get AI subtasks:', error);
        }
    };

    const handleSaveTask = async () => {
        if (!userId || userId.length === 0) {
            setWarningMessage('User ID is required');
            return;
        }
        if (!title || title.length === 0) {
            setWarningMessage('Title is required');
            return;
        }
        if (!subTasks || subTasks.length === 0) {
            setWarningMessage('At least one subtask is required');
            return;
        }
        if (!start_date || start_date.length === 0) {
            setWarningMessage('Schedule Date is require');
            return;
        }
        setWarningMessage('');
        setDateTimeWarningMessage('');
        try {
            let notificationId = null;
            if (task_reminder) { // schedule notification
                //console.log('calling scheduleNotification')
                notificationId = await scheduleNotification({
                    title,
                    start_date,
                    start_time
                });
                //console.log('Returned notification ID:', notificationId);
            }

            const adjustedTaskUrgency = task_urgency === '' ? 'medium' : task_urgency;

            const newTask = {
                user_id: userId,
                title,
                notes,
                task_urgency: adjustedTaskUrgency,
                subtask: subTasks,
                is_repeated: false,
                estimate_start_date: start_date,
                due_date: end_date,
                estimate_start_time: ConvertTimeStamp.convertTimeStringToMilliseconds(start_time),
                estimate_end_time: ConvertTimeStamp.convertTimeStringToMilliseconds(end_time),
                user_estimate_duration,
                notification_id: notificationId,
                movement_tracking: movement_reminder,
                task_reminder: task_reminder,
            };

            await saveTaskMutation.mutateAsync(newTask);
            clearCreateTaskStore();
            clearAddTaskDateModelStore();
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleCancel = () => {
        clearCreateTaskStore();
        clearAddTaskDateModelStore(); 
        setWarningMessage('');
        setDateTimeWarningMessage('');
        navigation.navigate('HomeScreen'); 
    };

    const handleDeleteSubtask = (index) => {
        removeSubtask(index);
    };

    const toggleSwitch = () => {
        setMovementReminder(!movement_reminder);
    };

    const handleOpenTitleModal = () => {
        setModalTitleVisible(true);
        setIsAnyModalVisible(true);
    }
    const handleCloseTitleModal = () => { 
        if (title && title.length > 0){
            setWarningMessage('');
        }
        setModalTitleVisible(false);
        setIsAnyModalVisible(false);
    }
    const handleOpenNoteModal = () => {
        setModalNoteVisible(true);
        setIsAnyModalVisible(true);
    }
    const handleCloseNoteModal = () => { 
        setModalNoteVisible(false);
        setIsAnyModalVisible(false);
    }
    const handleOpenPriorityModal = () => {
        setModalPriorityVisible(true);
        setIsAnyModalVisible(true);
    }
    const handleClosePriorityModal = () => {
        setModalPriorityVisible(false);
        setIsAnyModalVisible(false);
    }
    const handleOpenAddSubTaskModal = () => {
        setModalAddSubTaskVisible(true);
        setIsAnyModalVisible(true);
    }
    const handleCloseAddSubTaskModal = () => {
        if (newSubTaskTitle.length > 0 && newSubTaskDuration.length > 0) {
            const addedSubtask = { sub_title: newSubTaskTitle, time: newSubTaskDuration };
            addCreateSubTask(addedSubtask);

        }
        setNewSubTaskTitle("");
        setNewSubTaskDuration("5 minutes");
        setModalAddSubTaskVisible(false);
        setIsAnyModalVisible(false);
        //setIsSubTaskModalVisible(false);
    }
    const handleOpenDateTimeModal = () => {
        setModalDateTimeVisible(true);
        setIsAnyModalVisible(true);
    }
    const handleCloseDateTimeModal = () => {
        if (start_date && start_date.length > 0){
            setWarningMessage('');
        }
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        if (endDate < startDate) {
            setDateTimeWarningMessage("End date must be after start date.");
            return;
        }

        const startTimeDate = new Date();
        const endTimeDate = new Date();
        const [startHour, startMinute] = start_time.split(":").map(Number);
        const [endHour, endMinute] =end_time.split(":").map(Number);
        startTimeDate.setHours(startHour, startMinute);
        endTimeDate.setHours(endHour, endMinute);
        if (endTimeDate < startTimeDate) {
            setDateTimeWarningMessage("End time must be after start time.");
            return;
        }

        setModalDateTimeVisible(false);
        setIsAnyModalVisible(false);
        setDateTimeWarningMessage('');
    }

    const handleOpenSubTaskModal = (index) => {
        setSelectedSubTaskIndex(index);
        setModalSubTaskVisible(true);
        setIsAnyModalVisible(true);
    };

    const handleCloseSubTaskModal = () => {
        setSelectedSubTaskIndex(null);
        setModalSubTaskVisible(false);
        setIsAnyModalVisible(false);
    };

    const handlePressIn = () => {
        setIsAIPressed(true);
    };

    const handlePressOut = () => {
        setIsAIPressed(false);
        getAISubTasksResult();
    };

    const renderItem = ({ item, getIndex, drag, isActive }) => (
        <Box key={getIndex()} style={[styles.subTaskContainer, isActive && { backgroundColor: '#f0f0f0' }]}>
          <View style={styles.detailSubTask} >
            <Box width="70%">
              <TouchableOpacity onLongPress={drag} onPress={() => handleOpenSubTaskModal(getIndex())}>
                <Text style={[defaultStyles.TypographyBody]}>{item.sub_title}</Text>
              </TouchableOpacity>
            </Box>
            <Box width="25%">
              <Text style={[defaultStyles.TypographyBody, styles.leftItem]}>
                {item.time.replace('minutes', 'min.').replace('minute', 'min.')}
              </Text>
            </Box>
            <Box width="5%">
              <Button onPress={() => handleDeleteSubtask(getIndex())} variant="link" style={styles.boxContainer}>
                <ButtonIcon as={XIcon} />
              </Button>
            </Box>
          </View>
        </Box>
      );
    

    const renderContent = () => (
        <>
            <Card style={[defaultStyles.card, styles.card]}>
                <Pressable onPress={handleOpenTitleModal} style={styles.bottomLine}>                   
                    <View style={styles.detailItem}>
                        <PlusCircleIcon style={styles.icon}/>
                        <Text style={[defaultStyles.TypographyH2, styles.textBlack]}>{title ? title : "Add Task Title"}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleOpenDateTimeModal} style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                        <CalendarIcon style={styles.icon}/>
                        <Text style={[defaultStyles.TypographyBody, styles.textBlack]}>{start_date ? start_date : "Date"}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleOpenNoteModal} style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                        <NotesIcon style={styles.icon}/> 
                        <Text style={[defaultStyles.TypographyBody, styles.textBlack]}>{notes? notes : "Notes"}</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleOpenPriorityModal}>
                    <View style={styles.detailItem}>
                        <TasksIcon style={styles.icon}/>
                        <Text style={[defaultStyles.TypographyBody, styles.textBlack]}>{task_urgency? task_urgency.charAt(0).toUpperCase() + task_urgency.slice(1) : "Task priority"}</Text>
                    </View>
                </Pressable>
            </Card>
            <Card style={[defaultStyles.card, styles.card]}>
                <ToggleSwitch label="Track Movement" value={movement_reminder} onToggle={toggleSwitch}/>
            </Card>
            <Card style={[defaultStyles.card, styles.card, styles.lastCard]}>
                <Pressable onPress={handleOpenAddSubTaskModal} style={styles.bottomLine}>
                    <View style={styles.detailItem}>
                        <PlusCircleIcon style={styles.icon}/>
                        <Text style={[defaultStyles.TypographyBody, styles.textBlack]}>Add subtask</Text>
                    </View>                    
                </Pressable>
                <DraggableFlatList
                        data={subTasks}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.sub_title}
                        onDragEnd={({ data }) => addSubtask(data)}
                        windowSize={3}
                        contentContainerStyle={styles.listContent}
                />
                {/* <FlatList
                    data={subTasks}
                    renderItem={({ item, index }) => (
                        <Box key={index} style={styles.subTaskContainer}>
                            <HStack style={styles.detailSubTask} space={4} alignItems="center">
                                <Box width="70%">
                                    <TouchableOpacity key={index} onPress={() => handleOpenSubTaskModal(index)}>
                                        <Text style={[defaultStyles.TypographyBody]}>{item.sub_title}</Text>
                                    </TouchableOpacity>
                                </Box>
                            <Box width="25%" style={[defaultStyles.TypographyBodySmall, styles.leftItem]}>
                                <Text style={{ color: 'gray', textAlign: 'right', textAlignVertical: 'top' }}>
                                    {item.time.replace('minutes', 'min.').replace('minute', 'min.')}
                                </Text>
                            </Box>
                            <Box width="5%">
                                <Button onPress={() => handleDeleteSubtask(index)} variant="link" size='md' p='$3.5' style={[styles.taskTime, styles.rightItem]}>
                                    <ButtonIcon color="$black" as={CloseCircleIcon} />
                                </Button>
                            </Box>   
                            </HStack>
                        </Box>
                    )}
                    keyExtractor={(item) => item.sub_title}
                    windowSize={10}
                    contentContainerStyle={styles.listContent}
                /> */}
                <Text style={[defaultStyles.TypographyBodySmall, styles.txtCenter]}>OR</Text>
                <Button
                    style={[
                        defaultStyles.ButtonDefault,
                        isAIPressed && styles.submitButtonPressed
                    ]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <ButtonIcon as={AI4} style={[styles.buttonIcon, isAIPressed && styles.buttonIconPressed]} />
                    <ButtonText
                        style={[
                            styles.submitButtonText,
                            defaultStyles.TypographyBodyHeavy,
                            isAIPressed && styles.submitButtonTextPressed
                        ]}
                        disabled={subTasks.length > 0}
                    >
                        Add Subtask by AI
                    </ButtonText>
                </Button>
            </Card>
        </>
    );

    return (
        <View style={[styles.container]}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}> 
                <View  style={styles.headerContainer}> 
                    <AddTaskHeader handleCancel={handleCancel} handleSaveTask={handleSaveTask}/>
                    {isAnyModalVisible && <View style={styles.dimmingOverlay} />}
                    <View style={styles.overlay}> 
                        <View>
                            {warningMessage ? (
                                <View style={styles.warningBox}>
                                    <Text style={styles.warningText}>{warningMessage}</Text>
                                </View>
                            ) : null}
                            <FlatList
                                data={[{ key: 'content' }]} 
                                renderItem={renderContent}
                                keyExtractor={(item) => item.key}
                            />
                        </View>
                    </View>
                </View>
                <Modal isOpen={modalTitleVisible} onClose={handleCloseTitleModal}>
                    <ModalBackdrop/>
                    <ModalContent style={styles.modalContent}>
                        <Heading textAlign='center' style={[defaultStyles.TypographyH1, styles.textBlack]}>Add Task Title</Heading>
                        <ModalCloseButton style={styles.closeButton} onPress={handleCloseTitleModal}>
                            <Icon as={CloseIcon} style={styles.closeIcon}/>
                        </ModalCloseButton>
                        <VStack space={4} style={styles.modalBody}>
                            <TitleModalScreen/>
                        </VStack>
                    </ModalContent>
                </Modal>
                <Modal isOpen={modalDateTimeVisible} onClose={handleCloseDateTimeModal}>
                    <ModalBackdrop/>
                    <ModalContent style={styles.modalContent}>
                        <Heading textAlign='center' style={[defaultStyles.TypographyH1, styles.textBlack]}>Date and Time</Heading>
                        <ModalCloseButton style={styles.closeButton} onPress={handleCloseDateTimeModal}>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                        <VStack space={4} style={styles.modalBody}>
                            {dateTimeWarningMessage ? (
                                <Box style={styles.warningBox}>
                                <Text style={styles.warningText}>{dateTimeWarningMessage}</Text>
                                </Box>
                            ) : null}
                            <DateTimeModelScreen/>
                        </VStack>
                    </ModalContent>
                </Modal>
                <Modal isOpen={modalNoteVisible} onClose={handleCloseNoteModal}>
                    <KeyboardAvoidingView behavior={"padding"} style={styles.keyboardAwareNoteStyle}>
                    <ModalBackdrop/>
                    <ModalContent style={styles.modalNoteContent}>
                        <Heading textAlign='center' style={[defaultStyles.TypographyH1, styles.textBlack]}>Notes</Heading>
                        <ModalCloseButton style={styles.closeButton} onPress={handleCloseNoteModal}>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                        <VStack space={4} style={styles.modalBody}>
                            <NotesModalScreen />
                        </VStack>
                    </ModalContent>
                    </KeyboardAvoidingView>
                </Modal>
                <Modal isOpen={modalPriorityVisible} onClose={handleClosePriorityModal}>
                    <ModalBackdrop/>
                    <ModalContent style={styles.modalPriorityContent}>
                        <Heading textAlign='center' style={[defaultStyles.TypographyH1, styles.textBlack]}>Task Priority</Heading>
                        <ModalCloseButton style={styles.closeButton} onPress={handleClosePriorityModal}>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                        <VStack space={4} style={styles.modalBody}>
                            <TaskPriorityModalScreen />
                        </VStack>
                    </ModalContent>
                </Modal>
                <Modal isOpen={modalAddSubTaskVisible} onClose={handleCloseAddSubTaskModal}>
                    <KeyboardAvoidingView behavior={"padding"} style={styles.keyboardAwareStyle}>
                    <ModalBackdrop />
                    <ModalContent style={styles.modalSubTaskContent}>
                        <Heading textAlign='center' style={[defaultStyles.TypographyH1, styles.textBlack]}>Sub-task Title</Heading>
                        <ModalCloseButton style={styles.closeButton} onPress={handleCloseAddSubTaskModal}>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                        <VStack space={4} style={styles.modalBody}>
                            <AddSubTaskScreen />
                        </VStack>
                    </ModalContent>
                    </KeyboardAvoidingView>
                </Modal>
                <Modal isOpen={modalSubTaskVisible} onClose={handleCloseSubTaskModal}>
                    <KeyboardAvoidingView behavior={"padding"} style={styles.keyboardAwareStyle}>
                    <ModalBackdrop/>
                    <ModalContent style={styles.modalSubTaskContent}>
                        <Heading textAlign='center' style={[defaultStyles.TypographyH1, styles.textBlack]}>Sub-task Title</Heading>
                        <ModalCloseButton style={styles.closeButton} onPress={handleCloseSubTaskModal}>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                        <VStack space={4} style={styles.modalBody}>
                            <SubTaskScreen index={selectedSubTaskIndex} />
                        </VStack>
                    </ModalContent>
                    </KeyboardAvoidingView>
                </Modal>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#006655",
        borderRadius: 10,
        height: 48,
        width: "100%",
    },
    headerContainer: {
        flex: 1,
        paddingTop: 40,
    },
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom:20,
    },
    card: {
        marginTop: 10,
        marginVertical: 0,
    },
    lastCard: {
        marginVertical: 10,
    },
    subTaskCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    modalContent: {
        width: '100%',
        height: '90%',
        margin: 0,
        padding: 0,
        paddingTop: 15,
        borderRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: config.tokens.colors.background,
        position: 'absolute',
        bottom: 0,
    },
    keyboardAwareNoteStyle: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        height: '30%',
        width: '100%',
    },
    modalNoteContent: {
        width: '100%',
        height: '30%',
        margin: 0,
        padding: 0,
        paddingTop: 15,
        borderRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: config.tokens.colors.background,
        position: 'aboslute',
        bottom: 0,
    },
    keyboardAwareStyle: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        height: '40%',
        width: '100%',
    },
    modalSubTaskContent: {
        width: '100%',
        height: '40%',
        margin: 0,
        padding: 0,
        paddingTop: 15,
        borderRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: config.tokens.colors.background,
        position: 'aboslute',
        bottom: 0,
    },
    modalPriorityContent: {
        width: '100%',
        // height: '45%',
        margin: 0,
        padding: 0,
        paddingTop: 15,
        borderRadius: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: config.tokens.colors.background,
        position: 'absolute',
        bottom: 0,
    },
    closeButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    closeIcon: {
        fontSize: 34,
    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    listContent: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },
    subTaskContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingTop: 10,
        paddingLeft: 10,
        width:'100%',
    },
    taskTime: {
        flexShrink: 0,
        textAlignVertical: 'top',
        verticalAlign: 'top',
        padding: 0,
    },
    txtCenter: {
        textAlign: 'center',
        marginTop:20,
        marginBottom:20,
    },
    cardBody:{
        borderRadius:20,
        marginBottom:20,
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginBottom: 10,
    },
    detailSubTask: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 10,
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    warningBox: {
        padding: 10,
        backgroundColor: '#ffcccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    warningText: {
        color: '#cc0000',
    },
    submitButtonPressed: {
        backgroundColor: config.tokens.colors.neutralLight,
    },
    submitButtonText: {
        color: config.tokens.colors.white,
    },
    submitButtonTextPressed: {
        color: config.tokens.colors.neutral,
    },
    buttonIcon: {
        height: 24,
        width: 24,
        marginRight: 10,
        color: config.tokens.colors.white,
    },
    buttonIconPressed: {
        color: config.tokens.colors.neutral,
    },
    leftItem: {
        alignItems: 'flex-end',
        marginLeft: 11,
        color: config.tokens.colors.neutralDark,
    },
    rightItem: {
        alignItems: 'flex-end',
    },
    dimmingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.125)',
        zIndex: 1,
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    textBlack: {
        color: config.tokens.colors.black,
    },
    textNeutral: {
        color: config.tokens.colors.neutral,
    }
});

export default AddTaskScreen;
