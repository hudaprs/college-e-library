import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistReducer } from 'redux-persist'
import auth from './auth.redux.slice'
import { authApi } from './auth.redux.rtk'

export const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer
})

export const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth'],
    stateReconciler: autoMergeLevel2
  },
  rootReducer
)
