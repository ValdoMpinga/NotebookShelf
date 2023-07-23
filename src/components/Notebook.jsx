import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import notebookStyle from '../styles/components/notebookStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../utils/constants';

const Notebook = ({notebookName, numberOfPages}) => {
  return (
    <TouchableOpacity>
      <View style={notebookStyle.container}>
        <View style={notebookStyle.notebookNameView}>
          <Text style={notebookStyle.notebookName}>{notebookName}</Text>
        </View>
        <View style={notebookStyle.notebookPagesView}>
          <Text style={notebookStyle.notebookPages}>{numberOfPages} pages</Text>
        </View>
        <View style={notebookStyle.notebookEditDelete}>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome5 name="edit" size={30} color={Colors.blue1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="delete" size={33} color={Colors.red} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notebook;
