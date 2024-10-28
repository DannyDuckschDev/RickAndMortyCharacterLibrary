// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import OverviewScreen from './screens/OverviewScreen';
import DetailScreen from './screens/DetailScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Overview" component={OverviewScreen} options={{ title: 'Overview' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Character Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
