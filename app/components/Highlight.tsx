import React from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";

interface Highlight {
  title: string;
  snippet: string;
  image: string; // URL or local asset for background
}

interface ReflectionHighlightsProps {
  highlights: Highlight[];
}

const ReflectionHighlights: React.FC<ReflectionHighlightsProps> = ({
  highlights,
}) => {
  return (
    <View className="mt-8 px-6">
      {/* Section Heading */}
      <Text className="text-2xl font-semibold text-gray-800 mb-4">
        Reflection Highlights
      </Text>

      {/* Highlights Carousel */}
      <FlatList
        data={highlights}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mr-4">
            <ImageBackground
              source={{ uri: item.image }}
              className="w-72 h-48 rounded-lg overflow-hidden"
              imageStyle={{ borderRadius: 12 }}
            >
              <View className="flex-1 bg-gradient-to-t from-black/70 to-transparent p-4 justify-end">
                <Text className="text-lg font-bold text-white">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-200 mt-2">
                  {item.snippet}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

export default ReflectionHighlights;
