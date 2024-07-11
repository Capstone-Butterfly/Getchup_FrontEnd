import { ButtonText, FormControl, Heading, VStack, Button } from '@gluestack-ui/themed';
import React from 'react';
import { View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profileStore from '../../store/profileStore';
import { useMutation } from '@tanstack/react-query';
import { surveyQuestionProfile, updateUserProfile } from '../../services/profile';
import { config } from '../../styles/themeConfig'; 
import { defaultStyles } from './../../styles/styles'

// Get device dimensions
const { width, height } = Dimensions.get('window');

function SurveyQuestionScreen() {
  const { userId, current_question, setCurrentQuestion, answers, setAnswers, setUserType, setSurveyDone } = profileStore((state) => state); 
  const navigation = useNavigation();

  const questions = [
    {
      question: "How often do you feel the need to be constantly moving or fidgeting?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"],
      heading: "Let's get started.."
    },
    {
      question: "How often do you act on impulse without considering the consequences?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"],
      heading: "Keep going.."
    },
    {
      question: "How often do you find it difficult to stay focused on tasks or conversations?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"],
      heading: "One more.."
    },
    {
      question: "How often do you feel restless or have difficulty sitting still for extended periods?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"],
      heading: "And we are done.."
    }
  ];

  const handleOptionPress = (option) => {
    const newAnswers = [...answers];
    newAnswers[current_question] = option;
    setAnswers(newAnswers);

    if (current_question < questions.length - 1) {
      setCurrentQuestion(current_question + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const { mutate: handleSubmit } = useMutation(
    {
      mutationFn: async (answers) => {
        const data = await surveyQuestionProfile([
          { question: questions[0].question, options: answers[0] },
          { question: questions[1].question, options: answers[1] },
          { question: questions[2].question, options: answers[2] },
          { question: questions[3].question, options: answers[3] },
        ]);
        return data;
      },
      onSuccess: async (data) => {
        setUserType(data.user_type);
        const userInfo = {
          user_type: data.user_type,
        };
        await updateUserProfile(userId, userInfo);

        
        navigation.navigate('ADHDCatScreen');
      },
      onError: () => {
        Alert.alert('Survey submission failed', 'Something went wrong. Please try again.');
      },
    }
  );

  const progressBarWidth = ((current_question + 1) / questions.length) * 100 + '%';

  return (
    <View style={styles.container}>
    
      <FormControl style={styles.formBox}>
        <VStack space="xl">
          <Heading style={[defaultStyles.TypographyH1]}>
            {questions[current_question].heading}
          </Heading>
          <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progressBarWidth }]} />
      </View>
          <Text style={defaultStyles.TypographyH2}>{questions[current_question].question}</Text>
          {questions[current_question].options.map((option) => (
            <Button
              key={option}
              backgroundColor="$blue"
              onPress={() => handleOptionPress(option)}
              style={styles.surveyBut}
            >
              
              <ButtonText style={styles.surveyButTest}>{option}</ButtonText>
            </Button>
          ))}
        </VStack>
      </FormControl>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.tokens.colors.white,
    justifyContent: 'flex-start', 
    alignItems: 'center', 
  },
  surveyHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%', 
    height: 10,
    backgroundColor: config.tokens.colors.white,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: config.tokens.colors.primaryDark,
    borderRadius: 5,
  },
  formBox: {
    paddingTop: 100,
    width: width * 0.9, 
    maxWidth: 400, 
    minWidth: 300, 
  },
  surveyBut:{
    backgroundColor: config.tokens.colors.white,
    borderRadius: config.tokens.borderRadius.md,
    borderColor:config.tokens.colors.primaryDark,
    borderWidth:1,
  },
  surveyButTest:{
    color:config.tokens.colors.black,

  }
});

export default SurveyQuestionScreen;