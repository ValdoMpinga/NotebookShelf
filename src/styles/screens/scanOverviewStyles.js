import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/constants';

const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;

export default scanOverviewStyles = StyleSheet.create({
    selectedImageContainer: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedImage: {
        width: 300, // Set the width of your image
        height: 400, // Set the height of your image
    },
    controlsContainer: {
        flex: 2,
        flexDirection: 'row',
        margin: 20

    },

    imagesListContainer: {
        // backgroundColor: 'red',
        flex: 2,
        width: screenWidth/1.27,

    },
    smallImageContainer: {
        width: 80,
        height: 80,
        marginRight: 5,
        // overflow: 'hidden',
    },
    smallImage: {
        width: 80,
        height: 80,
    },
    activeSmallImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 3,
        backgroundColor: 'red',
        marginRight: 5,
        overflow: 'hidden',
    },
});
