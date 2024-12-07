import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const goals = [
    "Get Fit",
    "Get Motivated",
    "Get Happier",
    "Get Productive",
    "Get Healthier",
    "Get Over It",
    "Get Focused",
    "Get Wealthy",
    "Get Wiser",
    "Get Spiritual",
  ];

  // State to track selected goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Handle card selection
  const toggleSelection = (goal) => {
    setSelectedGoals((prevSelected) =>
      prevSelected.includes(goal)
        ? prevSelected.filter((item) => item !== goal)
        : [...prevSelected, goal]
    );
  };

  return (
    <SafeAreaView
      className="flex-1 px-4 pt-6"
      style={{ backgroundColor: "#a5d6e8" }}
    >
      {/* Progress Bar */}
      <View className="h-1 bg-gray-700 w-full mb-6">
        <View className="bg-orange-500 h-1 w-1/5" />
      </View>

      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-4">
        What are your goals?
      </Text>

      {/* Goals Grid */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-5 mb-6">
        <View className="flex flex-wrap flex-row justify-between">
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSelection(goal)}
              activeOpacity={0.7}
              className={`w-[48%] rounded-lg p-4 mb-4 items-center ${
                selectedGoals.includes(goal) ? "bg-gray-200" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-base font-medium text-center ${
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
      <Text className="text-gray-400 text-center">Select one or more</Text>
    </SafeAreaView>
  );
}
