import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screen/SearchScreen';
import MovieDetailScreen from '../screen/MovieDetailScreen';
import Home from '../screen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function SearchNavigation() {
  return (
  
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SearchResults" component={MovieDetailScreen}  options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}
