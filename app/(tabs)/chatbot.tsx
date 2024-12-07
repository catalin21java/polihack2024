import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { sender: "user", text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: inputText }],
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
        text: "Oops! Something went wrong.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatbotScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa", // Light pastel blue background
    padding: 16,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#4fc3f7", // Light pastel blue for user
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#80deea", // Lighter pastel blue for bot
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#ffffff",
    fontSize: 16,
  },
  botMessageText: {
    color: "#000000", // Black for bot's text for better contrast
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center" as "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1faff", // Light blue input field background
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a5d6e8", // Lighter pastel blue border
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#4fc3f7", // Light pastel blue button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
};
