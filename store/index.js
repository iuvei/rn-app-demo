import { applyMiddleware, createStore } from 'redux'
import reducer from "../reducers";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";

export default createStore(
  reducer,
  applyMiddleware(thunk, promiseMiddleware)
)
