//Backup DetailScreen.tsx
// screens/DetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const { characterId } = route.params; // Retrieve character ID from route params
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch character details using character ID
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching character details:", error);
        setLoading(false);
      });
  }, [characterId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />;
  }

  if (!character) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Character details not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>

      <View style={styles.detailContainer}>
        {/* Status */}
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{character.status}</Text>
        </View>

        {/* Species */}
        <View style={styles.row}>
          <Text style={styles.label}>Species:</Text>
          <Text style={styles.value}>{character.species}</Text>
        </View>

        {/* Last Known Location */}
        <View style={styles.row}>
          <Text style={styles.label}>Last Known Location:</Text>
          <Text style={styles.value}>{character.location?.name}</Text>
        </View>

        {/* First Seen In */}
        <View style={styles.row}>
          <Text style={styles.label}>First Seen In:</Text>
          <Text style={styles.value}>{character.episode[0]?.name || "Unknown"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#272b33',
    alignItems: 'center',
    paddingBottom: 40,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  detailContainer: {
    alignSelf: 'flex-start', // Align details to start of screen
    paddingHorizontal: 20,
    marginLeft: 20,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a9a9a9', // Darker gray for labels
  },
  value: {
    fontSize: 16,
    color: 'white', // White text for values
    paddingTop: 7,
  },
});
