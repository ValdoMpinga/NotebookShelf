import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setShelves} from '../../redux/notebookShelfStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import Shelf from '../components/Shelf';
import FloatingButton from '../components/FloatingButton';
import endpointComposer from '../utils/endpoinComposer';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const renderShelf = ({item}) => (
    <Shelf navigation={navigation} shelfName={item} shelfId={uuidv4()} />
  );

  const dispatch = useDispatch();
  const {shelves} = useSelector(state => state.notebookShelf);

  useEffect(() =>
  {
    // navigation.navigate('Shelf', {shelfId: 4,shelfName: "Valdo"})
    getDropboxShelves('list-endpoints');
  }, []);


async function getDropboxShelves(endpoint) {
  try {
    let composedEndpoint = endpointComposer(endpoint);
    const response = await fetch(composedEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Log the response status
    console.log('Response Status:', response.status);

    if (response.ok) {
      const responseData = await response.json(); // Change to .json() if the response is JSON
      console.log('Processed Data:', responseData.endpoints);
      console.log('Processed Data:', typeof(responseData.endpoints))
          dispatch(setShelves(responseData.endpoints));

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


  // Conditionally render text and icon if shelves is an empty array
  if (shelves.length === 0) {
    return (
      <View style={homeStyles.centeredContainer}>
        <Text style={homeStyles.emptyText}>No shelves found</Text>
        <Icon name="bookshelf" size={24} color="black" />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.homeTitleView}>
        <Text style={globalStyles.title}>Shelves</Text>
      </View>

      <View style={homeStyles.searchBarView}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={homeStyles.searchBar}
        />
      </View>
      <View style={homeStyles.shelvesView}>
        <FlatList
          data={shelves}
          renderItem={renderShelf}
          keyExtractor={item => item.id}
        />
      </View>
      <View></View>
      <FloatingButton
        iconName={'bookshelf'}
        onButtonClick={() => {
          navigation.navigate('ShelfCreateUpdate', {intent:'Create'});
        }}
      />
    </View>
  );
};

export default HomeScreen;
