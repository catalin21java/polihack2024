import React, { useState } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import MoodAnalysis from "../components/MoodAnalyst";
import PopupMoodSelector from "../components/ModdPopup";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalsSection from "../components/Reminders";

const HomePage: React.FC = () => {
  const [moodData, setMoodData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    data: [3, 4, 5, 4, 3],
    positiveDays: 4,
    totalDays: 5,
  });

  const goals = [
    {
      title: "Drink More Water",
      description: "Stay hydrated by drinking at least 8 glasses today.",
    },
    {
      title: "Reflect on Gratitude",
      description: "Write down three things you're grateful for today.",
    },
    {
      title: "Take a Walk",
      description: "Spend 20 minutes walking outdoors to clear your mind.",
    },
  ];

  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleMoodUpdate = (mood: number) => {
    const newData = [...moodData.data, mood];
    if (newData.length > 7) newData.shift();

    const positiveDays = newData.filter((value) => value > 3).length;
    const totalDays = newData.length;

    setMoodData({
      labels: [...moodData.labels.slice(1), "Today"],
      data: newData,
      positiveDays,
      totalDays,
    });

    setPopupVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      {/* Background Gradient */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "linear-gradient(135deg, #CDEDFD, #FFFFFF)",
        }}
      />

      {/* Welcome Section */}
      <View
        style={{
          padding: 20,
          margin: 16,
          borderRadius: 20,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignSelf: "flex-start",
            marginBottom: 10,
          }}
        />

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#2A7ABF",
          }}
        >
          Welcome back, [Name]!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#5D9CEC",
            marginTop: 5,
            fontStyle: "italic",
          }}
        >
          "Every day is a fresh start. Let’s make today great."
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: "transparent",
        }}
      >
        <MoodAnalysis moodData={moodData} />
        <GoalsSection goals={goals} />
      </ScrollView>

      {/* Popup Overlay */}
      <PopupMoodSelector
        isVisible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectMood={handleMoodUpdate}
      />
    </SafeAreaView>
  );
};

export default HomePage;
