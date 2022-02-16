import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';
import { socketSlice } from "slices";

const socketStore = configureStore({
    reducer: {
        socket: socketSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
});

export default socketStore;