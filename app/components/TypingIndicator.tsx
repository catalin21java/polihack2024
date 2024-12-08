import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const TypingIndicator = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.typingIndicator}>
      <View style={styles.bubble}>
        <Text style={styles.typingDots}>{dots}</Text>
      </View>
      <Text style={styles.typingText}>Bot is typing...</Text>
    </View>
  );
};

export default TypingIndicator;

const styles = StyleSheet.create({
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  bubble: {
    backgroundColor: "#E3F2FD",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  typingDots: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#4A4A4A",
  },
  typingText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555555",
  },
});
