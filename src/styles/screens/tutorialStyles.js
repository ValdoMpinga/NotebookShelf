import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth / 1.20;

export default buttonStyle = StyleSheet.create({
    tutorialImageView: {
        flex: 1,
    },
    tutorialImage: {
        width: 300,
        height: 400, 
    },
    tutorialTextView: {
        flex: 2,
        width: textInputWidth/1.40
    },
    tutorialText: {
        fontSize: 18,
        textAlign: 'center'
    },
    progressView: {
        flex: 3,
        flexDirection: 'row',
        alignItems: "center", 
    }
})
