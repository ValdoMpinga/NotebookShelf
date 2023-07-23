// .js
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;

export default notebookStyles = StyleSheet.create({
    container: {
        width: screenWidth / 2.25,
        height: 200,
        borderRadius: 10,
        backgroundColor: Colors.orange,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 10,

    },
    notebookNameView: {
        flex: 2,
        marginTop: 10,
        alignItems: 'center',

    },
    notebookName: {
        color: Colors.black,
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',
    },
    notebookPagesView: {
        flex: 2,
        alignItems: 'center',

    },
    notebookPages: {
        color: Colors.blue1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    notebookEditDelete: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 10,

    },

})
