// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../../utils/constants';
const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column'
    },

    loginView: {
        // backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    login: {
        fontFamily: 'Monaco',
        fontSize: 24,
        color: Colors.white,
    },
    controlsView: {
        // backgroundColor: 'yellow',
        flex: 4,
        alignItems: 'center',
    },

    loginOptionsView: {
        // backgroundColor: 'purple',
        flex: 3,
        alignItems: 'center',
    },
    loginOption: {
        fontSize: 18,
        color: Colors.white,
        marginTop: 16,

    }
});

export default loginStyles;
