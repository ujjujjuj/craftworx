import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import cartSlice from './cartSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers({
  authState: authSlice.reducer,
  cartState: cartSlice.reducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)


export const store =  configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
