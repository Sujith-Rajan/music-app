
import { combineReducers, configureStore as createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import favoriteSlice from './favoriteSlice'

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()
const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  favorite: favoriteSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore({
  reducer: persistedReducer,
  middleware: MiddlewareArray =>
    MiddlewareArray({
      serializableCheck: false,
      thunk: true,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store)

export { store, persistor }