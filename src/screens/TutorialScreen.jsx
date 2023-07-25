import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyle from '../styles/components/globalStyle';
import tutorialStyles from '../styles/screens/tutorialStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TutorialScreen = () => {
  return (
    <View style={globalStyle.container}>
      <View>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={tutorialStyles.tutorialImage}
          resizeMode="contain"
        />
      </View>
      <View style={tutorialStyles.tutorialTextView}>
        <Text style={tutorialStyles.tutorialText}>
          Scan the desired paper you want, you can scan how many you want!
        </Text>
      </View>
          <View style={tutorialStyles.progressView}>
              <Text>DOT DOT DOT DOT DOT</Text>
        <TouchableOpacity activeOpacity={0.1}>
          <MaterialIcons name="navigate-next" size={80} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TutorialScreen;
