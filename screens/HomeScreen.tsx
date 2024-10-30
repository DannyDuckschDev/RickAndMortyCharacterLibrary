// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useLikedCharactersStore } from '../stores/useLikedCharactersStore';
import { Ionicons } from '@expo/vector-icons';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};


export default function HomeScreen({ navigation }: Props) {
    const likedCharacters = useLikedCharactersStore((state) => state.likedCharacters); // Access liked characters
    const { removeCharacter } = useLikedCharactersStore(); //Access removeCharacter from zustand store

    const toggleLike = (characterId: number) => {
        removeCharacter(characterId); //Remove character if unliked
    };

    return (
    <View style={styles.container}>
      {/* Heading for liked characters */}
      <Text style={styles.heading}>Liked Characters</Text>

        {/* Conditional rendering for liked characters or empty state */}
        {likedCharacters.length === 0 ? (
            <Text style={styles.emptyMessage}>
                You have no liked characters yet.
            </Text>
        ) : (
            <FlatList
                data={likedCharacters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.statusContainer}>
                        <View
                        style={[
                            styles.statusDot,
                            {
                            backgroundColor:
                                item.status === 'Alive' ? 'green' :
                                item.status === 'Dead' ? 'red' : 'gray',
                            },
                        ]}
                        />
                        <Text style={styles.status}>{item.status}</Text>
                    </View>
                    {/*Like/Unlike Button */}
                    <TouchableOpacity
                        style={styles.likeButton}
                        onPress={() => toggleLike(item.id)}
                    >
                        <Ionicons 
                            name="thumbs-up" 
                            size={25}
                            color="lightgreen"
                        />
                    </TouchableOpacity>
                    </View>
                )}
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
    },card: {
        flex: 1,
        backgroundColor: '#3c3e44',
        padding: 15,
        margin: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
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
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 6,
        marginRight: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    status: {
        fontSize: 15,
        color: 'grey',
    },
    likeButton: {
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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