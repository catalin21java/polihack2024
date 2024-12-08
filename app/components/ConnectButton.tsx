import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const ConnectToWearableButton: React.FC = () => {
  const handlePress = () => {
    Alert.alert(
      "Success",
      "You have successfully connected to your smart wearable!"
    );
  };

  return (
    <View className="bg-black mt-10 flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300">
      <TouchableOpacity
        onPress={handlePress}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 w-64 h-16 rounded-full shadow-lg flex-row items-center justify-center active:scale-95"
      >
        <Text className="text-white text-lg font-bold tracking-wide">
          Connect to Wearable
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectToWearableButton;
