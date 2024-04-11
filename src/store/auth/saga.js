import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import {
  LOGIN,
  LOGOUT_USER,
} from "./actionTypes";
import {
  apiError,
  // authError,
  loginUserSuccessful,
  logoutUserSuccess,
} from "./actions";

import {
  LoginService,
} from "../../services/authServices";

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload }) {
  try {
    const response = yield call(LoginService, payload);
    localStorage.setItem("ayattToken", JSON.stringify(response.data.token));
    localStorage.setItem("ayattUser", JSON.stringify(response.data.user));
    yield put(loginUserSuccessful(response.data));
    // history.push("/");
  } catch (error) {
    console.log(error?.message);
    yield put(apiError(error?.message));
  }
}

function* logoutUser({ payload: { history } }) {
  try {

    localStorage.removeItem("ayattToken");
    localStorage.removeItem("ayattUser");
    yield put(logoutUserSuccess());
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}


export function* watchUserLogin() {
  yield takeEvery(LOGIN, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* AuthSaga() {
  yield all([
    fork(watchUserLogin),
    fork(watchUserLogout),
  ]);
}

export default AuthSaga;
