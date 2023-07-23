import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Logo from '../components/Logo';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import Shelf from '../components/Shelf';
import FloatingButton from '../components/FloatingButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Notebook from '../components/Notebook';
import shelfScreenStyles from '../styles/screens/shelfScreenStyles';
const ShelfScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const renderShelf = ({ item }) => <Notebook
    notebookName={item}
    numberOfPages={54}
  />;
  const shelfNames = [
    'Shelf 1',
    'Shelf 2',
    'Shelf 3',
    'Shelf 4',
    'Shelf 5',
    'Shelf 6',    
    'Shelf 7',
    'Shelf 8',
  ];

  return (
    <View style={shelfScreenStyles.container}>
      <View style={shelfScreenStyles.logoView}>
        <Logo />
      </View>
      {/* <Text>HomeScreen {phoneLanguage} </Text> */}

      <View style={shelfScreenStyles.titleView}>
        <Text style={globalStyles.title}>Shelf Name</Text>
      </View>

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
          data={shelfNames}
          renderItem={renderShelf}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
      <View></View>
      <FloatingButton iconName={'line-scan'} />
    </View>
  );
};

export default ShelfScreen;
