import { configureStore } from '@reduxjs/toolkit';
import notebookShelfReducer from './notebookShelfStore'


export default configureStore({
    reducer:
    {
        notebookShelf: notebookShelfReducer,
    },
});
