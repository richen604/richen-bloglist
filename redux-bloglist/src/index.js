import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore, {history} from './store'
import { Route, Switch} from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import App from './App'
import UserPage from './components/UserPage'
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/blog/:id" >
            <SingleBlogPage />
            </Route>
          <Route exact path="/users">
            <UserPage />
          </Route>
          <Route path="/users/:id" component={SingleUserPage} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
