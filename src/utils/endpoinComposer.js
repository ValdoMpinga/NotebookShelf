import { IP_ADDRESS } from "./constants";

export default function endpointComposer(endpoint)
{
    return `http://${IP_ADDRESS}:3000/${endpoint}`;
}
