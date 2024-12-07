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
  const [selectedDate, setSelectedDate] = useState("");
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
    // Log field values for debugging
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Selected Date:", selectedDate);

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
    markedDates[today] = { selected: true, selectedColor: "#4fc3f7" }; // Blue for current day
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
                    value={title}
                    onChangeText={setTitle}
                  />
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    placeholder="Tell me more about it"
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
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
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
    color: "#4caf50",
  },
  streakLabel: {
    fontSize: 18,
    marginLeft: 4,
  },
  entryCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  form: {
    marginBottom: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noEntries: {
    textAlign: "center",
    color: "#999",
    marginTop: 16,
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
});

export default Create;
