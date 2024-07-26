import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { VStack, HStack, Icon, Image, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Heading, Input, InputField, Button, ButtonText, ImageBackground, Center, ChevronRightIcon, FormControl } from '@gluestack-ui/themed';
import { EditIcon, CloseIcon } from '@gluestack-ui/themed';
import { updateUserProfile } from '../../services/profile';
import profileStore from '../../store/profileStore';
import useCreateTaskStore from '../../store/createTaskStore';
import useAddTaskDateModelStore from '../../store/addTaskDateModelStore';
import useProgressDateRangeStore from "../../store/progressDateRangeStore";
import { useMutation } from '@tanstack/react-query';
import CustomSwitch from '../../components/customSwitch';
import { config } from '../../styles/themeConfig'; 
import { defaultStyles } from './../../styles/styles';
const image = require('../../../assets/background/background.png');
import { SafeAreaView } from 'react-native-safe-area-context';

// Get device dimensions
const { width, height } = Dimensions.get('window');

function EditProfileScreen({ navigation }) {
  const { email, first_name, last_name, profile_img, password, phone, userId, setPhone, setLastName, setFirstName, setEmail, setPassword, notification, movement_reminder, task_reminder, setNotification, setMovementReminder, setTaskReminder, clearToken, clearUserId, setIsLogin } = profileStore((state) => state);
  const { clearCreateTaskStore } = useCreateTaskStore((state) => ({ 
    clearCreateTaskStore: state.clearCreateTaskStore 
  }));
  const { clearAddTaskDateModelStore } = useAddTaskDateModelStore((state) => ({
    clearAddTaskDateModelStore: state.clearAddTaskDateModelStore,
  }));
  const { clearProgressDateRangeStore } = useProgressDateRangeStore((state) => ({
    clearProgressDateRangeStore: state.clearProgressDateRangeStore,
  }));

  const [editableField, setEditableField] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const userInfo = {
        email: email,
        first_name: first_name,
        last_name: "",
        password: password,
        //phone: phone,
        task_reminder: task_reminder,
        movement_reminder: movement_reminder,
        notification: notification,
      };
      return updateUserProfile(userId, userInfo);
    },
    onSuccess: () => {
      //Alert.alert('Success', 'User profile updated successfully.');
    },
    onError: (error) => {
      console.error('Error updating user data:', error);
      //Alert.alert('Error', 'Failed to update user data. Please try again.');
    }
  });

  const handleEdit = (field, value) => {
    setEditableField(field);
    setInputValue(value);
    setShowModal(true);
  };

  const handleSave = () => {
    switch (editableField) {
      case 'first_name':
        setFirstName(inputValue);
        break;
      case 'last_name':
        setLastName(inputValue);
        break;
      case 'email':
        setEmail(inputValue);
        break;
      case 'phone':
        setPhone(inputValue);
        break;
      case 'password':
        setPassword(inputValue);
        break;
    }
    setShowModal(false);
    mutation.mutate();
  };

  const toggleSwitch = (field) => {
    switch (field) {
      case "task_reminder":
        setTaskReminder(!task_reminder);
        break;
      case "movement_reminder":
        setMovementReminder(!movement_reminder);
        break;
      case "notification":
        setNotification(!notification);
        break;
    }
    mutation.mutate();
  };

  const handleLogout = async () => {
    try {
      clearToken();
      clearUserId();
      setIsLogin(false);
      setShowLogoutModal(false);
      setFirstName("");
      setEmail("");
      setPassword("");
      clearCreateTaskStore();
      clearAddTaskDateModelStore();
      clearProgressDateRangeStore();
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };


  const fieldLabels = {
    first_name: 'Full Name',
    last_name: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password'
  };


  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>

    <SafeAreaView style={styles.container}>
        <View style={styles.profContainer}>
          <Heading style={[styles.heading, defaultStyles.TypographyH1]}>
            User Profile
          </Heading>
          <View style={styles.prof2ndContainer}>
         
            <FormControl style={styles.formBox}>
            <VStack >
                  <HStack>
                    <Image style={styles.imageProfile}
                      source={{ uri: profile_img }}
                      width={100}
                      height={100}
                      alt='user-profile-image'
                    />
                  </HStack>
                </VStack>
              <VStack>
                <VStack>
                  <TouchableOpacity onPress={() => handleEdit('first_name', first_name)}>
                    <HStack style={styles.stackBox}>
                      <Text style={[styles.userDataText, defaultStyles.TypographyBody]}>{first_name}</Text>
                      <Icon as={ChevronRightIcon} style={styles.iconDataText} size={32} />
                    </HStack>
                  </TouchableOpacity>
                </VStack>

                {/* <VStack>
                  <TouchableOpacity onPress={() => handleEdit('last_name', last_name)}>
                    <HStack style={styles.stackBox}>
                      <Text style={styles.userDataText}>{last_name}</Text>
                      <Icon as={ChevronRightIcon} style={styles.iconDataText} size={32} />
                    </HStack>
                  </TouchableOpacity>
                </VStack> */}

                <VStack>
                  <TouchableOpacity onPress={() => handleEdit('email', email)}>
                    <HStack style={styles.stackBox}>
                      <Text style={styles.userDataText}>{email}</Text>
                      <Icon as={ChevronRightIcon} style={styles.iconDataText} size={32} />
                    </HStack>
                  </TouchableOpacity>
                </VStack>

                <VStack>
                  <CustomSwitch
                    label="Task Reminder"
                    value={task_reminder}
                    onToggle={() => toggleSwitch('task_reminder')}
                  />
                </VStack>

                <VStack>
                  <CustomSwitch
                    label="Movement Reminder"
                    value={movement_reminder}
                    onToggle={() => toggleSwitch('movement_reminder')}
                  />
                </VStack>

                {/* <VStack>
                  <CustomSwitch
                    label="Notifications"
                    value={notification}
                    onToggle={() => toggleSwitch('notification')}
                  />
                </VStack> */}

                <VStack>
                  <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
                    <HStack style={[styles.logOutstackBox]}>
                      <Text style={styles.userDataText}>Logout</Text>
                      <Icon as={ChevronRightIcon} style={styles.iconDataText} size={32} />
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </VStack>
            </FormControl>
          </View>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="lg"
            finalFocusRef={null}
          >
            <ModalBackdrop />
            <KeyboardAvoidingView
              style={[styles.KeyboardModalStyle]}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0} 
            >
            <ModalContent style={[styles.modalStyle]}>
            <ModalHeader>
        <Heading><Text>{fieldLabels[editableField]}</Text></Heading>
      </ModalHeader>
            <ModalBody>
                <Input>
                  <InputField
                    value={inputValue}
                    onChangeText={setInputValue}
                    type={editableField === 'password' ? 'password' : 'text'}
                  />
                </Input>
              </ModalBody>
            <ModalFooter  style={styles.modalFooter}>
                <Button
               style={[styles.cancelButton]}
      
                  onPress={() => setShowModal(false)}
                >
                  <ButtonText           style={[defaultStyles.TypographyBodyHeavy, styles.cancelButtonText]}>Cancel</ButtonText>
                </Button>
                <Button
             
             style={[styles.submitButton]}
                  onPress={handleSave}
                >
                  <ButtonText style={[defaultStyles.TypographyBodyHeavy, styles.submitButtonText]}>Save</ButtonText>
                </Button>
              </ModalFooter>
            
              
            </ModalContent>
            </KeyboardAvoidingView>
          </Modal>
          <Modal 
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            size="lg"
            finalFocusRef={null}
          >
            <ModalBackdrop />
            <ModalContent style={[styles.modalStyleLogout]}>
              <ModalHeader style={styles.modalHeaderStyle}> 
                <Heading style={[defaultStyles.TypographyH1 , styles.modalLogouttext]}>Logout?</Heading>
              </ModalHeader>
              <ModalBody>
                <Text style={[defaultStyles.TypographyBody, styles.modalAreYouSuretext]}>Are you sure you want to Logout?</Text>
              </ModalBody>
              <ModalFooter style={styles.modalFooter}>
                <Button
                   style={[styles.cancelButton]}
                  onPress={() => setShowLogoutModal(false)}
                >
                  <ButtonText style={[defaultStyles.TypographyBodyHeavy, styles.cancelButtonText]} >Cancel</ButtonText>
                </Button>
                <Button
            style={[styles.submitButton]}
                  onPress={handleLogout}
                >
                  <ButtonText style={[defaultStyles.TypographyBodyHeavy]}>Logout</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </View>
    </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  profContainer: {
    width: width * 0.9, 
    maxWidth: 400, 
    minWidth: 300, 
    paddingTop:20,
  },
  stackBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logOutstackBox:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  userDataText: {
    fontSize: 16,
    flex: 1, 
  },
  iconDataText: {
    marginLeft: 'auto',
    fontSize: 24, 
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfile: {
    borderRadius: config.tokens.borderRadius.xl,
    marginHorizontal: 'auto',
    marginBottom:config.tokens.spacing.lg,
    // borderColor: config.tokens.colors.black,
    // borderWidth:1
  },
  formBox: {
    backgroundColor: 'white',
    borderRadius: config.tokens.borderRadius.md,
    borderColor: 'transparent',
    padding: config.tokens.spacing.sm,
    shadowColor: '#000006', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, 
    shadowRadius: 5, 
    elevation: 5, 
  },
  heading: {
    textAlign: 'left',
    marginBottom: config.tokens.spacing.md,
  },
  inputContainer: {
    borderRadius: config.tokens.borderRadius.sm,
    borderColor: '#00000080',
    borderWidth: 0.5,
  },
  submitButton: {
    backgroundColor: config.tokens.colors.primaryDark,
    borderRadius: config.tokens.borderRadius.sm,
    marginHorizontal: 'auto',
  },
  submitButtonText: {},
  textInfo: {
    color: config.tokens.colors.textInfo,
    paddingBottom: config.tokens.spacing.sm,
    textAlign: 'center',
  },
  callToNavigate: {
    color: config.tokens.colors.primaryDark,
    textAlign: 'center',
  },
  circlesContainer: {
    position: 'absolute',
    bottom: -180,
    width: width,
    height: height * 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: config.tokens.borderRadius.xl,
  },
  circleYellow: {
    backgroundColor: config.tokens.colors.mediumPriority,
  },
  circleRed: {
    backgroundColor: config.tokens.colors.highPriority,
    zIndex: 10,
  },
  circleBlue: {
    backgroundColor: config.tokens.colors.blue,
  },

  modalLogouttext:{
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalAreYouSuretext:{
    marginTop:20,
    marginBottom:0,
  },
  submitButton: {
    backgroundColor: config.tokens.colors.primaryDark,
    borderRadius: config.tokens.borderRadius.sm,
    width:'45%',
    minHeight:45
    
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cancelButton1st: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    backgroundColor: 'transparent', 
  },
  cancelButton1stText: {
    color: config.tokens.colors.black,
    textAlign: 'center',
  },
  submitButton1st: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  submitButton1stText: {
    color: config.tokens.colors.black, 
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: config.tokens.colors.neutral,
    borderRadius: config.tokens.borderRadius.sm,
    width:'45%',
    minHeight:45
  },

  cancelButtonText: {
  color:config.tokens.colors.black,

  }
  ,
  modalStyle :{
  paddingVertical:20,
  width:'100%',
  borderRadius:20

  },
  modalStyleLogout:{
  paddingVertical:20,
  width:'100%',
  position:'absolute',
  borderRadius:20,
  bottom:0
  },
  KeyboardModalStyle:{
    bottom:0,
    position: 'absolute',
    width:'100%'
  },
  buttonGrid:{
    grid:1
  },
  modalFooter:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalHeaderStyle:{
    borderBottomColor:'#CCC',
    borderBottomWidth:1,
  }
});

export default EditProfileScreen;