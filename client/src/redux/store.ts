import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import createRootReducer from './reducers'

const initState = {}

const makeStore = (initialState = initState) => {
  let composeEnhancers = compose
  const middleware = [thunk]

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default makeStore
