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
    logoView: {
        flex: 1,
        paddingTop: 30,
    },
    homeTitleView: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,

    },
    searchBarView: {
        flex: 2,
        alignItems: 'center',
    }, searchBar: {
        width: screenWidth / 1.25,
    }, 
    shelvesView: {
        flex: 7,
        alignItems: 'center',
        
    }
})
