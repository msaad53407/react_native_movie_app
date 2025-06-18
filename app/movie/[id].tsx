import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const DetailsPage = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>DetailsPage for movie {id}</Text>
        </View>
    )
}

export default DetailsPage