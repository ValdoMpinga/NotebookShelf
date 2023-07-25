import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

export default sideMenuItemStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    iconContainer: {
        marginLeft: 10,
    },
    text: {
        fontSize: 26,
        color: Colors.blue1,
        marginLeft: 15,
    }
})
