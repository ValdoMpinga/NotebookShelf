// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;

export default shelfStyles = StyleSheet.create({
    shelf: {
        width: screenWidth / 1.20,
        height: 80,
        borderRadius: 10,
        backgroundColor: Colors.orange,
        flexDirection: 'row',
        marginBottom: 30,
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    shelfNameView: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    shelfName: {
        color: Colors.black,
        fontWeight: '400',
        fontSize: 16,
    },
    shelfEditView: {
        flex: 1,
        width: 60,
        height: 60,
        marginRight: 20
    },
    shelfEdit: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 15,
        marginTop: 10,
    },
    shelfDeleteView: {
        flex: 1,
        width: 60,
        height: 60,
        marginRight: 20
    },
    shelfDelete: {
       width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: 15,
        marginTop: 12,
    },


})
