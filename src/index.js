import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore, { history } from './store'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'
import UserPage from './components/UserPage'
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PersistGate } from 'redux-persist/integration/react'
const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route exact path="/blog/:id">
              <SingleBlogPage />
            </Route>
            <Route exact path="/users">
              <UserPage />
            </Route>
            <Route exact path="/users/:id" component={SingleUserPage} />
          </Switch>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
