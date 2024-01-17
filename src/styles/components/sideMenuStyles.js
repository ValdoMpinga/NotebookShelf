import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../../utils/constants';

export default sideMenuStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    header: {
        backgroundColor: Colors.blue1,
        flex: 1,
        alignItems: 'center',
        

    },
    username: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
    },
    profileIconView: {
        marginTop: 35

    },
    body: {
        backgroundColor: Colors.orange,
        flex: 3
    },
})

