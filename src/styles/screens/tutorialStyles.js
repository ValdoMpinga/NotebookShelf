import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;
import { Colors } from '../../utils/constants';
export default buttonStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blue2,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',

    },
    takeMeThereButton: {
        marginTop: 20,
        backgroundColor: Colors.orange,
    },
    doneButton: {
        marginTop: 10,
        backgroundColor: Colors.blue1,
    },
    buttonText: {
        fontSize: 16,
        color: Colors.black

    }
  
})
