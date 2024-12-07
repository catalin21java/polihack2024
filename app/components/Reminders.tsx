import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

type Goal = {
  title: string;
  description: string;
};

type GoalsProps = {
  goals: Goal[];
};

const GoalsSection: React.FC<GoalsProps> = ({ goals }) => {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 my-4">
      <Text className="text-lg font-bold mb-4 text-gray-800">
        Personalized Goals
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row space-x-4"
      >
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            className="bg-gradient-to-r from-green-200 to-blue-300 rounded-xl p-4 w-64 shadow-lg"
          >
            <Text className="text-xl font-semibold text-gray-800">
              {goal.title}
            </Text>
            <Text className="text-gray-700 mt-2">{goal.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GoalsSection;
