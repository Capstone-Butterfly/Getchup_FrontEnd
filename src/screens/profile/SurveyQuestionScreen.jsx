import { EyeIcon, ButtonText, FormControl, Heading, VStack, Button } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../../api'; 

function SurveyQuestionScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigation = useNavigation();

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

  const handleSubmit = async (answers) => {
    const data = {
      question_1: [{ question: questions[0].question, options: answers[0] }],
      question_2: [{ question: questions[1].question, options: answers[1] }],
      question_3: [{ question: questions[2].question, options: answers[2] }],
      question_4: [{ question: questions[3].question, options: answers[3] }]
    };

    try {
      const response = await api.post('/surveys/submit', data);
      console.log('Survey response:', response);
      if (response.status === 200) {
        // Assuming the response contains a category field
        const category = 'mixed presentation'; // Replace with actual logic to determine category
        navigation.navigate('ADHDCatScreen', { category });
      } else {
        Alert.alert('Survey submission failed', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

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