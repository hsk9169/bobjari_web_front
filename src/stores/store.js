import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from 'redux';
import { logger } from 'redux-logger';
import { 
    sessionReducer, 
    manageReducer, 
    searchPageReducer 
} from "slices";
// REDUX-PERSIST
import storage from 'redux-persist/lib/storage'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE,
    createTransform,
} from 'redux-persist';
import CryptoJS from 'crypto-js'

const rootReducer = combineReducers({
    session: sessionReducer,
    manage: manageReducer,
    searchPage: searchPageReducer,
})

const encrypt = createTransform(
    (inboundState, key) => {
        if (!inboundState) return inboundState
        const cryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState),
                            process.env.REACT_APP_REDUX_ENCRYPTION_KEY)
        return cryptedText.toString()
    },
    (outboundState, key) => {
        if (!outboundState) return outboundState
        const bytes = CryptoJS.AES.decrypt(outboundState,
                      process.env.REACT_APP_REDUX_ENCRYPTION_KEY)
        const decrypted = bytes.toString(CryptoJS.enc.Utf8)
        return JSON.parse(decrypted)
    }
)

// persist config obj
// blacklist a store attribute using it's reducer name
// blacklisted attributes will not persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    transforms: [encrypt],
    //blacklist: ['manage', 'searchPage'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),
})

export default store;