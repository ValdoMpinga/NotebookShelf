// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.2;

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
    newNotebookInputView:
    {
        width: textInputWidth,
        height:60,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 8,
        marginTop: 30,
        backgroundColor: 'red',
        marginBottom:60
    }
})
