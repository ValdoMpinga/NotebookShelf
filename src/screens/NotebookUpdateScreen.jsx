import {View, Text, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {okAlert} from '../utils/okAlert';
import endpointComposer from '../utils/endpoinComposer';
import {Colors} from '../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import shelfCreateUpdateStyles from '../styles/screens/shelfCreateUpdateStyles';
import {TextInput} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import {setNotebook} from '../../redux/notebookShelfStore';
const NotebookUpdateScreen = ({navigation, route}) => {
  const {notebookName, shelfName} = route.params;
  const [inputNotebookName, setInputNotebookName] = useState('');
  const [isPostLoading, setIsPostLoading] = useState(false);

  const {notebooks} = useSelector(state => state.notebookShelf);
  const dispatch = useDispatch();

  const handleNotebookUpdate = async () => {
    try {
      let composedEndpoint = endpointComposer('notebook/rename-notebook');

      console.log(composedEndpoint);
      setIsPostLoading(true);
      const response = await fetch(composedEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelfName: shelfName,
          oldNotebook: notebookName,
          newNotebook: inputNotebookName,
        }),
      });

      // Handle response as needed
      const responseData = await response.json();
      console.log('Response data:', responseData);
      setIsPostLoading(false);

      const updatedNotebooks = notebooks.map(notebook =>
        notebook === notebookName ? inputNotebookName : notebook,
      );

      dispatch(setNotebook(updatedNotebooks));
      okAlert('Success', 'Notebook updated successfully', () => {
        navigation.goBack();
      });

      // Navigate or perform actions based on the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setInputNotebookName(notebookName);
  }, [notebookName]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Notebook Rename</Text>
      <View style={shelfCreateUpdateStyles.shelfNameView}>
        <View style={globalStyles.textInputView}>
          <TextInput
            label="Notebook name"
            value={inputNotebookName}
            onChangeText={text => setInputNotebookName(text)} // Update state with input value
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>
      </View>
      {isPostLoading && (
        <View style={globalStyles.overlay}>
          <ActivityIndicator size={40} color={Colors.orange} />
        </View>
      )}

      <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
        <CustomButton
          onPress={handleNotebookUpdate} // Call the function to handle the POST request
          title={'Update'}
          customButtonStyle={{
            backgroundColor: Colors.white,
            borderColor: Colors.blue1,
            marginTop: 30,
          }}
          customTextStyle={{color: Colors.blue1, fontSize: 18}}
        />
      </View>
    </View>
  );
};

export default NotebookUpdateScreen;
