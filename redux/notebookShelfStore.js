import { createSlice } from '@reduxjs/toolkit'

const notebookShelfSlice = createSlice(
    {
        name: 'notebookShelf',
        initialState: {
            phoneLanguage: 'en',
            t: undefined,
            scannedImagesArray: [],
            shelves: [],
            notebooks: [],
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
                if (Array.isArray(action.payload))
                {
                    state.scannedImagesArray = state.scannedImagesArray.concat(action.payload);
                } else
                {
                    state.scannedImagesArray.push(action.payload);
                }
            },
            setShelves(state, action)
            {
                state.shelves = action.payload;
            },
            setNotebook(state, action)
            {
                state.notebooks = action.payload;
            },
        }
    }
)

export const { setPhoneLanguage, setTranslation, setScannedImages, setShelves, setNotebook } = notebookShelfSlice.actions

export default notebookShelfSlice.reducer
