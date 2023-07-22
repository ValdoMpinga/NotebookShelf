import {View, Text} from 'react-native';
import React from 'react';
import loginStyles from '../styles/loginStyle';
import Logo from '../components/Logo';
import {TextInput} from 'react-native-paper';

const LoginScreen = () => {
  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.logoView}>
        <Logo />
      </View>
      <View style={loginStyles.loginView}>
        <Text style={loginStyles.login}>Login</Text>
      </View>
      <View style={loginStyles.controlsView}>
        <TextInput
          label="Email"
          value={''}
          onChangeText={() => {}}
          mode="outlined"
        />

        <TextInput
                  label="Password"
                  value={''}
                  onChangeText={() => { }}
                  mode="outlined"
                  right={<TextInput.Affix text="/100" />}
        />
      </View>
      <View style={loginStyles.loginOptionsView}></View>
    </View>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
