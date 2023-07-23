import {View, Text} from 'react-native';
import React, {useState} from 'react';
import saveScanStyles from '../styles/screens/saveScanStyles';
import globalStyle from '../styles/components/globalStyle';
import {TextInput} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import Colors from '../utils/constants';
import DropDown from 'react-native-paper-dropdown';

export default function SaveScanScreen() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const genderList = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.title}>Scan Review</Text>

      <View style={saveScanStyles.controls}>
        <View style={globalStyles.textInputView}>
          <TextInput
            label="Index"
            value={''}
            onChangeText={() => {}}
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>

        {/* <View style={globalStyles.textInputView}> */}
          <DropDown
            label={'Gender'}
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={gender}
            setValue={setGender}
            list={genderList}
              />
          
              <DropDown
            label={'Gender'}
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={gender}
            setValue={setGender}
            list={genderList}
          />
        {/* </View> */}
      </View>

      <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
        <CustomButton
          onPress={() => {}}
          title={'Save'}
          customButtonStyle={{
            backgroundColor: Colors.white,
            borderColor: Colors.blue1,
            marginTop: 30,
          }}
          customTextStyle={{color: Colors.blue1, fontSize: 18}}
        />
      </View>
    </View>
  );
}
