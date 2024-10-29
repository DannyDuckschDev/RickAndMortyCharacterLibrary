// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    // State to store liked characters (currently as an empty placeholder)
    const [likedCharacters, setLikedCharacters] = useState<string[]>([]); 

    return (
    <View style={styles.container}>
      {/* Heading for liked characters */}
      <Text style={styles.heading}>Liked Characters</Text>

        {/* Display message if there are no liked characters */}
        {likedCharacters.length === 0 ? (
            <Text style={styles.emptyMessage}>
                You have no liked characters yet.
            </Text>
        ) : (
            <FlatList
                data={likedCharacters}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text style={styles.characterName}>item</Text>}
            />
        )}
      {/* Custom button styled with TouchableOpacity for consistent look across platforms */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Overview')}
        activeOpacity={0.7} //Slightly dims button when pressed
      >
        <Text style={styles.buttonText}>Go to Overview</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#272b33', 
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10, // Space below heading
        color: 'white',
    },
    emptyMessage: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20, // Space below empty message
    },
    characterName: {
        fontSize: 18,
        paddingVertical: 5, // Vertical padding only for even spacing
    },
    button: {
        backgroundColor: '#007AFF', //IOS-style blue color
        paddingVertical: 16, // Vertical padding for button height
        paddingHorizontal: 10, // Horizontal padding for button width
        borderRadius: 8, // Rounded corners
        alignItems: 'center',
        
    },
    buttonText: {
        color: 'white', // White text color for visibility on blue button
        fontSize: 16,
        fontWeight: 'bold',
    }
});