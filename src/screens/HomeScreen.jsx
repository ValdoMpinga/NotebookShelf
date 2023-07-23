import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import i18next from '../../services/i18next';
// import {setPhoneLanguage, setTranslation} from '../../redux/notebookShelfStore';
// import {useTranslation} from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';
import {FAB} from 'react-native-paper';
import Logo from '../components/Logo';
import globalStyles from '../styles/components/globalStyle';
import homeStyles from '../styles/screens/homeStyles';
import {Searchbar} from 'react-native-paper';
import Shelf from '../components/Shelf';
import Notebook from '../components/Notebook';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

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
      <View style={globalStyles.logoView}>
        <Logo />
      </View>

      <View style={homeStyles.searchBarView}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={homeStyles.searchBar}
        />
      </View>
      {/* <Text>HomeScreen {phoneLanguage} </Text> */}

      {/* <Shelf
        shelfName={"School notebooks"} /> */}

      {/* <Notebook
        notebookName={'Human-Machine interaction'}
        numberOfPages={345}
      /> */}
      <Notebook
        notebookName={'Human-Machine interaction interaction'}
        numberOfPages={345}
      />
    </View>
  );
};

export default HomeScreen;
