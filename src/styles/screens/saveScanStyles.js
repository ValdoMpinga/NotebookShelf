// styles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/constants';

export default saveScanStyles = StyleSheet.create({
    controls: {
        marginTop: 130,
        flex: 2,
    },
    saveButtonView: {
        flex: 2
    },
    saveButton: {
        backgroundColor: Colors.white,
        borderColor: Colors.blue1,
        marginTop: 30,
    },
})
