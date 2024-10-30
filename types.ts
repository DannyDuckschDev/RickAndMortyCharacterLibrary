// types.ts
export type RootStackParamList = {
    Home: undefined;       // No parameters expected
    Overview: undefined;   // No parameters expected
    Detail: { characterId: string | number }; // Example parameter for Detail screen
  };
  
export type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
};

// Define the shape of our store's state and actions
export type LikedCharactersStore = {
  likedCharacters: Character[]; // Array to store liked character objects
  addCharacter: (character: Character) => void; // Function to add a character
  removeCharacter: (characterId: number) => void; // Function to remove a character
};