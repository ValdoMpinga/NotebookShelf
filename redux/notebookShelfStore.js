import { createSlice } from '@reduxjs/toolkit'

const notebookShelfSlice = createSlice(
    {
        name: 'notebookShelf',
        initialState: {
            phoneLanguage: 'en',
            t: undefined,
        },
        reducers: {
            setPhoneLanguage(state, action)
            {
                state.phoneLanguage = action.payload;
            },
            setTranslation(state, action)
            {
                state.t = action.payload;

            }
        }
    }
)

export const { setPhoneLanguage, setTranslation} = notebookShelfSlice.actions

export default notebookShelfSlice.reducer
