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
import {v4 as uuidv4} from 'uuid';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const dispatch = useDispatch();
  const {shelves} = useSelector(state => state.notebookShelf);

  useEffect(() => {
    getDropboxShelves('shelf/get-shelves');
  }, []);

  async function getDropboxShelves(endpoint) {
    try {
      let composedEndpoint = endpointComposer(endpoint);
      console.log(composedEndpoint);
      const response = await fetch(composedEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(setShelves(responseData.endpoints));
      } else {
        console.error('Error:', response.statusText);
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  }

  const renderShelf = ({item}) => (
    <Shelf navigation={navigation} shelfName={item} />
  );

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
        <FlatList data={shelves} renderItem={renderShelf} />
      </View>
      <View></View>
      <FloatingButton
        iconName={'bookshelf'}
        onButtonClick={() => {
          navigation.navigate('ShelfCreateUpdate', {intent: 'Create'});
        }}
      />
    </View>
  );
};

export default HomeScreen;
