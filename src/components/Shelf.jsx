import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import shelfStyles from '../styles/components/shelfStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils/constants';
import yesOrNoAlert from '../utils/yesOrNoAlert';
import {okAlert} from '../utils/okAlert';
import endpointComposer from '../utils/endpoinComposer';
import {useDispatch, useSelector} from 'react-redux';
import {setShelves, setIsDeletingShelf} from '../../redux/notebookShelfStore';

const Shelf = ({shelfName, navigation, shelfId}) => {
  const dispatch = useDispatch();
  const {shelves} = useSelector(state => state.notebookShelf);

  const handleDeleteShelf = async () => {
    try {
      let composedEndpoint = endpointComposer('shelf/delete-shelf');
      dispatch(setIsDeletingShelf(true));
      const response = await fetch(composedEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelfName: shelfName,
        }),
      });
      dispatch(setIsDeletingShelf(false));

      if (response.ok) {
        const updatedShelves = shelves.filter(shelf => shelf !== shelfName);
        console.log(updatedShelves);
        dispatch(setShelves(updatedShelves));
        okAlert('Success', `${shelfName} deleted successfully`);
        console.log(`Shelf ${shelfId} deleted successfully`);
      } else {
        console.error('Error:', response.statusText);
        throw new Error('Failed to delete shelf');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      throw error;
    }
  };

  return (
    <TouchableOpacity
      style={shelfStyles.shelf}
      onPress={() => {
        navigation.navigate('Shelf', {shelfId, shelfName});
      }}>
      <View style={shelfStyles.shelfNameView}>
        <Text style={shelfStyles.shelfName}>{shelfName}</Text>
      </View>
      <View style={shelfStyles.shelfDeleteView}>
        <TouchableOpacity
          style={shelfStyles.shelfEdit}
          onPress={() => {
            navigation.navigate('ShelfCreateUpdate', {
              intent: 'Update',
              shelfName: shelfName,
            });
          }}>
          <FontAwesome5 name="edit" size={30} color={Colors.blue1} />
        </TouchableOpacity>
      </View>
      <View style={shelfStyles.shelfDeleteView}>
        <TouchableOpacity
          style={shelfStyles.shelfDelete}
          onPress={() => {
            yesOrNoAlert(
              'Warning',
              'Are you sure you want to delete this shelf',
              async () => {
                await handleDeleteShelf();
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
