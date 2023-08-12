import {View, Text} from 'react-native';
import React from 'react';
import tutorialStyles from '../styles/screens/tutorialStyles';
import CustomButton from '../components/CustomButton';
import {linkOpener} from '../utils/linkOpener';
import {useSelector} from 'react-redux';

const TutorialScreen = ({navigation}) => {
  const youtubeUrl = 'https://www.youtube.com/live/jfKfPfyJRdk?feature=share';
  const {ip} = useSelector(state => state.notebookShelf);

  return (
    <View style={tutorialStyles.container}>
      <Text style={tutorialStyles.text}>
        The tutorial for this app is available on Youtube!
      </Text>
      <CustomButton
        title={'Take me there!'}
        customButtonStyle={tutorialStyles.takeMeThereButton}
        customTextStyle={tutorialStyles.buttonText}
        onPress={async () => {
          await linkOpener(youtubeUrl);
        }}
      />
      <CustomButton
        title={'Done with the tutorial!'}
        customButtonStyle={tutorialStyles.doneButton}
        customTextStyle={tutorialStyles.buttonText}
        onPress={() => {
          if (ip == '')       navigation.navigate('IP', {
            info: 'Please insert the server IP address on this screen',
          });
          else navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default TutorialScreen;
