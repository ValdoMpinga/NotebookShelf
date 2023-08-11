import { Alert } from 'react-native';

export const okAlert = (title, body, okAction) =>
{
    Alert.alert(
        title,
        body,
        [{ text: 'OK', onPress: okAction }],
        { cancelable: false }
    );
};
