import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import Layout from './_layout'; // Import the Layout

const questionsData = [
  {
    question: "How often do you exercise?",
    options: ["Daily", "Weekly", "Monthly", "Never"],
  },
  {
    question: "What type of exercises do you prefer?",
    options: ["Cardio", "Strength", "Yoga", "None"],
  },
  // Add more questions here as needed
];

export default function QuestionsContainer() {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => [...prev, answer]);
  };

  const handleNextGoal = () => {
    if (currentGoalIndex < questionsData.length - 1) {
      setCurrentGoalIndex(currentGoalIndex + 1);
    } else {
      // All questions answered, proceed to the next screen
      // Example: router.push("/nextScreen");
      console.log("All questions answered:", selectedAnswers);
    }
  };

  const currentQuestion = questionsData[currentGoalIndex];

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Goal {currentGoalIndex + 1}</Text>

        <ScrollView style={styles.questionsContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.nextButton} onPress={handleNextGoal}>
          <Text style={styles.buttonText}>
            {currentGoalIndex < questionsData.length - 1 ? 'Next Goal' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionsContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionButton: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    padding: 16,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
