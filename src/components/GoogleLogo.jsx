import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Assuming you have FontAwesome icons available
import Colors from '../utils/constants';

const GoogleLogo = () => {
  return (
    <TouchableOpacity s style={{marginTop: 30}} onPress={() => {}}>
      <Icon name="google" size={60} color={Colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GoogleLogo;
