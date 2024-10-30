# Rick and Morty Character App

A mobile and web application for browsing, liking, and viewing detailed information about characters from the Rick and Morty universe. Built using React Native and Zustand for state management, this app provides a responsive design to optimize the user experience across devices of varying screen sizes.

## Features

- **Character Overview**: Browse characters from the Rick and Morty universe with dynamically adjusted column layout based on screen size.
- **Liking Characters**: Add characters to a "Liked Characters" list by clicking the "thumbs-up" button in the overview screen.
- **Removing Liked Characters**: A red "X" button on each character card allows users to remove characters from their "Liked Characters" list.
- **Character Detail View**: View additional details of each character, including status, species, and location, in a responsive layout.
- **Responsive Design**: Layout dynamically adjusts based on device screen width.

## Technologies

- **React Native**: Core framework for building cross-platform applications.
- **Zustand**: Lightweight state management solution for managing liked characters.
- **Expo**: For managing and building React Native apps easily.
- **Rick and Morty API**: Source of character data.

## Setup

### Dependencies

To ensure the app functions as intended, please install the following dependencies. Here’s an explanation of each required package:

1. **react** and **react-native**: Core libraries for building the UI and logic of the React Native app.
2. **expo**: A framework and platform for universal React applications, providing a set of tools for easier app development.
3. **@react-navigation/native**: Provides basic navigation functionalities, allowing smooth transitions between screens.
4. **@react-navigation/stack**: Enables stack-based navigation (screen transitions with a back button) in the app.
5. **react-native-gesture-handler**, **react-native-reanimated**, **react-native-screens**, **react-native-safe-area-context**, **@react-native-community/masked-view**: Required dependencies for `@react-navigation` to function properly.
6. **@expo/vector-icons**: Provides access to vector icons for creating visual elements in the UI.
7. **zustand**: A lightweight state management library used for managing and sharing the app's state effectively.
8. **typescript**: Enables TypeScript support for type safety, making the codebase easier to manage and reducing potential bugs.
9. **@types/react**, **@types/react-native**, **@types/react-navigation** (and other `@types` packages): Type definitions for TypeScript, providing intellisense and type checking for the React and React Native libraries.


To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/rick-and-morty-app.git
   cd rick-and-morty-app
   ```
2. **Install dependencies**:
   
#### Core dependencies
````bash
npm install react react-native
````

#### Navigation dependencies
````bash
npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
````

#### Icons
````bash
npm install @expo/vector-icons
````

#### State management
````bash
npm install zustand
````

#### TypeScript and type definitions
````bash
npm install typescript @types/react @types/react-native @types/react-navigation
````

3. **Start the project**:
````bash
npx expo start
````
   
## Code Structure
- /screens: Contains screen components for the app, including HomeScreen and DetailScreen.
  HomeScreen: Displays a list of liked characters with an "X" button for removing characters and a button to navigate to the overview screen.
  DetailScreen: Shows detailed information about a character, styled to display side-by-side on larger screens and stacked on smaller screens.
- /stores: Contains the Zustand store for managing liked characters.
  useLikedCharactersStore: Custom hook to manage the liked characters list.
- /utils: Contains utility functions and hooks.
  screenUtils: Contains a responsive columns hook to calculate the number of columns for character grids based on screen width.

### HomeScreen
- Displays a list of liked characters with each character card containing:
  Character image, name, and a red "X" button to remove it from the liked list.
- Navigation button to the Overview screen.
- Dynamically adjusts column layout based on screen width.

### DetailScreen
- Displays character details such as status, species, and last known location.
- Responsively displays character image and details side-by-side on large screens and in a stacked layout on small screens.

### Custom Hook
#### useResponsiveColumns
- A hook located in /utils/screenUtils that calculates the appropriate number of columns for character cards based on screen size.
- Automatically adjusts on screen orientation changes for responsive layouts across devices.

### API
- Data is sourced from the Rick and Morty API.

### Design Considerations
- User-Friendly Interactions: The red "X" button visually clarifies the removal action, improving user understanding and usability.
- Responsive Design: Supports web and mobile layouts, ensuring a consistent user experience across platforms.
- Minimalist UI: Clean and clutter-free design focusing on ease of navigation and interaction


**Happy coding!**
