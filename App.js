import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import {Screen1} from './screens/screen1';



export default function App() {

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Screen1"
            component={Screen1}
            options={{ title: 'Screen1',headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </PersistGate>
  </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
