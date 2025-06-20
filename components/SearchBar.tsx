import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
};

const SearchBar = ({ onPress, value, onChangeText }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' tintColor='#AB8BFF' resizeMode='contain' />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholder='Search for movies'
        className='flex-1 ml-2 text-white'
        selectionColor='#AB8BFF'
        placeholderTextColor='#A8B5DB'
      />
    </View>
  );
};

export default SearchBar;
