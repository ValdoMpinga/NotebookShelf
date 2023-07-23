// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;

export default shelfStyles = StyleSheet.create({
    shelf: {
        width: screenWidth / 1.20,
        height: 80,
        borderRadius: 10,
        backgroundColor: Colors.orange,
        flexDirection: 'row',
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
    shelfEdit: {
        flex: 1,
        justifyContent: 'center',

    },
    shelfDelete: {
        flex: 1,
        justifyContent: 'center',

    },

})
