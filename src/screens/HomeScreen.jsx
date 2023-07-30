import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setShelves,
} from '../../redux/notebookShelfStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import Shelf from '../components/Shelf';
import FloatingButton from '../components/FloatingButton';
import { supabase } from '../database/connection';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const renderShelf = ({item}) => (
    <Shelf navigation={navigation} shelfName={item.name} shelfId={item.id} /> 
  );

  const dispatch = useDispatch();
  const {shelves} = useSelector(state => state.notebookShelf);

  useEffect(() => {
    getShelves(supabase);
  }, []);

  async function getShelves(supabase) {
    const {data} = await supabase.from('Shelf').select('*');
    dispatch(setShelves(data));
  }

  // Conditionally render text and icon if shelves is an empty array
  if (shelves.length === 0 ) {
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
          navigation.navigate('ShelfCreateUpdate',{});
        }}
      />
    </View>
  );
};

export default HomeScreen;
