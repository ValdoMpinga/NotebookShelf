import { Alert } from 'react-native';

export const okAlert = (title, text, okAction) =>
{
    Alert.alert(
        title,
        text,
        [{ text: 'OK', onPress: okAction }],
        { cancelable: false }
    );
};
