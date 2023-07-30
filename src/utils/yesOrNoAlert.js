import { Alert } from 'react-native';

export default yesOrNoAlert = (title, text, yesAction) =>
{
    Alert.alert(
        title,
        text,
        [
            { text: 'Yes', onPress: ()=>{yesAction()} },
            { text: 'No', }
        ],
        { cancelable: false }
    );
};

