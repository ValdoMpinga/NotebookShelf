import {View, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import saveScanStyles from '../styles/screens/saveScanStyles';
import CustomButton from '../components/CustomButton';
import {Colors} from '../utils/constants';
import globalStyle from '../styles/components/globalStyle';
import DropdownComponent from '../components/DropdownComponent';
import {useSelector, useDispatch} from 'react-redux';
import {setScannedImages, setNotebook} from '../../redux/notebookShelfStore';
import {
  setSaveScanToExistingBook,
  setTargetNotebookToAddPages,
} from '../../redux/notebookShelfStore';
import {TextInput} from 'react-native-paper';
import endpointComposer from '../utils/endpoinComposer';
import {okAlert} from '../utils/okAlert';
import overlay from 'react-native-paper';

export default function SaveScanScreen({navigation, route}) {
  const createNotebook = async (imagesPaths, endpoint) => {
    setIsPosting(true);
    const formData = new FormData();
    formData.append('shelfName', shelfName);
    formData.append('notebookName', inputNewNotebookName);

    imagesPaths.forEach((imagePath, index) => {
      const fileName = `image_${index}.jpg`;
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg',
        name: fileName,
      });
    });

    try {
      // Send the formData with all images to the server using a single POST request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();
      setIsPosting(false);
      dispatch(setScannedImages([]));
      okAlert(
        'Success',
        `${inputNewNotebookName} notebook created successfully!`,
        () => {
          navigation.navigate('Shelf', {shelfName: shelfName});
          dispatch(setNotebook([...notebooks, inputNewNotebookName]));
        },
      );

      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addPagesToExistingNotebook = async (imagesPaths, endpoint) => {
    setIsPosting(true);

    const formData = new FormData();
    formData.append('shelfName', shelfName);
    formData.append('notebookName', targetNotebookToAddPages);

    imagesPaths.forEach((imagePath, index) => {
      const fileName = `image_${index}.jpg`;
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg',
        name: fileName,
      });
    });

    try {
      // Send the formData with all images to the server using a single POST request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();
      setIsPosting(false);
      dispatch(setScannedImages([]));
      okAlert('Success', `Pages added to ${targetNotebookToAddPages}`, () => {
        navigation.navigate('Shelf', {shelfName: shelfName});
      });
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveOptions = [
    {label: 'Existing notebook', value: 1},
    {label: 'New notebook', value: 2},
  ];
  const {shelfName} = route.params;

  const [isPosting, setIsPosting] = useState(false);

  const {
    saveScanToExistingBook,
    notebooks,
    targetNotebookToAddPages,
    scannedImagesArray,
  } = useSelector(state => state.notebookShelf);
  const dispatch = useDispatch();
  const [inputNewNotebookName, setInputNewNotebookName] = useState('');

  const notebookOptions = notebooks.map(item => ({
    label: item.charAt(0).toUpperCase() + item.slice(1).trim(),
    value: item.trim(),
  }));

  return (
    <View style={globalStyle.container}>
      <Text> Current shelf: {shelfName} </Text>

      <View style={saveScanStyles.controls}>
        <DropdownComponent
          label={'Select saving option'}
          data={saveOptions}
          action={value => {
            dispatch(setSaveScanToExistingBook(value));
          }}
        />
      </View>

      {isPosting && (
        <View style={globalStyle.overlay}>
          <ActivityIndicator size={50} color={Colors.blue3} />
        </View>
      )}

      {saveScanToExistingBook ? (
        <>
          <View style={globalStyle.textInputView}>
            <TextInput
              label="New notebook name"
              value={inputNewNotebookName}
              onChangeText={text => setInputNewNotebookName(text)}
              mode="outlined"
              style={globalStyle.textInput}
            />
          </View>
        </>
      ) : (
        <>
          {notebooks.length > 0 ? (
            <DropdownComponent
              label={'Select notebook to add pages'}
              data={notebookOptions}
              action={value => {
                dispatch(setTargetNotebookToAddPages(value));
              }}
            />
          ) : (
            <Text> There is no notebook on this shelf.</Text>
          )}
        </>
      )}
      <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
        <CustomButton
          onPress={async () => {
            if (saveScanToExistingBook == 1) {
              let endpoint = endpointComposer('notebook/add-pages-to-notebook');
              await addPagesToExistingNotebook(scannedImagesArray, endpoint);
            } else if (saveScanToExistingBook == 2) {
              let endpoint = endpointComposer('notebook/create-notebook');
              await createNotebook(scannedImagesArray, endpoint);
            }
          }}
          title={'Save'}
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
}
