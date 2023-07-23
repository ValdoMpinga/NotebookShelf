import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import shelfStyles from '../styles/components/shelfStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/constants';

const Shelf = ({shelfName}) => {
  return (
    <View style={shelfStyles.shelf}>
      <View style={shelfStyles.shelfNameView}>
        <Text style={shelfStyles.shelfName}>{shelfName}</Text>
      </View>
      <View style={shelfStyles.shelfEdit}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome5 name="edit" size={30} color={Colors.blue1} />
        </TouchableOpacity>
      </View>
      <View style={shelfStyles.shelfDelete}>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="delete" size={33} color={Colors.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shelf;
