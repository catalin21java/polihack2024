// src/screens/question2.tsx
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function question2() {
  const options = ["Rarely", "Occasionally", "Frequently", "Daily"];

  // State to track selected answer
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Handle answer selection
  const handleSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <SafeAreaView
      className="flex-1 px-4 pt-6"
      style={{ backgroundColor: "#a5d6e8" }}
    >
      {/* Progress Bar */}
      <View className="h-1 bg-white w-full mb-6"></View>
      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-4">
        How often do you engage in physical activities?
      </Text>
      {/* Options Grid */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-5 mb-6">
        <View className="flex flex-wrap flex-row justify-between">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelection(option)}
              activeOpacity={0.7}
              className={`w-[48%] rounded-lg p-9 mb-4 items-center ${
                selectedAnswer === option ? "bg-gray-200" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-base font-medium text-center ${
                  selectedAnswer === option ? "text-black" : "text-white"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Footer */}
      <View>
        <Text className="text-black font-pmedium text-xl text-center">
          Select one
        </Text>
        {selectedAnswer && (
          <View className="absolute bottom-4 left-4 right-4">
            <TouchableOpacity
              onPress={() => {
                router.push("/question3");
              }}
              activeOpacity={0.8}
              className="bg-orange-500 py-4 mb-5 rounded-lg items-center"
            >
              <Text className="text-white text-lg font-medium">Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
