import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { images } from '../../constants';

const Profile = () => {
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    gender: false,
    workStudy: false,
    eval1: false,
    eval2: false,
    eval3: false,
  });

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    gender: 'Male',
    workStudy: 'Software Engineer',
    eval1: 'Evaluation 1',
    eval2: 'Evaluation 2',
    eval3: 'Evaluation 3',
  });

  const [profileImage, setProfileImage] = useState(images.profile);

  const handleEditToggle = (field: keyof typeof profileData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
        {Object.keys(profileData).map((field) => (
          <View key={field} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
            <View style={styles.fieldRow}>
              {isEditing[field as keyof typeof isEditing] ? (
                <TextInput
                  style={styles.fieldValue}
                  value={profileData[field as keyof typeof profileData]}
                  onChangeText={(text) => handleInputChange(field as keyof typeof profileData, text)}
                />
              ) : (
                <Text style={styles.fieldValue}>{profileData[field as keyof typeof profileData]}</Text>
              )}
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditToggle(field as keyof typeof profileData)}>
                <Text style={styles.editButtonText}>{isEditing[field as keyof typeof isEditing] ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  scrollContainer: {
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#4a4a4a',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#4fc3f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});