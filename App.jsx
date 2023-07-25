import React from 'react';
import {Provider} from 'react-redux';
import Store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Colors from './src/utils/constants';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ShelfScreen from './src/screens/ShelfScreen';
import ShelfCreateUpdateScreen from './src/screens/ShelfCreateUpdateScreen';
import SaveScanScreen from './src/screens/SaveScanScreen';
import ScanOverviewScreen from './src/screens/ScanOverviewScreen';
import SideMenu from './src/components/SideMenu';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
  },
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() =>
        {
          // props.navigation.navigate('Home')
        }}
      />
      <DrawerItem
        label="Settings"
        onPress={() =>
        {
          // props.navigation.navigate('Settings')
        }}
      />
      {/* Add more menu items as needed */}
    </DrawerContentScrollView>
  );
};

function App() {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Home"
              drawerContent={props => <SideMenu {...props} />}>
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: true,
                  headerStyle: { backgroundColor: Colors.blue2}
                }}
              />
              {/* Add other screens here */}
              {/* <Drawer.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
              {/* <Drawer.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} /> */}
            </Drawer.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}

export default App;
