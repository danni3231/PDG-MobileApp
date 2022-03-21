import { createStore, applyMiddleware } from "redux";
import { appReducer } from "./Reducers";
import thunk from "redux-thunk";

export const store = createStore(appReducer, applyMiddleware(thunk));
