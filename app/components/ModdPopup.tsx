import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

type PopupMoodSelectorProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelectMood: (mood: number) => void;
};

const PopupMoodSelector: React.FC<PopupMoodSelectorProps> = ({
  isVisible,
  onClose,
  onSelectMood,
}) => {
  const handleMoodSelection = (mood: number) => {
    onSelectMood(mood);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true} // Ensure the background is transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }}
      >
        {/* Popup Content */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            width: "80%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5, // For Android shadow
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
            How are you feeling today?
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Select a mood from 1 (bad) to 5 (great):
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {[1, 2, 3, 4, 5].map((mood) => (
              <TouchableOpacity
                key={mood}
                onPress={() => handleMoodSelection(mood)}
                style={{
                  backgroundColor: "#E0F7FA",
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopupMoodSelector;
