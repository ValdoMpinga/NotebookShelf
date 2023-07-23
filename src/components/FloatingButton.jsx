import React from 'react';
import {  TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import floatingButtonStyles from '../styles/components/floatingButtonStyles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FloatingButton = () => {
  return (
      <TouchableOpacity style={floatingButtonStyles.fabButton}>
        <MaterialCommunityIcons
          name="bookshelf"
          size={35}
          color={Colors.black} />
      </TouchableOpacity>
  );
};

export default FloatingButton;