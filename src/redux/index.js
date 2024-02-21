import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from 'redux-persist'
import bookSlice from './book/bookSlice'
import authSlice from './auth/authSlice'
import deviceSlice from './device/deviceSlice'
import epubThemeSlice from './epub/themeSlice'
import filterSlice from './filter'
import AsyncStorage from '@react-native-async-storage/async-storage'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['bookSlice', 'authSlice', 'deviceSlice', 'epubThemeSlice']
}

const rootReducer = combineReducers({
    bookSlice,
    authSlice,
    filterSlice,
    deviceSlice,
    epubThemeSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
})
const persistor = persistStore(store)
export { store, persistor }
