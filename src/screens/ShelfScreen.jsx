import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import {setNotebook} from '../../redux/notebookShelfStore';
import {useDispatch, useSelector} from 'react-redux';
import FloatingButton from '../components/FloatingButton';
import Notebook from '../components/Notebook';
import shelfScreenStyles from '../styles/screens/shelfScreenStyles';
import {setScannedImages} from '../../redux/notebookShelfStore';
import DocumentScanner from 'react-native-document-scanner-plugin';
import endpointComposer from '../utils/endpoinComposer';
import {Colors, SCANNER_OPTIONS} from '../utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';

const ShelfScreen = ({navigation, route}) => {
  const [bounceValue] = useState(new Animated.Value(0));

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredNotebooks, setFilteredNotebooks] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const dispatch = useDispatch();
  const {shelfName} = route.params;
  const {notebooks, isDeletingNotebook, ip} = useSelector(
    state => state.notebookShelf,
  );

  const onChangeSearch = query => {
    const lowercaseQuery = query.toLowerCase();
    setSearchQuery(lowercaseQuery);

    const filtered = notebooks.filter(notebook =>
      notebook.toLowerCase().includes(lowercaseQuery),
    );
    setFilteredNotebooks(filtered);
  };

  const renderShelf = ({item}) => (
    <Notebook
      notebookName={item}
      numberOfPages={0}
      shelfName={shelfName}
      navigation={navigation}
    />
  );

  const scanDocument = async () => {
    try {
      const {scannedImages} = await DocumentScanner.scanDocument(
        SCANNER_OPTIONS
      );
      dispatch(setScannedImages(scannedImages[0]));
    } catch (e) {
      console.log('some error occured:');
      console.log(e);
    }
  };

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      {iterations: -1},
    ).start();
  };

  useEffect(() => {
    startBounceAnimation();
    getDropboxNotebooks('notebook/get-notebooks');
  }, [bounceValue]);

  async function getDropboxNotebooks(endpoint) {
    try {
      let composedEndpoint = endpointComposer(ip, endpoint);
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

      console.log('Response Status:', response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Processed Data:', responseData.fileNames);
        console.log('Processed Data:', typeof responseData.fileNames);
        const notebooks = responseData.fileNames.map(
          element => element.split('_notebook')[0],
        );

        dispatch(setNotebook(notebooks));
        setIsDataFetched(true);
        return responseData;
      } else {
        console.error('Error:', response.statusText);
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  }

  let content;

  if (!isDataFetched) {
    content = (
      <View style={globalStyles.centeredContainer}>
        <Text style={homeStyles.emptyText}>Loading notebooks...</Text>
        <ActivityIndicator size={50} color={Colors.orange} />
      </View>
    );
  } else if (isDataFetched) {
    content = (
      <View style={shelfScreenStyles.container}>
        <View style={shelfScreenStyles.titleView}>
          <Text style={globalStyles.title}>{shelfName}</Text>
        </View>
        {notebooks.length === 0 ? (
          <View style={globalStyles.centeredContainer}>
            <Text style={homeStyles.emptyText}>No notebooks created yet!</Text>
            <Animated.View style={{transform: [{scale: bounceValue}]}}>
              <Entypo name="book" size={40} color="black" />
            </Animated.View>
            <FloatingButton
              iconName={'notebook'}
              onButtonClick={() => {
                navigation.navigate('ShelfCreateUpdate', {intent: 'Create'});
              }}
            />
          </View>
        ) : (
          <>
            {isDeletingNotebook ? (
              <View style={globalStyles.overlay}>
                <Text style={homeStyles.emptyText}>Deleting notebook...</Text>
                <ActivityIndicator size={50} color={Colors.yellow} />
              </View>
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
                    data={searchQuery ? filteredNotebooks : notebooks}
                    renderItem={renderShelf}
                    numColumns={2}
                  />
                </View>
              </>
            )}
          </>
        )}
        <FloatingButton
          iconName={'line-scan'}
          onButtonClick={async () => {
            await scanDocument();
            navigation.navigate('ScanOverview', {shelfName: shelfName});
          }}
        />
      </View>
    );
  }

  return content;
};

export default ShelfScreen;
