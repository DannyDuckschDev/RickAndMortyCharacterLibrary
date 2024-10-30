// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import OverviewScreen from './screens/OverviewScreen';
import DetailScreen from './screens/DetailScreen';
import { RootStackParamList } from './types';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: '#007AFF',
        }}
      
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Overview" component={OverviewScreen} options={{ title: 'Overview' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Character Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#272b33' //Dark gray header background to match the app theme
  },
  headerTitle: {
    color: '#ffffff',
  }
});