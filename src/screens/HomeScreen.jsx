import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import i18next from '../../services/i18next';
import {setPhoneLanguage} from '../../redux/notebookShelfStore';
import {useTranslation} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {phoneLanguage} = useSelector(state => state.notebookShelf);

  const {t} = useTranslation();

  useEffect(() => {
    const preferredLanguages = RNLocalize.getLocales();
    console.log(preferredLanguages[0].countryCode.toLowerCase());
    dispatch(setPhoneLanguage(preferredLanguages[0].countryCode.toLowerCase()));
    if (preferredLanguages && preferredLanguages.length > 0) {
      i18next.changeLanguage(phoneLanguage);
    }
  }, []);

  return (
    <View>
      <Text>HomeScreen {phoneLanguage} </Text>
    </View>
  );
};

export default HomeScreen;
