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
    species: string;
};
