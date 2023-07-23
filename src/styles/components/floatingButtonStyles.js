// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

export default homeStyles = StyleSheet.create({
    fabButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 28,
        backgroundColor: Colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
})
