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
  moodData?: MoodData; // Allow moodData to be optional
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
    <View className="bg-white rounded-lg shadow-md p-4 my-4">
      <Text className="text-lg font-bold mb-2">Mood Trends</Text>
      <LineChart
        data={{
          labels: safeMoodData.labels,
          datasets: [
            {
              data: safeMoodData.data,
            },
          ],
        }}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          borderRadius: 10,
        }}
      />
      <Text className="mt-2 text-gray-500">
        You’ve been feeling positive{" "}
        {safeMoodData.totalDays > 0
          ? Math.round(
              (safeMoodData.positiveDays / safeMoodData.totalDays) * 100
            )
          : 0}
        % of the time this week.
      </Text>
    </View>
  );
};

export default MoodAnalysis;
