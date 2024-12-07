import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <ScrollView className="bg-gray-100 flex-1">
      {/* Header Section */}
      <SafeAreaView className="px-6 py-4">
        <Text className="text-xl font-bold text-gray-700">Home Morning,</Text>
        <View className="flex-row items-center mt-2">
          <Image
            source={{ uri: "https://example.com/avatar.png" }} // Replace with your image URL
            className="w-16 h-16 rounded-full"
          />
          <Text className="text-sm text-gray-500 ml-4">Good Day!</Text>
        </View>
      </SafeAreaView>

      {/* Vital Stats */}
      <View className="flex-row justify-between mx-4 mt-4">
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-500">39</Text>
          <Text className="text-xs text-gray-500">Heart Rate</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-blue-500">39</Text>
          <Text className="text-xs text-gray-500">Blood Oxygen</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="flex-wrap flex-row justify-center mt-4">
        {[
          { name: "Heart Rate", icon: "❤️" },
          { name: "Blood O2", icon: "🩸" },
          { name: "Stress Level", icon: "😰" },
          { name: "Sleep Quality", icon: "🌙" },
          { name: "Blood Pressure", icon: "🩺" },
        ].map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-lg shadow-md m-2 p-4 w-32 h-40 items-center"
          >
            <Text className="text-3xl">{item.icon}</Text>
            <Text className="mt-2 text-gray-700">{item.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
