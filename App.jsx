import React, {useEffect} from 'react';
import {TouchableOpacity, Platform, View} from 'react-native';
import {Provider} from 'react-redux';
import Store from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Colors} from './src/utils/constants';
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
import NotebookViewScreen from './src/screens/NotebookViewScreen';
import NotebookUpdateScreen from './src/screens/NotebookUpdateScreen';
import IP_Screen from './src/screens/IP_Screen';
import {useSelector, useDispatch} from 'react-redux';
import {okAlert} from './src/utils/okAlert';
import SplashScreen from 'react-native-splash-screen';
import {setScannedImages} from './redux/notebookShelfStore';
import yesOrNoAlert from './src/utils/yesOrNoAlert';

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
      <Ionicons name="menu-outline" size={30} color="black" />
    </TouchableOpacity>
  ),
});

const HomeStack = ({navigation}) => {
  const {ip, currentShelfName} = useSelector(state => state.notebookShelf);
  const dispatch = useDispatch();

  const handleScreensWitchScansBackPress = () => {
    yesOrNoAlert(
      'Warning',
      'Are you sure you want to go back, you will lose all of your scans, but you can remake them later!',
      () => {
        dispatch(setScannedImages('EMPTY_ARRAY'));
        console.log('back to: ' + currentShelfName);
        navigation.navigate('Shelf', {shelfName: currentShelfName});
      },
    );
    return true;
  };

  function handleIpBackPress(navigation) {
    if (ip == '') {
      okAlert(
        'Warning',
        'You cannot navigate to other without setting up a functional servel IP!',
        () => {},
      );
    } else navigation.navigate('Home');

    return true;
  }

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') SplashScreen.hide();
    }, 2000);
  });
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
          headerLeft: ({onPress, label}) => (
            <TouchableOpacity
              onPress={() => handleScreensWitchScansBackPress()}>
              <View style={{marginRight: 20}}>
                <Ionicons name="arrow-back" size={20} color="black" />
              </View>
            </TouchableOpacity>
          ),
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
      <Stack.Screen
        name="NotebookView"
        component={NotebookViewScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
          headerTitle: 'Notebook Viewer',
        }}
      />
      <Stack.Screen
        name="NotebookUpdate"
        component={NotebookUpdateScreen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
          headerTitle: 'Notebook Update',
        }}
      />
      <Stack.Screen
        name="IP"
        component={IP_Screen}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.blue2},
          headerBackTitleVisible: false,
          headerTitle: 'IP Configurarion',
          headerBackButtonMenuEnabled: true,
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{marginLeft: 12}}
              onPress={() => {
                handleIpBackPress(navigation);
              }}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
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
              )}
              screenOptions={({route}) => ({
                drawerGestureEnabled: route.name !== 'IP',
              })}>
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
