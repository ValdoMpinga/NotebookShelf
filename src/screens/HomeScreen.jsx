import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import i18next from '../../services/i18next';
// import {setPhoneLanguage, setTranslation} from '../../redux/notebookShelfStore';
// import {useTranslation} from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';
import Logo from '../components/Logo';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import Shelf from '../components/Shelf';
import FloatingButton from '../components/FloatingButton';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

const renderShelf = ({item}) => <Shelf shelfName={item} />;
    const shelfNames = [
      'Shelf 1',
      'Shelf 2',
      'Shelf 3',
      'Shelf 4',
      'Shelf 5',
      'Shelf 6',
    ];
    
  // const dispatch = useDispatch();
  // const {phoneLanguage} = useSelector(state => state.notebookShelf);

  // const {t} = useTranslation();

  // useEffect(() => {
  //   const preferredLanguages = RNLocalize.getLocales();
  //   console.log(preferredLanguages[0].countryCode.toLowerCase());
  //   dispatch(setPhoneLanguage(preferredLanguages[0].countryCode.toLowerCase()));
  //   dispatch(setTranslation(t));

  //   if (preferredLanguages && preferredLanguages.length > 0) {
  //     i18next.changeLanguage(phoneLanguage);
  //   }
  // }, []);

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.logoView}>
        <Logo />
      </View>
      {/* <Text>HomeScreen {phoneLanguage} </Text> */}

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
          data={shelfNames}
          renderItem={renderShelf}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View></View>
      <FloatingButton />
    </View>
  );
};

export default HomeScreen;
