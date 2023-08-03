import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import shelfStyles from '../styles/components/shelfStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils/constants';
import yesOrNoAlert from '../utils/yesOrNoAlert';
import {okAlert} from '../utils/okAlert';
import endpointComposer from '../utils/endpoinComposer';

const Shelf = ({shelfName, navigation, shelfId}) => {
  return (
    <TouchableOpacity
      style={shelfStyles.shelf}
      onPress={() => {
        navigation.navigate('Shelf', {shelfId, shelfName});
      }}>
      <View style={shelfStyles.shelfNameView}>
        <Text style={shelfStyles.shelfName}>{shelfName}</Text>
      </View>
      <View style={shelfStyles.shelfEdit}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShelfCreateUpdate', {
              intent: 'Update',
              shelfName: shelfName
            });
          }}>
          <FontAwesome5 name="edit" size={30} color={Colors.blue1} />
        </TouchableOpacity>
      </View>
      <View style={shelfStyles.shelfDelete}>
        <TouchableOpacity
          onPress={() => {
            yesOrNoAlert(
              'Warning',
              'Are you sure you want to delete this shelf',
              async () => {
                let composedEndpoint = endpointComposer('delete-shelf');

                const response = await fetch(composedEndpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    shelfName: shelfName,
                  }),
                });
                okAlert('Success', `${shelfName} deleted successfully`);
                console.log(`Shelf ${shelfId} deleted successfully`);
              },
            );
          }}>
          <AntDesign name="delete" size={33} color={Colors.red} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Shelf;
