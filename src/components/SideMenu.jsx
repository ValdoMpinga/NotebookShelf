import React from 'react';
import {View, Text, Linking, BackHandler} from 'react-native';
import {Colors} from '../utils/constants';
import sideMenuStyles from '../styles/components/sideMenuStyles';
import ProfileIcon from './ProfileIcon';
import SideMenuItem from './SideMenuItem';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import yesOrNoAlert from '../utils/yesOrNoAlert';

const SideMenu = ({ props, navigation }) =>
{
  const linkedinProfileUrl =
    'https://www.linkedin.com/in/valdo-mpinga-640664208/'; // Replace with the actual LinkedIn profile URL

  const openLinkedInProfile = async () => {
    const supported = await Linking.canOpenURL(linkedinProfileUrl);
    if (supported) {
      await Linking.openURL(linkedinProfileUrl);
    } else {
      console.error("Don't know how to open this URL:", linkedinProfileUrl);
    }
  };

  return (
    <View style={sideMenuStyles.container}>
      <View style={sideMenuStyles.header}>
        <View style={sideMenuStyles.profileIconView}>
          <ProfileIcon imageUrl={''} size={100} />
        </View>

        <Text style={sideMenuStyles.username}>User</Text>
      </View>
      <View style={sideMenuStyles.body}>
        {/* <SideMenuItem
          
          icon={<Feather name="user" size={35} color={Colors.blue2} />}
          menuName={'Profile'}
        /> */}
        {/* <SideMenuItem
          icon={
            <SimpleLineIcons name="diamond" size={35} color={Colors.blue2} />
          }
          menuName={'Premium'}
        /> */}
        <SideMenuItem
          icon={
            <MaterialIcons
              name="developer-mode"
              size={35}
              color={Colors.blue2}
            />
          }
          menuName={'Developer'}
          onMenuItemClick={async () => {
            await openLinkedInProfile();
          }}
        />
        <SideMenuItem
          icon={
            <MaterialIcons
              name="network-ping"
              size={35}
              color={Colors.blue2}
            />
          }
          menuName={'IP'}
          onMenuItemClick={async () => {
            await openLinkedInProfile();
          }}
        />
        <SideMenuItem
          icon={<AntDesign name="bulb1" size={35} color={Colors.blue2} />}
          menuName={'Tutorial'}
          onMenuItemClick={() => {
            navigation.navigate('Tutorial');
          }}
        />
        {/* <SideMenuItem
          icon={
            <MaterialCommunityIcons
              name="logout"
              size={35}
              color={Colors.blue2}
            />
          }
          menuName={'Logout'}
        /> */}
        <SideMenuItem
          icon={<AntDesign name="closecircle" size={35} color={Colors.blue2} />}
          menuName={'Close app'}
          onMenuItemClick={() => {
            yesOrNoAlert(
              'Close app',
              'Are you sure you want to close this application?',
              () => {
                BackHandler.exitApp();
              },
            );
          }}
        />
      </View>
    </View>
  );
};

export default SideMenu;
