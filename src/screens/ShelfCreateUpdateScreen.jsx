import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react'; // Import useState
import globalStyles from '../styles/components/globalStyle';
import {TextInput} from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import {Colors} from '../utils/constants';
import shelfCreateUpdateStyles from '../styles/screens/shelfCreateUpdateStyles';
import endpointComposer from '../utils/endpoinComposer';
import {okAlert} from '../utils/okAlert';
const ShelfCreateUpdateScreen = ({navigation, route}) => {
  const {intent,shelfName} = route.params;

  // State for the shelf name
  const [inputShelfName, setInputShelfName] = useState('');

  // Function to handle POST request
  const handleCreateOrUpdate = async () => {
    try
    {
      if (intent === 'Create')
      {
              let composedEndpoint = endpointComposer('create-shelf');

              console.log(composedEndpoint);
              const response = await fetch(composedEndpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  shelfName: inputShelfName,
                }),
              });

              // Handle response as needed
              const responseData = await response.json();
              console.log('Response data:', responseData);

              okAlert('Success', 'Shelf created successfully', () => {
                navigation.navigate('Home');
              });
      } else if (intent === 'Update')
      {
               let composedEndpoint = endpointComposer('update-shelf');

               console.log(composedEndpoint);
               const response = await fetch(composedEndpoint, {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({
                   oldShelfName: shelfName,
                   newShelfName: inputShelfName,
                 }),
               });

               // Handle response as needed
               const responseData = await response.json();
               console.log('Response data:', responseData);

               okAlert('Success', 'Shelf updated successfully', () => {
                 navigation.navigate('Home');
               });
      }


      // Navigate or perform actions based on the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() =>
  {
    if (intent === 'Update')
      setInputShelfName(shelfName);
  },[ intent])

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{intent} Shelf</Text>
      <View style={shelfCreateUpdateStyles.shelfNameView}>
        <View style={globalStyles.textInputView}>
          <TextInput
            label="Shelf name"
            value={inputShelfName}
            onChangeText={text => setInputShelfName(text)} // Update state with input value
            mode="outlined"
            style={globalStyles.textInput}
          />
        </View>
      </View>

      <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
        <CustomButton
          onPress={handleCreateOrUpdate} // Call the function to handle the POST request
          title={intent}
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

export default ShelfCreateUpdateScreen;
