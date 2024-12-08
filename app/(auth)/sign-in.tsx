import {
  Alert,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { useState } from "react";
import { images } from "../../constants";
import CustomButton from "../components/CustomButton";
import { Link, Redirect, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
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
          <View className="w-full justify-center min-h-[85vh] px-4 my-3">
            {/* <Image
            source={require('../../assets/brain.png')}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          ></Image> */}
            <Text className="text-2xl text-black mt-1 font-psemibold pt-5">
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
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7 bg-cyan-900"
              isLoading={isSubmitting}
              textStyles="text-white"
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg text-white font-psemibold" // text-white for white text
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
