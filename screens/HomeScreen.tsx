// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useLikedCharactersStore } from '../stores/useLikedCharactersStore';
import { Ionicons } from '@expo/vector-icons';
import { useResponsiveColumns } from '../utils/screenUtils';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    const likedCharacters = useLikedCharactersStore((state) => state.likedCharacters);
    const { removeCharacter } = useLikedCharactersStore();

    const { numColumns, cardMaxWidth } = useResponsiveColumns();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Liked Characters</Text>
            {likedCharacters.length === 0 ? (
                <Text style={styles.emptyMessage}>You have no liked characters yet.</Text>
            ) : (
                <FlatList
                    data={likedCharacters}
                    key={numColumns}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={numColumns}
                    renderItem={({ item }) => (
                        <View style={[styles.card, { maxWidth: cardMaxWidth }]}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.name}>{item.name}</Text>
                            
                            {/* Red "X" Button for Removing Character */}
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeCharacter(item.id)}
                            >
                                <Ionicons name="close" size={30} color="red" />
                            </TouchableOpacity>
                            
                        </View>
                    )}
                />
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Overview')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Go to Overview</Text>
                </TouchableOpacity>
            </View>
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
        color: 'white',
        marginBottom: 20,
    },
    emptyMessage: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#3c3e44',
        padding: 15,
        margin: 5,
        borderRadius: 8,
        position: 'relative', // Allows positioning of remove button
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    removeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 0, 0, 0.4)', // Light red background for the remove button
        padding: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'red', // Dark red border for the remove button
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 320,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
