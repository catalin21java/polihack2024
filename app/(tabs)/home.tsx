import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import MoodAnalysis from "../components/MoodAnalyst";
import PopupMoodSelector from "../components/ModdPopup";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalsSection from "../components/Reminders";
import { useMood } from "../../context/MoodContext";
import ReflectionHighlights from "../components/Highlight";
import { useAnswers } from "@/context/AnswersContext";
import axios from "axios";

type Message = {
  sender: string;
  text: string;
};

const HomePage: React.FC = () => {
  const { moodData, setMoodData } = useMood();
  const { answers } = useAnswers();

  const [goals, setGoals] = useState<{ title: string; description: string }[]>([
    { title: answers[1]?.[0] || "Default Goal 1", description: "" },
    { title: answers[2]?.[0] || "Default Goal 2", description: "" },
    { title: answers[5]?.[0] || "Default Goal 3", description: "" },
  ]);

  const highlights = [
    {
      title: "Family",
      snippet: "Family has been a focus for your happiness this week.",
      image: "https://via.placeholder.com/400x300.png?text=Family",
    },
    {
      title: "Work",
      snippet: "You’ve written about work challenges multiple times.",
      image: "https://via.placeholder.com/400x300.png?text=Work",
    },
    {
      title: "Health",
      snippet: "Health has been a recurring theme in your journaling.",
      image: "https://via.placeholder.com/400x300.png?text=Health",
    },
  ];

  const fetchAdviceForGoals = async () => {
    try {
      const updatedGoals = await Promise.all(
        goals.map(async (goal) => {
          if (!goal.title) {
            return { ...goal, description: "No advice available." };
          }

          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4",
              messages: [
                {
                  role: "system",
                  content: `You are a helpful assistant providing really shor advices for user goals.`,
                },
                {
                  role: "user",
                  content: `Give me a really short helpful advice related to the goal: "${goal.title}".`,
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer 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", // Replace with your API key
              },
            }
          );

          const advice =
            response.data.choices[0]?.message?.content ||
            "No advice available.";

          return { ...goal, description: advice };
        })
      );

      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  useEffect(() => {
    fetchAdviceForGoals();
  }, [answers]);

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
        className="pb-5"
        style={{
          paddingHorizontal: 20,
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
        <View className="flex-row">
          <Image
            className="mt-6"
            source={{
              uri: "https://cdn.vectorstock.com/i/1000x1000/68/94/two-red-heart-on-white-background-sign-symbol-vector-22876894.webp",
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              alignSelf: "flex-start",
              marginBottom: 10,
            }}
          />
          <View className="flex-col items-center justify-center ps-10">
            <Text
              className="align-center mt-5"
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#2A7ABF",
              }}
            >
              Welcome back
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#2A7ABF",
              }}
            >
              Filip!
            </Text>
          </View>
        </View>

        <Text
          className="pt-3 text-sm"
          style={{
            fontSize: 16,
            color: "#8DBBA8",
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
        <ReflectionHighlights highlights={highlights} />
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
