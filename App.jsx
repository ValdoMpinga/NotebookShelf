import React from 'react';
import {Provider} from 'react-redux';
import Store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ShelfScreen from './src/screens/ShelfScreen';
import ShelfCreateUpdateScreen from './src/screens/ShelfCreateUpdateScreen';
import SaveScanScreen from './src/screens/SaveScanScreen';
import ScanOverviewScreen from './src/screens/ScanOverviewScreen';

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
        <GestureHandlerRootView style={{flex:1 }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="home"
                component={ScanOverviewScreen}
                options={{}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}

export default App;
