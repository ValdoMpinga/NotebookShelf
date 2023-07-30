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


const ShelfScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const dispatch = useDispatch();
  const {shelfId, shelfName} = route.params;
  const {notebooks} = useSelector(state => state.notebookShelf);

  const onChangeSearch = query => setSearchQuery(query);

  const renderShelf = ({item}) => (
    <Notebook
      notebookName={item.name}
      numberOfPages={item.num_pages}
      notebookId={item.id}
    />
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
    getNotebooks(supabase);
  }, []);

  async function getNotebooks(supabase) {
    const {data} = await supabase
      .from('Notebook')
      .select('*')
      .eq('shelf_id', shelfId);

    console.log(data);
    dispatch(setNotebook(data));
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
