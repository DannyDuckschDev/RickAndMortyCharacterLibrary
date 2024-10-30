// screens/OverviewScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Character, RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useLikedCharactersStore } from '../stores/useLikedCharactersStore';

type OverviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Overview'>;

type Props = {
  navigation: OverviewScreenNavigationProp;
};

// Utility function to calculate columns based on screen width
const getNumColumns = () =>  {
    const screenWidth = Dimensions.get('window').width;
    if (screenWidth > 1400) return 4; // Extra large screens
    if (screenWidth > 1000) return 3;  // Large screens
    if (screenWidth > 600) return 2;   // Medium screens
    return 1;                          // Small screens, such as mobile
};

export default function OverviewScreen({ navigation }: Props) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numColumns, setNumColumns] = useState(getNumColumns());

  const { likedCharacters, addCharacter, removeCharacter} = useLikedCharactersStore(); //Access liked characers from zustand store

  useEffect(() => {
    const handleResize = () => setNumColumns(getNumColumns());
    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load characters.');
        setLoading(false);
      });
  }, []);

  //Toogle like/unlike functionality
  const toggleLike = (character: Character) => {
    if (likedCharacters.some((char) => char.id === character.id)) {
      removeCharacter(character.id); //If already liked, remove it
    } else {
      addCharacter(character); // Otherwise, add the full characters data
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Character Overview</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={characters}
          key={numColumns} //Add key prop to force re-render on numColumns change
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
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
              <View style={styles.buttonContainer}>
                {/*Like Button*/}
                <TouchableOpacity 
                  style={styles.likeButton} 
                  onPress={() => toggleLike(item)}
                >
                  <Ionicons 
                    name={likedCharacters.some((char) => char.id === item.id) ? "thumbs-up" : "thumbs-up-outline"} 
                    size={21} 
                    color="white" 
                    style={styles.icon}
                  />
                </TouchableOpacity>
                {/*Details Button*/}
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate('Detail', { characterId: String(item.id) })}
                >
                  <Text style={styles.buttonText}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

// StyleSheet for organized styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#272b33',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});
