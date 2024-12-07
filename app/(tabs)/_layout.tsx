import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View
      style={{
        alignItems: "center", // Centers content horizontally
        justifyContent: "center", // Centers content vertically
        flex: 1, // Ensures space is distributed evenly
        marginTop: 12, // Adjusted margin for better vertical alignment
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 24,
          height: 24,
          tintColor: color, // Ensures the icon color is consistent with the focused state
        }}
      />
      <Text
        style={{
          color: color,
          fontSize: 10, // Adjusts font size
          fontWeight: focused ? "600" : "400", // Adjusts text weight based on focus state
          marginTop: 5, // Adds space between icon and text
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#8DBBA8", // Darker blue for active tab
          tabBarInactiveTintColor: "#3b82f6", // Medium blue for inactive tabs
          tabBarStyle: {
            backgroundColor: "#f0f8ff", // Light pastel background for the tab bar
            borderTopWidth: 1,
            borderTopColor: "#f0f8ff", // Border to match the background
            height: 65, // Slightly higher tab bar height
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color} // Ensures consistency across tabs
                name="Home"
                focused={focused} // Keeps icon and text style in sync with focus state
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chatbot"
          options={{
            title: "Chatbot",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.chatbot}
                color={color} // Consistent color for Bookmark tab
                name="chatbot"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Journal",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color} // Consistent color for Create tab
                name="Journal"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color} // Consistent color for Profile tab
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
