import { configureStore } from '@reduxjs/toolkit'
import { persistedReducer } from './reducer.redux'
import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import { emptySplitApi } from './empty.redux.rtk'
export const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .prepend(listenerMiddleware.middleware)
      .concat(emptySplitApi.middleware)
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
