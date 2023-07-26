import React from 'react';
import {View, Text, Svg, Circle, Image} from 'react-native';
import Colors from '../utils/constants';
import sideMenuStyles from '../styles/components/sideMenuStyles';
import ProfileIcon from './ProfileIcon';
import SideMenuItem from './SideMenuItem';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SideMenu = ({props, navigation}) => {
  return (
    <View style={sideMenuStyles.container}>
      <View style={sideMenuStyles.header}>
        <View style={sideMenuStyles.profileIconView}>
          <ProfileIcon imageUrl={''} size={100} />
        </View>

        <Text style={sideMenuStyles.username}>User</Text>
      </View>
      <View style={sideMenuStyles.body}>
        <SideMenuItem
          
          icon={<Feather name="user" size={35} color={Colors.blue2} />}
          menuName={'Profile'}
        />
        <SideMenuItem
          icon={
            <SimpleLineIcons name="diamond" size={35} color={Colors.blue2} />
          }
          menuName={'Premium'}
        />
        <SideMenuItem
          icon={
            <MaterialIcons
              name="developer-mode"
              size={35}
              color={Colors.blue2}
            />
          }
          menuName={'Developer'}
        />
        <SideMenuItem
          icon={<AntDesign name="bulb1" size={35} color={Colors.blue2} />}
          menuName={'Tutorial'}
          onMenuItemClick={() => {
            navigation.navigate('Tutorial');
          }}
        />
        <SideMenuItem
          icon={
            <MaterialCommunityIcons
              name="logout"
              size={35}
              color={Colors.blue2}
            />
          }
          menuName={'Logout'}
        />
        <SideMenuItem
          icon={<AntDesign name="closecircle" size={35} color={Colors.blue2} />}
          menuName={'Close app'}
        />
      </View>
    </View>
  );
};

export default SideMenu;
