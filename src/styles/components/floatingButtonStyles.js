// styles.js
import { StyleSheet } from 'react-native';
import {Colors} from '../../utils/constants';

export default homeStyles = StyleSheet.create({
    fabButton: {
        position: 'absolute',
        bottom: 20,
        right: 5,
        width: 60,
        height: 60,
        borderRadius: 28,
        backgroundColor: Colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
})
