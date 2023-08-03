import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import loginStyles from '../styles/screens/loginStyles';
import Logo from '../components/Logo';
import {TextInput} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import {Colors} from '../utils/constants';
import GoogleLogo from '../components/GoogleLogo';
import globalStyles from '../styles/components/globalStyle';

const LoginScreen = () => {
  return (
    <View style={loginStyles.container}>
      <View style={globalStyles.logoView}>
        <Logo />
      </View>
      <View style={loginStyles.loginView}>
        <Text style={loginStyles.login}>Login</Text>
      </View>
      <View style={loginStyles.controlsView}>
        <View style={globalStyles.textInputView}>
          <TextInput
            label="Email"
            value={''}
            onChangeText={() => {}}
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>

        <View style={globalStyles.textInputView}>
          <TextInput
            label="Password"
            value={''}
            onChangeText={() => {}}
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>

        <CustomButton
          onPress={() => {}}
          title={'Login'}
          customButtonStyle={{
            backgroundColor: Colors.white,
            borderColor: Colors.red,
            marginTop: 30,
          }}
          customTextStyle={{color: Colors.red, fontSize: 18}}
        />
      </View>
      <View style={loginStyles.loginOptionsView}>
        <Text style={loginStyles.loginOption}>Or login with:</Text>

        <GoogleLogo />

        <View style={{flexDirection: 'row', paddingTop: 30}}>
          <Text style={{fontSize: 18, color: Colors.white}}>
            Dont have an account?{' '}
          </Text>
          <TouchableOpacity>
            <Text style={{fontSize: 18, color: Colors.orange}}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
