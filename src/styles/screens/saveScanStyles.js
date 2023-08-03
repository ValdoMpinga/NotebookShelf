// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;

export default saveScanStyles = StyleSheet.create({
    controls: {
        marginTop: 130,
        flex: 4,
    },
    saveButton: {
        flex: 2,
    },

})
