import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_KEY } from './constants';

export default async function ipGetter()
{

    try
    {
        const value = await AsyncStorage.getItem(IP_KEY);

        if (value !== null)
        {
            console.log("returning ip");
            return value
        } else
        {
            console.log('There was no IP available!');
            return '';
        }
    } catch (e)
    {
        console.log(e);
    }
}
