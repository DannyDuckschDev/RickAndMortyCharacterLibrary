// stores/useLikedCharactersStore.ts
import { create } from 'zustand'; 
import { StateCreator } from 'zustand'; 
import { Character, LikedCharactersStore } from '../types';



// Define a creator function for our zustand store with explicit types
const likedCharactersStore: StateCreator<LikedCharactersStore> = (set) => ({
  likedCharacters: [], // Initialize likedCharacters as an empty array

  // Function to add a character ID to likedCharacters
  addCharacter: (character: Character) =>
    set((state) => ({
      likedCharacters: [...state.likedCharacters, character],
    })),

  // Function to remove a character ID from likedCharacters
  removeCharacter: (characterId: number) =>
    set((state) => ({
      likedCharacters: state.likedCharacters.filter((char) => char.id !== characterId),
    })),
});

//Create the zustand store using the typed creator function
export const useLikedCharactersStore = create(likedCharactersStore);
