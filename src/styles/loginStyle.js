// styles.js
import { StyleSheet } from 'react-native';
import Colors from '../utils/constants';

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column'
    },
    logoView: { 
        // backgroundColor: 'red',
        flex: 2,
        paddingTop: 20
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
        flex: 5,
    },
    loginOptionsView: {
        // backgroundColor: 'purple',
        flex: 3,

    }
});

export default loginStyles;
