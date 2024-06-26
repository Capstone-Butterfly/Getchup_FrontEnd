import { ButtonText, FormControl, Heading, VStack, Button } from '@gluestack-ui/themed';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profileStore from '../../store/profileStore';
import { useMutation } from '@tanstack/react-query';
import { surveyQuestionProfile } from '../../services/profile';

function SurveyQuestionScreen() {
  const { current_question, setCurrentQuestion, answers, setAnswers } = profileStore((state) => state); 
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
        const category = 'mixed presentation';
        // Navigate to ADHDCatScreen page
        navigation.navigate('ADHDCatScreen', { category });
      },
      onError: () => {
        Alert.alert('Survey submission failed', 'Something went wrong. Please try again.');
      },
    }
  );

  return (
    <View>
      <Text fontWeight="bold">Survey {current_question + 1}</Text>
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
            {questions[current_question].question}
          </Heading>

          {questions[current_question].options.map((option) => (
            <Button
              key={option}
              backgroundColor="$blue"
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
