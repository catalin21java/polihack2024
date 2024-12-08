import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { useState } from "react";
import { images } from "../../constants";
import { StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link, router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <SafeAreaView className=" h-full" style={{ backgroundColor: "#a5d6e8" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-4">
            {/* <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'></Image> */}
            <Text className="text-2xl text-black mt-10 font-psemibold pt-5">
              Username
            </Text>
            <FormField
              title=""
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-1"
            />
            <Text className="text-2xl text-black mt-10 font-psemibold pt-5">
              Email
            </Text>
            <FormField
              title=""
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-1"
              keyboardType="email-address"
            />
            <Text className="text-2xl text-black mt-10 font-psemibold pt-5">
              Password
            </Text>
            <FormField
              title=""
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-1"
            />
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7 bg-black"
              isLoading={isSubmitting}
              textStyles="text-white"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignUp;
