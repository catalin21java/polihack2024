import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
} from "react-native";

const App = () => {
  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // State for journal entries and form inputs
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "A beautiful day",
      description: "Went for a walk in the park.",
      date: "2024-12-07",
    },
    {
      id: 2,
      title: "Rainy morning",
      description: "Read a book while enjoying the rain.",
      date: "2024-12-06",
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getTodayDate()); // Set default date to today
  const [expandedEntryId, setExpandedEntryId] = useState<number | null>(null); // Track expanded entry
  const [expandAnimation] = useState(new Animated.Value(0)); // For animating the expansion

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
      date,
    };
    setEntries([newEntry, ...entries]); // Add new entry at the top
    setTitle("");
    setDescription("");
    setDate(getTodayDate()); // Reset date to today for the next entry
  };

  // Toggle expanded entry
  const toggleExpandEntry = (id: number) => {
    if (expandedEntryId === id) {
      // Collapse the entry if it's already expanded
      setExpandedEntryId(null);
      Animated.timing(expandAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Expand the new entry
      setExpandedEntryId(id);
      Animated.timing(expandAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            editable={false} // Make the date input non-editable since it's automatic
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

        {/* Journal Entries */}
        {entries.map((entry) => (
          <View key={entry.id}>
            <TouchableOpacity
              style={styles.entryCard}
              onPress={() => toggleExpandEntry(entry.id)}
            >
              <Text style={styles.entryDate}>{entry.date}</Text>
              <Text style={styles.entryTitle}>{entry.title}</Text>
            </TouchableOpacity>

            {/* Expand description like a window above */}
            {expandedEntryId === entry.id && (
              <Animated.View
                style={[
                  styles.expandedDescription,
                  {
                    height: expandAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 150], // Adjust height as necessary
                    }),
                    opacity: expandAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                <Text style={styles.entryDescription}>{entry.description}</Text>
              </Animated.View>
            )}
          </View>
        ))}
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
  form: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a4a4a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#a5d6e8", // Lighter pastel blue border
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#f1faff", // Light blue input background
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
    borderLeftColor: "#80deea", // Lighter pastel blue border for entries
  },
  entryDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0288d1", // Dark blue for the date
    marginBottom: 4,
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  expandedDescription: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    marginTop: -10, // Makes it expand over the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4fc3f7", // Light pastel blue button color
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
