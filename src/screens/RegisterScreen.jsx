import {View, Text, TouchableOpacity} from 'react-native';
import globalStyles from '../styles/components/globalStyle';
import registerStyles from '../styles/screens/registerStyles';
import Logo from '../components/Logo';
import {TextInput} from 'react-native-paper';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {Colors} from '../utils/constants';
import GoogleLogo from '../components/GoogleLogo';

const RegisterScreen = () => {
  return (
    <View style={registerStyles.container}>
      <View style={registerStyles.logoView}>
        <Logo />
      </View>
      <View style={registerStyles.registerView}>
        <Text style={registerStyles.register}>Register</Text>
      </View>
      <View style={registerStyles.controlsView}>
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

        <View style={globalStyles.textInputView}>
          <TextInput
            label="Confirm Password"
            value={''}
            onChangeText={() => {}}
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>

        <CustomButton
          onPress={() => {}}
          title={'Register'}
          customButtonStyle={{
            backgroundColor: Colors.white,
            borderColor: Colors.red,
            marginTop: 30,
          }}
          customTextStyle={{color: Colors.red, fontSize: 18}}
        />
      </View>

      <View style={registerStyles.registerOptionsView}>
        <Text style={registerStyles.registerOption}>Or register with:</Text>

        <GoogleLogo />

        <View style={{flexDirection: 'row', paddingTop: 30}}>
          <Text style={{fontSize: 18, color: Colors.white}}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity>
            <Text style={{fontSize: 18, color: Colors.orange}}>Sign in!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
