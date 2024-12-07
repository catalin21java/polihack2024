import { View, Text } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="question1" options={{ headerShown: false }} />
        <Stack.Screen name="question2" options={{ headerShown: false }} />
        <Stack.Screen name="question3" options={{ headerShown: false }} />
        <Stack.Screen name="question4" options={{ headerShown: false }} />
        <Stack.Screen name="question5" options={{ headerShown: false }} />
        <Stack.Screen name="question6" options={{ headerShown: false }} />
        <Stack.Screen name="question7" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
