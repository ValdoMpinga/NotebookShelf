import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/constants';

export default shelfCreateUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blue2,
        flexDirection: 'column',
        alignItems: 'center',
    },
    shelfNameView: {
        marginTop: 130,
        flex: 3,
    },
    loadingPostView: {
        flex: 2,

    },
    createOrUpdateButtonView: {
        flex: 3,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },


})
