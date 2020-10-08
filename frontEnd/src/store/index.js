import { createStore,  applyMiddleware ,compose} from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers/index";
import logger  from "redux-logger";

console.log("thunk" , thunk)
const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWare = [thunk , logger];
const store = createStore(
  rootReducers,
  initialState,
  composeEnhancer(applyMiddleware(...middleWare)),
);
export default store;
