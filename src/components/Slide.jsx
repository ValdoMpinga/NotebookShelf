import {View, Text, Image} from 'react-native';
import React from 'react';
import tutorialStyles from '../styles/screens/tutorialStyles';
const Slide = ({image, text}) => {
  return (
    <>
      <View>
        <Image
          source={{uri: image}}
          style={tutorialStyles.tutorialImage}
          resizeMode="contain"
        />
      </View>

      <View style={tutorialStyles.tutorialTextView}>
        <Text style={tutorialStyles.tutorialText}>{text}</Text>
      </View>
    </>
  );
};

export default Slide;
