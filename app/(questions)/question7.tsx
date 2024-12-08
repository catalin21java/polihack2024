import { useAnswers } from "@/context/AnswersContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function question2() {
  const goals = [
    "Quiet room",
    "Background noise",
    "Music",
    "Clean desk",
    "Outdoors",
    "Coffee shop",
    "A structured schedule",
    "A study group",
  ];
  const { setAnswers } = useAnswers();

  // State to track selected goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Handle card selection
  const toggleSelection = (goal: string) => {
    setSelectedGoals((prevSelected) =>
      prevSelected.includes(goal)
        ? prevSelected.filter((item) => item !== goal)
        : [...prevSelected, goal]
    );
  };

  const handleContinue = () => {
    setAnswers(7, selectedGoals);
    router.replace("/sign-in"); // Navigate to the next question
  };

  return (
    <SafeAreaView
      className="flex-1 px-4 pt-6"
      style={{ backgroundColor: "#a5d6e8" }}
    >
      {/* Progress Bar */}
      <View className="h-1 bg-white w-full mb-6">
        <View className="bg-black-100 h-1 w-6/6" />
      </View>
      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-4">
        What environment helps you concentrate?
      </Text>
      {/* Goals Grid */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-5 mb-6">
        <View className="flex flex-wrap flex-row justify-between">
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSelection(goal)}
              activeOpacity={0.7}
              className={`w-[48%] rounded-lg p-9 mb-4 items-center ${
                selectedGoals.includes(goal) ? "bg-gray-200" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-base font-small text-center ${
                  selectedGoals.includes(goal) ? "text-black" : "text-white"
                }`}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Footer */}
      <View>
        <Text className="text-black font-pmedium text-xl text-center">
          Select one or more
        </Text>
        {selectedGoals.length > 0 && (
          <View className="absolute bottom-4 left-4 right-4">
            <TouchableOpacity
              onPress={handleContinue}
              activeOpacity={0.8}
              className="bg-cyan-900 py-4 mb-5 rounded-lg items-center"
            >
              <Text className="text-white text-lg font-medium">Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
