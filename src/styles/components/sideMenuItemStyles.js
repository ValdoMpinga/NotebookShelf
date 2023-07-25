import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

export default sideMenuItemStyles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "red",
        flexDirection: "row",
        // justifyContent: "center",
        // alignContent: "center",
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
