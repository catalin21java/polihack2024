import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

type MoodData = {
  labels: string[];
  data: number[];
  positiveDays: number;
  totalDays: number;
};

type MoodAnalysisProps = {
  moodData?: MoodData;
};

const MoodAnalysis: React.FC<MoodAnalysisProps> = ({ moodData }) => {
  // Provide default values to avoid undefined errors
  const defaultMoodData: MoodData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    data: [0, 0, 0, 0, 0],
    positiveDays: 0,
    totalDays: 0,
  };

  const safeMoodData = moodData || defaultMoodData;

  return (
    <View
      style={{
        padding: 20,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        backgroundColor: "#fff", // Background color as fallback
      }}
    >
      {/* Gradient Background */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 20,
          backgroundColor:
            "linear-gradient(135deg, #FDEB71, #F8D800, #ABDCFF, #0396FF, #FECFEF, #FF0066)",
          zIndex: -1,
        }}
      />

      {/* Header Text */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#333", // Neutral dark for readability
        }}
      >
        Mood Trends
      </Text>

      {/* Line Chart */}
      <LineChart
        data={{
          labels: safeMoodData.labels,
          datasets: [
            {
              data: safeMoodData.data,
              color: () => `rgba(255, 99, 132, 0.8)`, // Vibrant pink
            },
          ],
        }}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#F9F9F9",
          backgroundGradientTo: "#F3E5AB",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(34, 193, 195, ${opacity})`, // Teal for consistency
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#FFC1CC", // Pastel pink dots
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />

      {/* Footer Text */}
      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
          color: "#555", // Neutral tone for emphasis
          textAlign: "center",
        }}
      ></Text>
    </View>
  );
};

export default MoodAnalysis;
