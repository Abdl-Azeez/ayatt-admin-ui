import { all } from "redux-saga/effects";

//public
import authSaga from "./auth/saga";
import projectSaga from "./project/saga";


export default function* rootSaga() {
  yield all([
    authSaga(),
    projectSaga()
  ]);
}
