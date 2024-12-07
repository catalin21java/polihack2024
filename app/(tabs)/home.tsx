import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import MoodAnalysis from "../components/MoodData"; // Import the mood chart component
import { SafeAreaView } from "react-native-safe-area-context";

const HomeTab: React.FC = () => {
  const [moodData, setMoodData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    data: [3, 4, 5, 4, 3], // Initial mood scores
    positiveDays: 4,
    totalDays: 5,
  });

  const [isModalVisible, setModalVisible] = useState(true);
  const [userMood, setUserMood] = useState<string>("");

  // Handle user mood submission
  const handleMoodSubmit = () => {
    const moodValue = parseInt(userMood, 10);

    if (isNaN(moodValue) || moodValue < 1 || moodValue > 10) {
      Alert.alert("Invalid Input", "Please enter a number between 1 and 10.");
      return;
    }

    // Update the mood chart data
    const newData = [...moodData.data, moodValue];
    if (newData.length > 7) newData.shift(); // Keep data for the last 7 days

    const positiveDays = newData.filter((value) => value > 5).length;
    const totalDays = newData.length;

    setMoodData({
      labels: [...moodData.labels.slice(1), "Today"], // Update labels
      data: newData,
      positiveDays,
      totalDays,
    });

    setModalVisible(false); // Close the modal
    setUserMood(""); // Reset input
  };

  return (
    <SafeAreaView>
      <ScrollView className="p-4 bg-gray-50">
        {/* Mood Analysis Chart */}
        <MoodAnalysis moodData={moodData} />

        {/* Mood Input Modal */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white rounded-lg p-6 w-4/5 shadow-md">
              <Text className="text-lg font-bold mb-4">
                How are you feeling today?
              </Text>
              <Text className="text-gray-600 mb-2">
                Rate your mood on a scale from 1 to 10:
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 text-center text-lg mb-4"
                keyboardType="numeric"
                maxLength={2}
                value={userMood}
                onChangeText={setUserMood}
                placeholder="Enter a number"
              />
              <Button title="Submit" onPress={handleMoodSubmit} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
