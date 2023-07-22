import { combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import appReducer from './reducers'

const rootReducer = combineReducers({
    app: appReducer // Assuming "app" is the slice name for the appReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});
