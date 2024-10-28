// screens/OverviewScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type OverviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Overview'>;

type Props = {
    navigation: OverviewScreenNavigationProp;
};

export default function OverviewScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Overview Screen</Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate('Detail', {characterId: '1'})} />
    </View>
  );
}
