import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { useJournal } from "../../context/JournalContext";

const Create = () => {
  const { entries, setEntries } = useJournal(); // Use the journal context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    calculateStreak();
  }, [entries]);

  const calculateStreak = () => {
    let streakCount = 0;
    let currentDate = new Date();
    while (
      entries.some(
        (entry) => entry.date === currentDate.toISOString().split("T")[0]
      )
    ) {
      streakCount++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setStreak(streakCount);
  };

  const handleAddEntry = () => {
    if (!title || !description || !selectedDate) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all fields before adding an entry."
      );
      return;
    }

    const newEntry = {
      id: entries.length + 1,
      title,
      description,
      date: selectedDate,
    };
    setEntries([newEntry, ...entries]); // Add new entry to context
    console.log("New Entry Added:", newEntry);

    setTitle("");
    setDescription("");
  };

  const filteredEntries = entries.filter(
    (entry) => entry.date === selectedDate
  );

  const markedDates: {
    [key: string]: { selected: boolean; selectedColor: string };
  } = entries.reduce((acc, entry) => {
    acc[entry.date] = { selected: true, selectedColor: "#4caf50" }; // Green for dates with entries
    return acc;
  }, {});

  const today = new Date().toISOString().split("T")[0];
  if (entries.some((entry) => entry.date === today)) {
    markedDates[today] = { selected: true, selectedColor: "#4caf50" }; // Green for today with an entry
  } else {
    markedDates[today] = { selected: true, selectedColor: "#F5B66A" }; // Blue for current day
  }
  markedDates[selectedDate] = { selected: true, selectedColor: "#4fc3f7" };

  const isFutureDate = (date) => {
    const today = new Date();
    const selected = new Date(date);
    return selected > today;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* Streak Section */}
              <View style={styles.streakContainer}>
                <Text style={styles.streakText}>Current Streak</Text>
                <View style={styles.streakBox}>
                  <Text style={styles.streakNumber}>{streak}</Text>
                  <Text style={styles.streakLabel}>days</Text>
                </View>
              </View>

              {/* Calendar */}
              <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
              />

              {/* Conditionally Render Journal Entry Form */}
              {!isFutureDate(selectedDate) && (
                <View style={[styles.entryCard, styles.form]}>
                  <Text style={styles.header}>New Journal Entry</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="How was your day?"
                    placeholderTextColor="#B0BEC5" // Light gray placeholder
                    value={title}
                    onChangeText={setTitle}
                  />

                  <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Tell me more about it"
                    placeholderTextColor="#B0BEC5"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                  />

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddEntry}
                  >
                    <Text style={styles.buttonText}>Add Entry</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Display Entries for Selected Date */}
              <Text style={styles.header}>Entries for {selectedDate}</Text>
              {filteredEntries.length === 0 ? (
                <Text style={styles.noEntries}>
                  No entries found for this date.
                </Text>
              ) : (
                filteredEntries.map((entry) => (
                  <View key={entry.id} style={styles.entryCard}>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <Text style={styles.entryDescription}>
                      {entry.description}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E3F2FD", // Light pastel blue
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  entryCard: {
    backgroundColor: "#FFFFFF", // White card for contrast
    padding: 20,
    borderRadius: 12, // Softer corners
    marginBottom: 16,
    marginTop: 16,
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },
  form: {
    marginBottom: 32,
  },
  header: {
    fontSize: 26, // Slightly larger for emphasis
    fontWeight: "bold",
    color: "#8DBBA8", // Calming purple
    marginBottom: 20,
    textAlign: "center", // Centered header
  },
  input: {
    borderWidth: 1,
    borderColor: "#8DBBA8", // Soft lavender border
    borderRadius: 10, // Rounded corners
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#F9F9F9", // Light background for input fields
    fontSize: 16,
    color: "#333", // Dark text for readability
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8DBBA8", // Vibrant purple for the button
    padding: 16,
    borderRadius: 25, // Rounded pill-like button
    alignItems: "center",
    shadowColor: "#000", // Shadow for the button
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF", // White text for contrast
    fontSize: 18,
    fontWeight: "bold",
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  entryDescription: {
    fontSize: 16,
    color: "#666",
  },
  noEntries: {
    textAlign: "center",
    color: "#999",
    marginTop: 16,
  },
  streakContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  streakText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8DBBA8",
  },
  streakLabel: {
    fontSize: 18,
    marginLeft: 4,
  },
});

export default Create;
