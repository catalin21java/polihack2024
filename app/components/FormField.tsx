import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'

import {icons} from '../../constants'


interface FormFieldProps {
    title: string;
    value: string;
    placeholder?: string;
    keyboardType?: 'email-address' | 'numeric' | 'phone-pad' | 'default' | 'url' | 'decimal-pad';  
    handleChangeText: (e: string) => void;
    otherStyles: string;
}
const FormField = ({title, value, placeholder, handleChangeText, otherStyles,keyboardType,  ...props} : FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='flex-row border-2 focus:border-secondary border-black-200 w-full h-16 px-4 bg-cyan-900 rounded-2xl  items-center'>
        <TextInput className=' flex-1 text-white font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            keyboardType={keyboardType}
        />
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6 r' resizeMode='contain'/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField