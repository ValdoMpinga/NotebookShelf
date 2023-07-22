import { createSlice } from '@reduxjs/toolkit'

const notebookShelfSlice = createSlice(
    {
        name: 'notebookShelf',
        initialState: {
            phoneLanguage: 'en'
        },
        reducers: {
            setPhoneLanguage(state, action)
            {
                state.phoneLanguage = action.payload;
            },
        }
    }
)

export const { setPhoneLanguage } = notebookShelfSlice.actions

export default notebookShelfSlice.reducer
