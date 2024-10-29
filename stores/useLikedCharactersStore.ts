// stores/useLikedCharactersStore.ts
import { create } from 'zustand'; 
import { StateCreator } from 'zustand'; 

// Define the shape of our store's state and actions
type LikedCharactersStore = {
  likedCharacters: string[]; // Array to store liked character IDs
  addCharacter: (characterId: string) => void; // Function to add a character
  removeCharacter: (characterId: string) => void; // Function to remove a character
};

// Define a creator function for our zustand store with explicit types
const likedCharactersStore: StateCreator<LikedCharactersStore> = (set) => ({
  likedCharacters: [], // Initialize likedCharacters as an empty array

  // Function to add a character ID to likedCharacters
  addCharacter: (characterId: string) =>
    set((state) => ({
      likedCharacters: [...state.likedCharacters, characterId],
    })),

  // Function to remove a character ID from likedCharacters
  removeCharacter: (characterId: string) =>
    set((state) => ({
      likedCharacters: state.likedCharacters.filter((id) => id !== characterId),
    })),
});

//Create the zustand store using the typed creator function
export const useLikedCharactersStore = create(likedCharactersStore);
