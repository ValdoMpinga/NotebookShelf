export default function endpointComposer(ip_address, endpoint)
{
    return `http://${ip_address}:3000/${endpoint}`;
}
