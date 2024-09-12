import { configureStore } from '@reduxjs/toolkit';
import materialsReducer from './features/materialsSlice';
import appSlice from './features/appSlice';

const store = configureStore({
    reducer: {
        materials: materialsReducer,
        app: appSlice
    },
});

export default store;