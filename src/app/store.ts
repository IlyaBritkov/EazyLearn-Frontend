import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';

const rootReducer = combineReducers({
    user: userSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>