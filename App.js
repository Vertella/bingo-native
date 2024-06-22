// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BingoCardScreen from './screens/BingoCardScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BingoCard">
        <Stack.Screen name="BingoCard" component={BingoCardScreen} options={{ title: 'Bingo Card' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
