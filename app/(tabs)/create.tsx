import { useJournal } from "@/context/JournalContext";
import React, { createContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

const App = () => {
  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months anre zero-indexed
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const JournalContext = createContext(null);
  // State for journal entries and form inputs
  const { entries, setEntries } = useJournal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayDate()); // Selected date on the calendar

  // Function to add a new entry
  const handleAddEntry = () => {
    if (!title || !description) {
      Alert.alert(
        "Missing fields",
        "Please fill in all fields to add an entry."
      );
      return;
    }
    const newEntry = {
      id: entries.length + 1, // Generate a new ID
      title,
      description,
      date: selectedDate,
    };
    setEntries([newEntry, ...entries]); // Add new entry at the top
    setTitle("");
    setDescription("");
  };

  // Filter entries by selected date
  const filteredEntries = entries.filter(
    (entry) => entry.date === selectedDate
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Calendar */}
        <Calendar
          onDayPress={(day: { dateString: React.SetStateAction<string> }) =>
            setSelectedDate(day.dateString)
          } // Update selected date on tap
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#4fc3f7" },
          }}
          theme={{
            selectedDayBackgroundColor: "#4fc3f7",
            todayTextColor: "#4a90e2",
            arrowColor: "#4a90e2",
          }}
          style={styles.calendar}
        />

        {/* Display Entries for Selected Date */}
        <Text style={styles.header}>Entries for {selectedDate}</Text>
        {filteredEntries.length === 0 ? (
          <Text style={styles.noEntries}>No entries found for this date.</Text>
        ) : (
          filteredEntries.map((entry) => (
            <View key={entry.id} style={styles.entryCard}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDescription}>{entry.description}</Text>
            </View>
          ))
        )}

        {/* Journal Entry Form */}
        <View style={[styles.entryCard, styles.form]}>
          <Text style={styles.header}>New Journal Entry</Text>
          <TextInput
            style={styles.input}
            placeholder="Title (e.g., A Beautiful Day)"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="What happened today?"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
            <Text style={styles.buttonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa", // Light pastel blue background
  },
  scrollContent: {
    padding: 16,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a4a4a",
  },
  noEntries: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#a5d6e8",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f1faff",
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  entryCard: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#80deea",
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 6,
  },
  entryDescription: {
    fontSize: 16,
    color: "#555555",
  },
  form: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4fc3f7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
