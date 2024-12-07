import React from 'react';
import {StyleSheet, View, Text, Pressable, GestureResponderEvent} from 'react-native';

// Define the types for props
interface CardComponentProps {
  description: string;
  date: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({description, date, onPress}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.dateSection}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateSection: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#ccc',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
  },
  contentSection: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
});
