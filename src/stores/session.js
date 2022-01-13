import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';
import { sessionSlice } from "slices";

const sessionStore = configureStore({
    reducer: {
        session: sessionSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
});

export default sessionStore;