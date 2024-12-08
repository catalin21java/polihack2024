import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { images } from "../../constants";
import { useAnswers } from "@/context/AnswersContext";
import Payment from "../components/Payment";
import { Alert } from "react-native";


const Profile = () => {
  const { answers } = useAnswers();
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    gender: false,
    workStudy: false,
    goals: false,
    challenges: false,
    joys: false,
    productivity: false,
    health: false,
    coping: false,
    concentration: false,
  });

  const [profileData, setProfileData] = useState({
    name: "Lidia",
    email: "tomuslidi@gmail.com",
    gender: "Male",
    workStudy: "-",
    goals: answers[1],
    challenges: answers[2],
    joys: answers[3],
    productivity: answers[4],
    health: answers[5],
    coping: answers[6],
    concentration: answers[7],
  });

  const [profileImage, setProfileImage] = useState(images.profile);

  const handleEditToggle = (field: keyof typeof profileData) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (
    field: keyof typeof profileData,
    value: string
  ) => {
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
        {/* Profile Image Section */}
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.editImageText}>Change Profile Picture</Text>
        </TouchableOpacity>

        {/* Profile Fields */}
        {Object.keys(profileData).map((field) => (
          <View key={field} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Text>
            <View style={styles.fieldRow}>
              {isEditing[field as keyof typeof isEditing] ? (
                <TextInput
                  style={styles.inputField}
                  value={
                    Array.isArray(
                      profileData[field as keyof typeof profileData]
                    )
                      ? (
                          profileData[
                            field as keyof typeof profileData
                          ] as string[]
                        ).join(", ")
                      : (profileData[
                          field as keyof typeof profileData
                        ] as string)
                  }
                  onChangeText={(text) =>
                    handleInputChange(field as keyof typeof profileData, text)
                  }
                />
              ) : (
                <Text style={styles.fieldValue}>
                  {profileData[field as keyof typeof profileData] + '\n'}
                </Text>
              )}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  handleEditToggle(field as keyof typeof profileData)
                }
              >
                <Text style={styles.editButtonText}>
                  {isEditing[field as keyof typeof isEditing] ? "Save" : "Edit"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        <View style={styles.subscriptionContainer}>
  {/* Standard Plan Card */}
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Standard Plan</Text>
    <Text style={styles.cardDescription}>
      Enjoy basic features without adds to get started on your wellness journey.
    </Text>
    <Text style={styles.cardPrice}>$2.99/month</Text>
    <TouchableOpacity
      style={styles.cardButton}
      onPress={() =>
        Alert.alert(
          "Subscription Successful",
          "You have subscribed to the Standard Plan!",
          [{ text: "OK", onPress: () => console.log("Standard Plan confirmed") }]
        )
      }
    >
      <Text style={styles.cardButtonText}>Subscribe</Text>
    </TouchableOpacity>
  </View>

  {/* Premium Plan Card */}
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Premium Plan</Text>
    <Text style={styles.cardDescription}>
      Unlock all features, advanced analytics and exclusive content.
    </Text>
    <Text style={styles.cardPrice}>$4.99/month</Text>
    <TouchableOpacity
      style={styles.cardButton}
      onPress={() =>
        Alert.alert(
          "Subscription Successful",
          "You have subscribed to the Premium Plan!",
          [{ text: "OK", onPress: () => console.log("Premium Plan confirmed") }]
        )
      }
    >
      <Text style={styles.cardButtonText}>Subscribe</Text>
    </TouchableOpacity>
  </View>
</View>

        <Payment />
        <TouchableOpacity
  style={{
    backgroundColor: "#8DBBA8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  }}
  onPress={() =>
    Alert.alert("Payment Successful", "Thank you for your payment!", [
      { text: "OK", onPress: () => console.log("Payment confirmed") },
    ])
  }
>
  <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>
    Pay Now
  </Text>
</TouchableOpacity>;
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light pastel blue background
  },
  scrollContainer: {
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#8DBBA8", // Subtle green border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  editImageText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#8DBBA8", // Calming blue text
  },
  fieldContainer: {
    backgroundColor: "#FFFFFF", // Card background
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333", // Dark text for readability
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: "#4A4A4A",
    flex: 1,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#C5CAE9",
    padding: 4,
    color: "#333333",
  },
  editButton: {
    backgroundColor: "#8DBBA8", // Vibrant blue
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  subscriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
     textAlign: "center"
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 16,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8DBBA8",
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: "#8DBBA8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  
});
