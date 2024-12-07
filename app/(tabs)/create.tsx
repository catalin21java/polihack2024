import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';

const Create = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    calculateStreak();
  }, [entries]);

  const calculateStreak = () => {
    let streakCount = 0;
    let currentDate = new Date();
    while (entries.some(entry => entry.date === currentDate.toISOString().split('T')[0])) {
      streakCount++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setStreak(streakCount);
  };

  const handleAddEntry = () => {
    if (!title || !description || !selectedDate) {
      return;
    }
    const newEntry = {
      id: entries.length + 1,
      title,
      description,
      date: selectedDate,
    };
    setEntries([newEntry, ...entries]);
    setTitle('');
    setDescription('');
  };

  const filteredEntries = entries.filter(entry => entry.date === selectedDate);

  const markedDates = entries.reduce((acc, entry) => {
    acc[entry.date] = { selected: true, selectedColor: '#4caf50' }; // Green color for dates with entries
    return acc;
  }, {});

  const today = new Date().toISOString().split('T')[0];
  if (entries.some(entry => entry.date === today)) {
    markedDates[today] = { selected: true, selectedColor: '#4caf50' }; // Green color if current day has an entry
  } else {
    markedDates[today] = { selected: true, selectedColor: '#4fc3f7' }; // Blue color for current day
  }
  markedDates[selectedDate] = { selected: true, selectedColor: '#4fc3f7' };

  const isFutureDate = (date) => {
    const today = new Date();
    const selected = new Date(date);
    return selected > today;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>Current Streak</Text>
          <View style={styles.streakBox}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>days</Text>
          </View>
        </View>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
        />
        {/* Conditionally render the Journal Entry Form */}
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
            <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
              <Text style={styles.buttonText}>Add Entry</Text>
            </TouchableOpacity>
          </View>
        )}

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  scrollContent: {
    padding: 16,
  },
  streakContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  streakBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4fc3f7',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
  streakLabel: {
    fontSize: 18,
    color: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a4a4a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  textarea: {
    height: 100,
  },
  button: {
    backgroundColor: '#4fc3f7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  entryCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryDescription: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  noEntries: {
    fontSize: 14,
    color: '#4a4a4a',
    textAlign: 'center',
    marginVertical: 10,
  },
  form: {
    marginBottom: 20,
  },
});