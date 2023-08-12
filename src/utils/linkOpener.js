import { Linking } from 'react-native';

const linkOpener = async (link) =>
{
    try
    {
        await Linking.openURL(link);
    } catch (e)
    {
        console.log("Can't open link");
        console.log(e);
    }
};

export { linkOpener }
