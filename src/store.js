import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const persistConfig = {
  key: 'root',
  storage,
}

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    blogs: blogReducer,
    user: userReducer,
    notify: notificationReducer,
    users: usersReducer,
  })

export const history = createBrowserHistory()
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history),
)

export default function configureStore(preloadedState) {
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
