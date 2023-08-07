// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;


export default globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoView: {
        flex: 2,
        paddingTop: 20
    },
    loginView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Monaco',
        fontSize: 24,
        color: Colors.white,
        marginTop: 20,
    },
    textInputView: {
        width: textInputWidth,
        height: 70,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 8,
        marginTop: 30
    },
    logoView: {
        backgroundColor: 'red',
        flex: 2,
        paddingTop: 20
    },
    textInputView: {
        width: textInputWidth,
        height: 70,
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 8,
        marginTop: 30
    },
    textInput: {
        flex: 1,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center', // Horizontal centering
        alignItems: 'center', // Vertical centering
        backgroundColor: Colors.blue2
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
