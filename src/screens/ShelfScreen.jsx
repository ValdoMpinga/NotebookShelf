import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import {setNotebook} from '../../redux/notebookShelfStore';
import {supabase} from '../database/connection';
import {useDispatch, useSelector} from 'react-redux';
import FloatingButton from '../components/FloatingButton';
import Notebook from '../components/Notebook';
import shelfScreenStyles from '../styles/screens/shelfScreenStyles';
import {setScannedImages} from '../../redux/notebookShelfStore';
import DocumentScanner from 'react-native-document-scanner-plugin';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import endpointComposer from '../utils/endpoinComposer';

const ShelfScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const dispatch = useDispatch();
  const {shelfId, shelfName} = route.params;
  const {notebooks} = useSelector(state => state.notebookShelf);

  const onChangeSearch = query => setSearchQuery(query);

  const renderShelf = ({item}) => (
    <Notebook notebookName={item} numberOfPages={0} notebookId={uuidv4()} shelfName={shelfName} />
  );

  const scanDocument = async () => {
    try {
      // start the document scanner
      const {scannedImages} = await DocumentScanner.scanDocument();
      dispatch(setScannedImages(scannedImages[0]));
    } catch (e) {
      console.log('some error occured:');
      console.log(e);
    }
  };

  useEffect(() => {
    getDropboxNotebooks('list-files-in-folder');
  }, []);


  async function getDropboxNotebooks(endpoint) {
    try {
      let composedEndpoint = endpointComposer(endpoint);
      console.log(composedEndpoint);
      const response = await fetch(composedEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelfName: shelfName,
        }),
      });

      // Log the response status
      console.log('Response Status:', response.status);

      if (response.ok) {
        const responseData = await response.json(); // Change to .json() if the response is JSON
        console.log('Processed Data:', responseData.fileNames);
        console.log('Processed Data:', typeof responseData.fileNames);
        const notebooks = responseData.fileNames.map(
          element => element.split('_notebook')[0],
        );

        dispatch(setNotebook(notebooks));

        return responseData; // Return the data if needed
      } else {
        console.error('Error:', response.statusText);
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error; // Re-throw the error to handle it at a higher level if needed
    }
  }

  return (
    <View style={shelfScreenStyles.container}>
      <View style={shelfScreenStyles.titleView}>
        <Text style={globalStyles.title}>{shelfName}</Text>
      </View>
      {notebooks.length === 0 ? (
        <>
          <Text>Empty</Text>
        </>
      ) : (
        <>
          <View style={shelfScreenStyles.searchBarView}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={homeStyles.searchBar}
            />
          </View>
          <View style={shelfScreenStyles.notebookView}>
            <FlatList
              style={shelfScreenStyles.flatlist}
              data={notebooks}
              renderItem={renderShelf}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
          <View></View>
        </>
      )}
      <FloatingButton
        iconName={'line-scan'}
        onButtonClick={async () => {
          await scanDocument();
          navigation.navigate('ScanOverview');
        }}
      />
    </View>
  );
};

export default ShelfScreen;
