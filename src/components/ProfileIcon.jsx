import React from 'react';
import {View} from 'react-native';
import {Svg, Circle, Image} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';

const ProfileIcon = ({imageUrl, size = 50}) => {
  return (
    <View style={{width: size, height: size}}>
      <Svg height={size} width={size}>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#e9e9e9" />
        {imageUrl ? (
          <Image
            x="0"
            y="0"
            width={size}
            height={size}
            href={{uri: imageUrl}}
            clipPath="url(#clip)"
          />
        ) : (
          <Icon
            name="user"
            size={size * 0.6}
            color="#fff"
            style={{position: 'absolute', top: size * 0.2, left: size * 0.2}}
          />
        )}
      </Svg>
    </View>
  );
};

export default ProfileIcon;
