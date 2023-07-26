import { createSlice } from '@reduxjs/toolkit'

const notebookShelfSlice = createSlice(
    {
        name: 'notebookShelf',
        initialState: {
            phoneLanguage: 'en',
            t: undefined,
            scannedImages: []
        },
        reducers: {
            setPhoneLanguage(state, action)
            {
                state.phoneLanguage = action.payload;
            },
            setTranslation(state, action)
            {
                state.t = action.payload;
            },
            setScannedImages(state, action)
            {
                state.scannedImages = [...state.scannedImages,action.payload]
            },
        }
    }
)

export const { setPhoneLanguage, setTranslation,setScannedImages} = notebookShelfSlice.actions

export default notebookShelfSlice.reducer
