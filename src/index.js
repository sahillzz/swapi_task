import {AppContainer} from 'react-hot-loader'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './redux/reducer'
import createSagaMiddleware from 'redux-saga'
import {saga} from './utils/saga'
import style from './style.scss'

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer(history), composeEnhancer(applyMiddleware(sagaMiddleware, routerMiddleware(history),),),)
sagaMiddleware.run(saga);
const render = () => {
  ReactDOM.render(<AppContainer>
    <Provider store={store}>
      <App history={history}/>
    </Provider>
  </AppContainer>, document.getElementById('react-root'))
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./redux/reducer', () => {
    store.replaceReducer(rootReducer(history))
  })
}
