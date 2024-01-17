import {
  View,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
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
import {checkIfItemExistsInArray} from '../utils/helpers';

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
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();
      setIsPosting(false);
      dispatch(setScannedImages('EMPTY_ARRAY'));
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
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();
      setIsPosting(false);
      dispatch(setScannedImages('EMPTY_ARRAY'));
      dispatch(setTargetNotebookToAddPages(''));
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
    ip,
  } = useSelector(state => state.notebookShelf);
  const dispatch = useDispatch();
  const [inputNewNotebookName, setInputNewNotebookName] = useState('');

  const notebookOptions = notebooks.map(item => ({
    label: item.charAt(0).toUpperCase() + item.slice(1).trim(),
    value: item.trim(),
  }));

  return (
    <KeyboardAvoidingView
      style={globalStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust the offset as needed
    >
      <View style={globalStyle.container}>
        <Text style={globalStyle.title}>Current shelf: {shelfName}</Text>
        <Text style={globalStyle.subtitle}>
          Number of pages: {scannedImagesArray.length}
        </Text>

        {isPosting ? (
          <View style={globalStyle.overlay}>
            <ActivityIndicator size={50} color={Colors.yellow} />
          </View>
        ) : (
          <>
            <View style={saveScanStyles.controls}>
              <DropdownComponent
                label={'Select saving option'}
                data={saveOptions}
                action={value => {
                  dispatch(setSaveScanToExistingBook(value));
                }}
              />
            </View>

            {saveScanToExistingBook === 2 ? (
              <View style={saveScanStyles.newNotebookInputView}>
                <TextInput
                  label="New notebook name"
                  value={inputNewNotebookName}
                  onChangeText={text => setInputNewNotebookName(text)}
                  mode="flat"
                  style={globalStyle.textInput}
                />
              </View>
            ) : saveScanToExistingBook === 1 ? (
              <View style={{flex: 2}}>
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
              </View>
            ) : (
              <></>
            )}
            <View style={saveScanStyles.saveButtonView}>
              <CustomButton
                onPress={async () => {
                  if (saveScanToExistingBook == 1) {
                    console.log(targetNotebookToAddPages);
                    if (targetNotebookToAddPages == '') {
                      okAlert('Warning', 'You must select one notebook!');
                    } else {
                      let endpoint = endpointComposer(
                        ip,
                        'notebook/add-pages-to-notebook',
                      );
                      await addPagesToExistingNotebook(
                        scannedImagesArray,
                        endpoint,
                      );
                      dispatch(setSaveScanToExistingBook(0));
                    }
                  } else if (saveScanToExistingBook == 2) {
                    if (inputNewNotebookName.length <= 3) {
                      okAlert(
                        'Warning',
                        'Shelf name must be at least 4 characters!',
                      );
                    } else {
                      if (
                        checkIfItemExistsInArray(
                          notebooks,
                          inputNewNotebookName,
                        )
                      ) {
                        okAlert('Warning', 'Notebook name already exists');
                      } else {
                        let endpoint = endpointComposer(
                          ip,
                          'notebook/create-notebook',
                        );
                        await createNotebook(scannedImagesArray, endpoint);
                        dispatch(setSaveScanToExistingBook(0));
                      }
                    }
                  } else if (saveScanToExistingBook == 0) {
                    okAlert('Warning', 'You must specify a saving option!');
                  }
                }}
                title={'Save'}
                customButtonStyle={saveScanStyles.saveButton}
                customTextStyle={{color: Colors.blue1, fontSize: 18}}
              />
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
