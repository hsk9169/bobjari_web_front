import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';
import { sessionSlice, manageSlice } from "slices";

const store = configureStore({
    reducer: {
        session: sessionSlice,
        manage: manageSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
});

export default store;