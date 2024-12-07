import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";

interface FormFieldProps {
  title?: string;
  value?: string;
  placeholder?: string;
  keyboardType?:
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "default"
    | "url"
    | "decimal-pad";
  handleChangeText?: (e: string) => void;
  otherStyles?: string;
}

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "#b2ebf2", // Light pastel blue border
        width: "100%",
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: "#ffffff", // White background
        borderRadius: 16,
        alignItems: "center",
        //space: 16,
      }}
    >
      <TextInput
        style={{
          marginTop: 2,
          flex: 1,
          color: "#333", // Dark text for contrast
          fontFamily: "Poppins-Regular", // Replace with your font family
          fontSize: 16,
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B" // Grayish placeholder text
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        keyboardType={keyboardType}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
