// styles.js
import { StyleSheet } from 'react-native';
import {Colors} from '../../utils/constants';

export default homeStyles = StyleSheet.create({
    fabButton: {
        position: 'absolute',
        bottom: 25,
        right: 15,
        width: 80,
        height: 80,
        borderRadius: 28,
        backgroundColor: Colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
})
