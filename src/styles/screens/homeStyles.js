// styles.js
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;

export default homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column'
    },
    searchBarView: {
        flex: 1,
        alignItems: 'center',
    }, searchBar: {
        width: screenWidth / 1.25,
    }, fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})
