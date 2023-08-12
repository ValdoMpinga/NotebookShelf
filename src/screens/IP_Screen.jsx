import {View, Text, ActivityIndicator, BackHandler} from 'react-native';
import globalStyle from '../styles/components/globalStyle';
import ipStyles from '../styles/screens/ipStyles';
import {TextInput} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import shelfCreateUpdateStyles from '../styles/screens/shelfCreateUpdateStyles';
import {setIp} from '../../redux/notebookShelfStore';
import {Colors} from '../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP_KEY} from '../utils/constants';
import {okAlert} from '../utils/okAlert';
import endpointComposer from '../utils/endpoinComposer';
const IP_Screen = ({navigation, route}) => {
  const [inputIp, setInputIP] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();
  const {ip} = useSelector(state => state.notebookShelf);
  const {info} = route.params;

  const handleBackPress = () => {
    console.log('here');
    console.log(ip);
    if (ip == '') {
      okAlert(
        'Warning',
        'You cannot navigate to other without setting up a functional servel IP!',
        () => {},
      );
    } else navigation.navigate('Home');

    return true;
  };

  const handleCreateIP = async () => {
    console.log(validateIP(inputIp));

    if (!validateIP(inputIp))
      okAlert(
        (title = 'Invalid IP Address'),
        (body =
          'Please enter a valid IP address in the format xxx.xxx.xxx.xxx'),
      );
    else await saveIP();
  };

  const validateIP = ip => {
    const ipPattern =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  };

  const saveIP = async value => {
    setIsSaving(true);

    try {
      let pingEndpoint = endpointComposer(inputIp, 'ping/get');
      console.log(pingEndpoint);
      try {
        let pingResponse = await fetch(pingEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (pingResponse.ok) {
          try {
            await AsyncStorage.setItem(IP_KEY, inputIp);
            okAlert(
              'Success',
              'IP configuration completed successfully!',
              () => {
                dispatch(setIp(inputIp));
                navigation.navigate('Home');
              },
            );
          } catch (error) {
            console.error('Fetch Error:', error);
            throw error;
          }
        }
      } catch (e) {
        okAlert(
          'Oops',
          "The app can't reach the server. Please ensure you've entered the correct IP and that the server is operational.",
        );

        console.log(e);
      }
      setIsSaving(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getIP = async () => {
    try {
      const value = await AsyncStorage.getItem(IP_KEY);
      if (value !== null) {
        dispatch(setIp(value));
      } else {
        console.log('There was no IP available!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    if (ip != '') {
      setInputIP(ip);
    } else {
      getIP();
    }

    if (info !== '') {
      okAlert('Attention', info);
    }

    return () => {
      backHandler.remove(); // Remove the event listener when the component unmounts
    };
  }, []);
  return (
    <View style={globalStyle.container}>
      <Text style={ipStyles.title}>Manage the IP of the server</Text>

      {isSaving ? (
        <View style={globalStyle.overlay}>
          <Text>Loading, this can take a while</Text>
          <ActivityIndicator size={50} color={Colors.yellow} />
        </View>
      ) : (
        <>
          <Text style={ipStyles.ipText}>
            {ip == '' ? (
              <>
                <Text>There is no ip yet!</Text>
              </>
            ) : (
              <>{ip}</>
            )}
          </Text>

          <View style={globalStyle.textInputView}>
            <TextInput
              label="IP"
              value={inputIp}
              onChangeText={text => setInputIP(text)}
              mode="flat"
              style={globalStyle.textInput}
              keyboardType="numeric"
            />
          </View>

          <View style={shelfCreateUpdateStyles.createOrUpdateButtonView}>
            <CustomButton
              onPress={handleCreateIP}
              title={ip === '' ? 'Create' : 'Update'}
              customButtonStyle={{
                backgroundColor: Colors.white,
                borderColor: Colors.blue1,
                marginTop: 30,
              }}
              customTextStyle={{color: Colors.blue1, fontSize: 18}}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default IP_Screen;
