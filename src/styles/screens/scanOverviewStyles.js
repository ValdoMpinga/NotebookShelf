import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;

export default scanOverviewStyles = StyleSheet.create({
    selectedImageContainer: {
        flex: 4,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedImage: {
        width: 300, // Set the width of your image
        height: 400, // Set the height of your image
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:  'red',
        marginTop: 20,
    },
    smallImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 5,
        overflow: 'hidden',
    },
    smallImage: {
        width: 80,
        height: 80,
    },
});
