import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "./components/CustomButton";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (user) {
    return <Redirect href="/home" />; // Navigate to the home screen
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center mt-5 min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w--[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
            Chat Your Way to Growth with
              <Text className="text-secondary-200 "> Aora </Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-3 left-40"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Your journey, your thoughts—tracked, understood, and always with you. Let’s get started!
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/question1")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
