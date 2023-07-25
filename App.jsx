import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import Store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import TutorialScreen from './src/screens/TutorialScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
  },
};

const HomeScreenOptions = ({navigation}) => ({
  headerShown: true,
  headerStyle: {backgroundColor: Colors.blue2},
  headerLeft: () => (
    <TouchableOpacity
      style={{marginTop: 2, marginRight: 12}}
      onPress={() => navigation.toggleDrawer()}>
      {/* Your custom side menu icon */}
      <Ionicons name="menu-outline" size={30} color="black" />
    </TouchableOpacity>
  ),
});

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}
      />
      <Stack.Screen
        name="Shelf"
        component={ShelfScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ScanOverview"
        component={ScanOverviewScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
          headerTitle: 'Scan Overview',
        }}
      />
      <Stack.Screen
        name="SaveScan"
        component={SaveScanScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
          headerTitle: 'Save Scan',
        }}
      />
      <Stack.Screen
        name="ShelfCreateUpdate"
        component={ShelfCreateUpdateScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
          headerTitle: 'Shelf Managment',
        }}
      />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="HomeStack"
              drawerContent={props => (
                <SideMenu {...props} navigation={props.navigation} />
              )}>
              <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{headerShown: false}}
              />
              <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Drawer.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
              />
              <Drawer.Screen
                name="Shelf"
                component={ShelfScreen}
                options={{headerShown: true}}
              />
              <Drawer.Screen
                name="Tutorial"
                component={TutorialScreen}
                options={{headerShown: false}}
              />
              <Drawer.Screen
                name="ScanOverview"
                component={ScanOverviewScreen}
                options={{headerShown: false}}
              />
              <Drawer.Screen
                name="SaveScan"
                component={SaveScanScreen}
                options={{headerShown: false}}
              />
              <Drawer.Screen
                name="ShelfCreateUpdate"
                component={ShelfCreateUpdateScreen}
                options={{headerShown: false}}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}

export default App;
