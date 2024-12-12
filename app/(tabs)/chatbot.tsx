import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useJournal } from "@/context/JournalContext";
import MoodAnalysis from "../components/MoodAnalyst";
import { useMood } from "@/context/MoodContext";
import { useAnswers } from "@/context/AnswersContext";
import TypingIndicator from "../components/TypingIndicator";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatbotScreen: React.FC = () => {
  const { answers } = useAnswers();

  const { entries } = useJournal();
  const { moodData, setMoodData } = useMood();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const questions = [
    "What are your goals?",
    "What challenges you most in staying motivated?",
    "What brings you the most joy in your daily life?",
    "What’s your biggest productivity challenge?",
    "What area of health would you like to improve the most?",
    "What’s your go-to coping mechanism for difficult emotions?",
    "What environment helps you concentrate?",
  ];
  const formattedAnswers = Object.entries(answers)
    .map(
      ([questionIndex, userAnswers]) =>
        `Question ${questions[Number(questionIndex) - 1]}: ${userAnswers.join(
          ", "
        )}`
    )
    .join("\n");

  const getJournalData = () => {
    return entries
      .map((entry) => `${entry.date} - ${entry.title}: ${entry.description}`)
      .join("\n");
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { sender: "user", text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    try {
      setIsTyping(true); // Show typing indicator
      console.log(moodData);
      const journalData = getJournalData();
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that has access to the user's journal and aim to help them achieve a better day. Provide specific and empathetic and relatively short responses.if the user has homocidal tendencies towards other people, you need to give an appropiate response. Be kind and supportive and keep the conversation positive.",
            },
            {
              role: "system",
              content: `The user has shared the following journal entries: ${journalData}`,
            },
            {
              role: "system",
              content: `The user has shared their mood across multiple days on a scale from 1 to 5. Here is the mood data:\n\n${JSON.stringify(
                moodData,
                null,
                2
              )}\n\nExplain this data to the user, talk about their mood trends, and offer support or suggestions based on this information.`,
            },
            {
              role: "system",
              content: `The user has shared the following goals in life, they are really important to him so try to build, when is the case, conversations around them: ${formattedAnswers}`,
            },
            { role: "user", content: inputText },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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", // Replace with your key
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      const botMessage: Message = { sender: "bot", text: botReply };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };
  console.log(isTyping);

  useEffect(() => {
    const initialBotMessage = () => {
      const welcomeMessage: Message = {
        sender: "bot",
        text: "Hello! How are you feeling today?",
      };
      setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
    };

    initialBotMessage();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Bar */}
        <View style={styles.header}>
          <Icon name="assistant" size={24} color="#FFFFFF" />
          <Text style={styles.headerTitle}>Personal Assistant</Text>
        </View>
        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.sender === "user" ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "bot" ? styles.botMessageText : {},
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        {/* Typing Indicator */}

        {isTyping && (
          <View style={styles.typingIndicatorContainer}>
            <View style={styles.typingBubble}>
              <Text style={styles.typingDots}>...</Text>
            </View>
            <Text style={styles.typingText}>Bot is typing...</Text>
          </View>
        )}
        {/* Input Section */}
        <View style={styles.inputContainer} className="p-10">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light pastel blue background
  },
  messageContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 15,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#90CAF9", // Calm blue for user messages
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  botMessage: {
    backgroundColor: "#8DBBA8", // Soft green for bot messages
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 20,
    lineHeight: 22,
    color: "#FFFFFF",
  },
  botMessageText: {
    color: "#F4FFF0", // Gray text for better readability
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    position: "absolute",
    bottom: 0,
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#64B5F6", // Vibrant blue for send button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4fc3f7", // Light blue header background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  typingIndicatorContainer: {
    flexDirection: "row", // Horizontal alignment
    paddingBottom: 10,
    position: "absolute", // Overlay the indicator
    bottom: 60, // Position above the input bar
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it appears above other elements
  },

  typingBubble: {
    backgroundColor: "#8DBBA8", // Light blue background
    borderRadius: 20, // Rounded bubble
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8, // Space between bubble and text
  },

  typingDots: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2, // Spacing between dots
    color: "#FFFFFF", // Slightly darker blue for dots
  },

  typingText: {
    paddingTop: 10,
    fontSize: 14,
    fontStyle: "italic",
    color: "#555555", // Subtle gray text
  },
});
