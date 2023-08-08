import { createSlice } from '@reduxjs/toolkit'

const notebookShelfSlice = createSlice(
    {
        name: 'notebookShelf',
        initialState: {
            phoneLanguage: 'en',
            t: undefined,
            isDeletingShelf: false,
            isDeletingNotebook: false,
            scannedImagesArray: [],
            shelves: [],
            notebooks: [],
            saveScanToExistingBook: false,
            targetNotebookToAddPages: ''
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
            setIsDeletingShelf(state, action)
            {
                state.isDeletingShelf = action.payload
            },
            setIsDeletingNotebook(state, action)
            {
                state.isDeletingNotebook = action.payload
            },
            setSaveScanToExistingBook(state, action)
            {
                state.saveScanToExistingBook = action.payload
            },
            setTargetNotebookToAddPages(state, action)
            {
                state.targetNotebookToAddPages = action.payload
            },
        }
    }
)

export const { setPhoneLanguage, setTranslation, setScannedImages, setShelves, setNotebook, setIsDeletingShelf, setIsDeletingNotebook, setSaveScanToExistingBook, setTargetNotebookToAddPages } = notebookShelfSlice.actions

export default notebookShelfSlice.reducer
