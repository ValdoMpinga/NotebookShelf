import { SET_TRUE } from "./actions";

const initialState = {
    value: true,
}


function appReducer(state = initialState, action)
{
    switch (action.type)
    {
        case SET_TRUE:
            return { ...state, value: action.payload }
        default: return state;
    }
}


export default appReducer;
