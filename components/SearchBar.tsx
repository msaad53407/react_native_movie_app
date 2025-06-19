import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

type Props = {
  onPress: () => void;
};

const SearchBar = ({ onPress }: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' tintColor='#AB8BFF' resizeMode='contain' />
      <TextInput
        onPress={onPress}
        placeholder='Search for movies'
        className='flex-1 ml-2 text-white'
        selectionColor='#AB8BFF'
        placeholderTextColor='#A8B5DB'
      />
    </View>
  );
};

export default SearchBar;
