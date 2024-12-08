import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1, // Optional: Ensures it uses available space if needed
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center", // Centers the text horizontally
    color: "#333", // Optional: Adjust text color
  },
});

export default Payment;
