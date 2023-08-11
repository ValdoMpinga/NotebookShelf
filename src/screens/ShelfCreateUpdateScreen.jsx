import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import globalStyles from '../styles/components/globalStyle';
import CustomButton from '../components/CustomButton';
import {Colors} from '../utils/constants';
import endpointComposer from '../utils/endpoinComposer';
import {okAlert} from '../utils/okAlert';
import {setShelves} from '../../redux/notebookShelfStore';
import { checkIfItemExistsInArray } from '../utils/helpers';
import shelfCreateUpdateStyles from '../styles/screens/shelfCreateUpdateStyles';

const ShelfCreateUpdateScreen = ({navigation, route}) => {
  const {intent, shelfName} = route.params;

  const [isPostLoading, setIsPostLoading] = useState(false);
  const dispatch = useDispatch();
  const {shelves, ip} = useSelector(state => state.notebookShelf);

  const [inputShelfName, setInputShelfName] = useState('');

  const handleCreateOrUpdate = async () => {
    setIsPostLoading(true);

    if (inputShelfName.length <= 3) {
      okAlert('Warning', 'Shelf name must be at least 4 characters!');
    } else {
      try {
        let composedEndpoint;
        let body;

        if (intent === 'Create') {
          if (checkIfItemExistsInArray(shelves,inputShelfName)) {
            okAlert('Warning', 'Shelf name already exists!');
            setIsPostLoading(false);
            return;
          } else {
            composedEndpoint = endpointComposer(ip, 'shelf/create-shelf');
            body = {
              shelfName: inputShelfName,
            };
          }
        } else if (intent === 'Update') {
          if (checkIfItemExistsInArray(shelves, inputShelfName)) {
            okAlert('Warning', 'Shelf name already exists!');
            setIsPostLoading(false);
            return;
          } else {
            composedEndpoint = endpointComposer(ip, 'shelf/update-shelf');
            body = {
              oldShelfName: shelfName,
              newShelfName: inputShelfName,
            };
          }
        }

        console.log(composedEndpoint);
        const response = await fetch(composedEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();
        console.log('Response data:', responseData);
        setIsPostLoading(false);

        console.log('shelves now');
        console.log(shelves);

        const updatedShelves =
          intent === 'Create'
            ? [...shelves, inputShelfName]
            : shelves.map(shelf =>
                shelf === shelfName ? inputShelfName : shelf,
              );

        dispatch(setShelves(updatedShelves));

        const successMessage =
          intent === 'Create'
            ? 'Shelf created successfully'
            : 'Shelf updated successfully';

        okAlert('Success', successMessage, () => {
          navigation.navigate('Home');
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setIsPostLoading(false);
  };

  useEffect(() => {
    if (intent === 'Update') setInputShelfName(shelfName);
  }, [intent]);

  return (
    <View style={shelfCreateUpdateStyles.container}>
      <Text style={globalStyles.title}>{intent} Shelf</Text>

      {isPostLoading ? (
        <View style={globalStyles.overlay}>
          <ActivityIndicator size={40} color={Colors.orange} />
        </View>
      ) : (
        <>
          <View style={shelfCreateUpdateStyles.shelfNameView}>
            <View style={globalStyles.textInputView}>
              <TextInput
                label="Shelf name"
                value={inputShelfName}
                onChangeText={text => setInputShelfName(text)}
                mode="flat"
                style={globalStyles.textInput}
              />
            </View>
          </View>
          <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
            <CustomButton
              onPress={handleCreateOrUpdate}
              title={intent}
              customButtonStyle={{
                backgroundColor: Colors.white,
                borderColor: Colors.blue1,
                marginTop: 30,
              }}
              customTextStyle={{color: Colors.blue1, fontSize: 18}}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ShelfCreateUpdateScreen;
