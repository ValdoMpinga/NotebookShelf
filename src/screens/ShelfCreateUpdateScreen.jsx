import {View, Text} from 'react-native';
import React from 'react';
import globalStyles from '../styles/components/globalStyle';
import {TextInput} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import Colors from '../utils/constants';
import shelfCreateUpdateStyles from '../styles/screens/shelfCreateUpdateStyles';

const ShelfCreateUpdateScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Create Or Update</Text>
      <View style={shelfCreateUpdateStyles.shelfNameView}>
        <View style={globalStyles.textInputView}>
          <TextInput
            label="Shelf name"
            value={''}
            onChangeText={() => {}}
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>
      </View>

      <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
        <CustomButton
          onPress={() => {}}
          title={'Create or Update'}
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
};

export default ShelfCreateUpdateScreen;
