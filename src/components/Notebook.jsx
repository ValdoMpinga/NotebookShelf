import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import notebookStyle from '../styles/components/notebookStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../utils/constants';
import yesOrNoAlert from '../utils/yesOrNoAlert';
import {okAlert} from '../utils/okAlert';
import endpointComposer from '../utils/endpoinComposer';

const Notebook = ({notebookName, numberOfPages, notebookId, shelfName, navigation}) => {
  return (
    <TouchableOpacity onPress={() =>
    {
      navigation.navigate('NotebookView',{shelfName:shelfName,notebookName: notebookName });
    }}>
      <View style={notebookStyle.container}>
        <View style={notebookStyle.notebookNameView}>
          <Text style={notebookStyle.notebookName}>{notebookName}</Text>
        </View>
        {/* <View style={notebookStyle.notebookPagesView}>
          <Text style={notebookStyle.notebookPages}>{numberOfPages} pages</Text>
        </View> */}
        <View style={notebookStyle.notebookEditDelete}>
          <TouchableOpacity onPress={() =>
          {
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
                  let composedEndpoint = endpointComposer('delete-notebook');

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
