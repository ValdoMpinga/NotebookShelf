import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import notebookStyle from '../styles/components/notebookStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils/constants';
import yesOrNoAlert from '../utils/yesOrNoAlert';
import {setIsDeletingNotebook, setNotebook} from '../../redux/notebookShelfStore';
import {useDispatch, useSelector} from 'react-redux';
import {okAlert} from '../utils/okAlert';
import endpointComposer from '../utils/endpoinComposer';

const Notebook = ({
  notebookName,
  numberOfPages,
   shelfName,
  navigation,
}) => {
  const dispatch = useDispatch();
  const {notebooks} = useSelector(state => state.notebookShelf);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NotebookView', {
          shelfName: shelfName,
          notebookName: notebookName,
        });
      }}>
      <View style={notebookStyle.container}>
        <View style={notebookStyle.notebookNameView}>
          <Text style={notebookStyle.notebookName}>{notebookName}</Text>
        </View>
        <View style={notebookStyle.notebookEditDelete}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NotebookUpdate', {
                notebookName: notebookName,
                navigation: navigation,
                shelfName: shelfName,
              });
            }}>
            <FontAwesome5 name="edit" size={30} color={Colors.blue1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              yesOrNoAlert(
                'Warning',
                'Are you sure you want to delete this notebook',
                async () => {
                  dispatch(setIsDeletingNotebook(true));
                  let composedEndpoint = endpointComposer('notebook/delete-notebook');

                  const response = await fetch(composedEndpoint, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      shelfName: shelfName,
                      notebookName: notebookName,
                    }),
                  });
                  const updatedNotebooks = notebooks.filter(
                    notebook => notebook !== notebookName,
                  );  
                  
                  dispatch(setNotebook(updatedNotebooks));
                  dispatch(setIsDeletingNotebook(false));

                  okAlert('Success', `${notebookName} deleted successfully`);
                },
              );
            }}>
            <AntDesign name="delete" size={33} color={Colors.red} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notebook;
