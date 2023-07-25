import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import sideMenuItemStyles from '../styles/components/sideMenuItemStyles';

const SideMenuItem = ({icon, menuName}) => {
  return (
    <TouchableOpacity style={sideMenuItemStyles.container} activeOpacity={0.1}>
      <View style={sideMenuItemStyles.iconContainer}>{icon}</View>
      <Text style={sideMenuItemStyles.text}>{menuName}</Text>
    </TouchableOpacity>
  );
};

export default SideMenuItem;
