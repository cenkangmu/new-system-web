import {createStore, combineReducers, applyMiddleware} from 'redux'
import createSagaMidlleWare from 'redux-saga'
import systemReducer from "./systemReducer";
import exchangeReducer from "./exchangeReducer";
import sageAll from "./saga";
const reducer = combineReducers({
  system:systemReducer,
  exchange:exchangeReducer
})
const saga = createSagaMidlleWare()
const store = createStore(reducer,applyMiddleware(saga))
saga.run(sageAll)


export default store