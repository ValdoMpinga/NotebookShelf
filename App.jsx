import React from 'react';
import {Provider} from 'react-redux';
import Store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { PaperProvider } from 'react-native-paper';
import {
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ShelfScreen from './src/screens/ShelfScreen';


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
  },
};

function App() {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={ShelfScreen} options={{}} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
