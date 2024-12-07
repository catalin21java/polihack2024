import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment"; // Install moment.js for date handling

type MoodData = {
  labels: string[]; // Dates or day names
  data: number[]; // Mood scores
  positiveDays: number;
  totalDays: number;
};

type MoodAnalysisProps = {
  moodData?: MoodData;
};

const MoodAnalysis: React.FC<MoodAnalysisProps> = ({ moodData }) => {
  // Provide default values to avoid undefined errors
  const defaultMoodData: MoodData = {
    labels: [],
    data: [0, 0, 0, 0, 0],
    positiveDays: 0,
    totalDays: 0,
  };

  const safeMoodData = moodData || defaultMoodData;

  // Get the last 5 days including today
  const today = moment(); // Current date
  const labels = Array.from({ length: 5 }).map(
    (_, i) =>
      today
        .clone()
        .subtract(4 - i, "days")
        .format("ddd") // Get short weekday names
  );

  // Highlight today's label by adding a marker or distinction
  const highlightedLabels = labels.map((label, index) =>
    index === 4 ? ` Today` : label
  );

  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
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
          labels: highlightedLabels,
          datasets: [
            {
              data: safeMoodData.data,
              color: () => `rgba(255, 99, 132, 0.8)`, // Vibrant pink
            },
          ],
        }}
        width={300}
        height={250}
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
