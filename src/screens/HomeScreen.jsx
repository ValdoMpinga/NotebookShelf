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
import {setShelves, setIp} from '../../redux/notebookShelfStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import Shelf from '../components/Shelf';
import FloatingButton from '../components/FloatingButton';
import endpointComposer from '../utils/endpoinComposer';
import {Colors} from '../utils/constants';
import ipGetter from '../utils/ipGetter';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShelves, setFilteredShelves] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const onChangeSearch = query => {
    const lowercaseQuery = query.toLowerCase();
    setSearchQuery(lowercaseQuery);

    const filtered = shelves.filter(shelf =>
      shelf.toLowerCase().includes(lowercaseQuery),
    );
    setFilteredShelves(filtered);
  };

  const dispatch = useDispatch();
  const {shelves, isDeletingShelf, ip} = useSelector(
    state => state.notebookShelf,
  );
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
    getIp();
  }, [bounceValue, ip]);

  async function getIp() {
    let ip = await ipGetter();
    if (ip != '') {
      dispatch(setIp(ip));
      await getDropboxShelves(ip, 'shelf/get-shelves');
    } else {
      navigation.navigate('IP', {
        info: 'Please insert the server IP address on this screen',
      });
    }
  }

  async function getDropboxShelves(ip, endpoint) {
    let pingEndpoint = endpointComposer(ip, 'ping/get');
    console.log('Ping endpoint ' + pingEndpoint);
    try {
      let pingResponse = await fetch(pingEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (pingResponse.ok) {
        try {
          let composedEndpoint = endpointComposer(ip, endpoint);
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

          setIsDataFetched(true);
        } catch (error) {
          navigation.navigate('IP');
          console.error('Error getting shelves:', error);
          throw error;
        }
      }
    } catch (e) {
      console.log('Error pinging server');
      console.log(e);
      console.log('ip ' + ip);
      ip == ''
        ? navigation.navigate('IP', {
            info: 'Please insert the server IP address on this screen',
          })
        : navigation.navigate('IP', {
            info: 'Please insert the server IP address, if there is already one, please check if the server is on or if the ip has changed.',
          });
    }
  }
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

          {isDeletingShelf ? (
            <View style={globalStyles.overlay}>
              <Text style={homeStyles.emptyText}>Deleting shelf...</Text>
              <ActivityIndicator size={50} color={Colors.yellow} />
            </View>
          ) : (
            <>
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
                  data={searchQuery ? filteredShelves : shelves}
                  renderItem={renderShelf}
                />
              </View>
            </>
          )}

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

  return content;
};

export default HomeScreen;
