import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MoodAnalysis from "../components/MoodAnalyst";
import PopupMoodSelector from "../components/ModdPopup";

const HomePage: React.FC = () => {
  const [moodData, setMoodData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    data: [3, 4, 5, 4, 3],
    positiveDays: 4,
    totalDays: 5,
  });

  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleMoodUpdate = (mood: number) => {
    // Update the mood chart data
    const newData = [...moodData.data, mood];
    if (newData.length > 7) newData.shift(); // Keep the last 7 days

    const positiveDays = newData.filter((value) => value > 3).length; // Positive mood > 3
    const totalDays = newData.length;

    setMoodData({
      labels: [...moodData.labels.slice(1), "Today"], // Shift labels
      data: newData,
      positiveDays,
      totalDays,
    });

    setPopupVisible(false); // Close the popup
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Main content */}
      <ScrollView className="p-4">
        <MoodAnalysis moodData={moodData} />
      </ScrollView>

      {/* Popup overlay */}
      <PopupMoodSelector
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectMood={handleMoodUpdate}
      />
    </View>
  );
};

export default HomePage;
