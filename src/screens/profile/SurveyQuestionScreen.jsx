import { ButtonText, FormControl, Heading, VStack, Button } from '@gluestack-ui/themed';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config/apiConfig';
import surveyQuestionStore from '../../store/surveyQuestionStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function SurveyQuestionScreen() {
  const { currentQuestion, setCurrentQuestion, answers, setAnswers } = surveyQuestionStore(); // Access the Zustand store
  const navigation = useNavigation();
  const base_url = BASE_URL;

  const questions = [
    {
      question: "How often do you feel the need to be constantly moving or fidgeting?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"]
    },
    {
      question: "How often do you act on impulse without considering the consequences?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"]
    },
    {
      question: "How often do you find it difficult to stay focused on tasks or conversations?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"]
    },
    {
      question: "How often do you feel restless or have difficulty sitting still for extended periods?",
      options: ["Almost Always", "Frequently", "Occasionally", "Rarely"]
    }
  ];

  const handleOptionPress = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };


  const { mutate: handleSubmit, isLoading, mutationFn } = useMutation(
    {
      mutationFn: async (answers) => {
        const response = await axios.post(`${base_url}/surveys/submit`, {
          question_1: [{ question: questions[0].question, options: answers[0] }],
          question_2: [{ question: questions[1].question, options: answers[1] }],
          question_3: [{ question: questions[2].question, options: answers[2] }],
          question_4: [{ question: questions[3].question, options: answers[3] }]
        });
        return response.data;
      },
      onSuccess: async (data) => {
        
        const category = 'mixed presentation';
        // Navigate to ADHDCatScreen page
        navigation.navigate('ADHDCatScreen', { category });
      },
      onError: () => {
        Alert.alert('Login failed', 'Invalid email or password');
      },
    }
  );
    

  return (
    <View>
      <Text fontWeight="bold">Survey {currentQuestion + 1}</Text>
      <FormControl
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
      >
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">
            {questions[currentQuestion].question}
          </Heading>

          {questions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              backgroundColor={answers[currentQuestion] === option ? '$blue' : '$gray300'}
              onPress={() => handleOptionPress(option)}
            >
              <ButtonText>{option}</ButtonText>
            </Button>
          ))}
        </VStack>
      </FormControl>
    </View>
  );
}

export default SurveyQuestionScreen;