import {
  View,
  Text,
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {Colors} from '../utils/constants';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShelves, setFilteredShelves] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false); // Initialize as false

const onChangeSearch = query => {
  const lowercaseQuery = query.toLowerCase(); // Convert query to lowercase
  setSearchQuery(lowercaseQuery);

  const filtered = shelves.filter(shelf =>
    shelf.toLowerCase().includes(lowercaseQuery),
  );
  setFilteredShelves(filtered);
};


  const dispatch = useDispatch();
  const {shelves, isDeletingShelf} = useSelector(state => state.notebookShelf);
  const [bounceValue] = useState(new Animated.Value(0));

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

        setIsDataFetched(true); // Set isDataFetched after successful response
      } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
      }
    }

    getDropboxShelves('shelf/get-shelves');
  }, [bounceValue]);

  const renderShelf = ({item}) => (
    <Shelf navigation={navigation} shelfName={item} />
  );

  let content;
  if (!isDataFetched) {
    content = (
      <View style={globalStyles.centeredContainer}>
        <Text style={homeStyles.emptyText}>Loading shelves...</Text>
        <ActivityIndicator size={50} color={Colors.orange} />
      </View>
    );
  } else if (shelves.length > 0) {
    content = (
      <>
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
          {isDeletingShelf && (
            <View style={globalStyles.overlay}>
              <ActivityIndicator size={50} color={Colors.yellow} />
            </View>
          )}

          <View style={homeStyles.shelvesView}>
            <FlatList
              data={searchQuery ? filteredShelves : shelves}
              renderItem={renderShelf}
            />

            {/* <FlatList data={shelves} renderItem={renderShelf} /> */}
          </View>
          <FloatingButton
            iconName={'bookshelf'}
            onButtonClick={() => {
              navigation.navigate('ShelfCreateUpdate', {intent: 'Create'});
            }}
          />
        </View>
      </>
    );
  } else {
    content = (
      <View style={globalStyles.centeredContainer}>
        <Text style={homeStyles.emptyText}>No shelves created yet!</Text>
        <Animated.View style={{transform: [{scale: bounceValue}]}}>
          <Icon name="bookshelf" size={40} color="black" />
        </Animated.View>
        <FloatingButton
          iconName={'bookshelf'}
          onButtonClick={() => {
            navigation.navigate('ShelfCreateUpdate', {intent: 'Create'});
          }}
        />
      </View>
    );
  }

  return content; // Return the content based on the condition
};

export default HomeScreen;
