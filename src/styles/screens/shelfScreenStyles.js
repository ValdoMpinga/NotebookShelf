import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;

export default shelfScreenStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column'
    },
    logoView: {
        flex: 1,
        paddingTop: 30,
    },
    titleView: {
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
    notebookView: {
        flex: 7,
        alignItems: 'center',
    }
})
