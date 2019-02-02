import { createStore, applyMiddleware, compose } from "redux"
import { createLogger } from 'redux-logger'
import reducers from "./reducer/index"

const logger = createLogger({
  level: "info",
  collapsed: true,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(logger),
  )
)

export default store