import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import Project from "./project/reducer";
import GlobalVariable from "./globalVariables/reducer";

const rootReducer = combineReducers({
  GlobalVariable,
  Auth,
  Project
});

export default rootReducer;
