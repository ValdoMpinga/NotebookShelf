import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../utils/constants';
const Logo = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 24,
          color: Colors.orange,
          fontFamily: 'Monaco',
        }}>
        Notebook
      </Text>
      <Text
        style={{
          fontSize: 24,
          color: Colors.red,
          fontFamily: 'Monaco',
        }}>
        Shelf
      </Text>
    </View>
  );
};

export default Logo;
