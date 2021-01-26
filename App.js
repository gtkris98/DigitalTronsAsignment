import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import SlotPicker from './src/pages/slotPicker'
import BookSlot from './src/pages/bookSlot'
import Gallery from './src/pages/gallery'



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SlotPicker} options={{ headerShown: false }}/>
        <Stack.Screen name="BookSlot" component={BookSlot} options={{ title : "Book Slot" }}/>
        <Stack.Screen name="Gallery" component={Gallery} options={{ title : "Gallery" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

