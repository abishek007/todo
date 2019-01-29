import Saga from "redux-saga"
import { createStore, applyMiddleware, compose } from "redux"
import reducers from "./reducer"

const logger = (state) => (next) => (action) => {
    console.group(action.type)
    console.info("dispatching", action)
    let result = next(action)
    console.group("next state", store.getState())
    console.groupEnd(action.type)
    return result
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(logger),
      applyMiddleware(Saga)
    )
  )
  
  export default store