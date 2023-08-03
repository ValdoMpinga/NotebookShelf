// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../../utils/constants';


const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column'
    },
    logoView: {
        // backgroundColor: 'red',
        flex: 1,
        paddingTop: 20
    },
    registerView: {
        // backgroundColor: 'green',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    register: {
        fontFamily: 'Monaco',
        fontSize: 24,
        color: Colors.white,
    },
    controlsView: {
        flex: 5,
        alignItems: 'center',
    },
    registerOptionsView: {
        // backgroundColor: 'purple',
        flex: 3,
        alignItems: 'center',
    },
    registerOption: {
        fontSize: 18,
        color: Colors.white,
        marginTop: 24,

    }
})

export default registerStyles;
