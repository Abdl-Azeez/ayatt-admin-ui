import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

import {
  FETCH_PROJECT,
  FETCH_EACH_PROJECT,
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from './actionTypes';
import {
  fetchProjectSuccessful,
  fetchProjectError,
  fetchEachProjectSuccessful,
  fetchEachProjectError,
  deleteProjectSuccessful,
  deleteProjectFailed,
  createProjectSuccessful,
  createProjectFailed,
  updateProjectSuccessful,
  updateProjectFailed,
} from './actions';

import {
  GetProjectService,
  GetEachProjectService,
  DeleteProjectService,
  CreateProjectService,
  UpdateProjectService,
} from '../../services/projectService';

function* fetchProjectHandler({ payload }) {
  try {
    const response = yield call(GetProjectService, payload);
    yield put(fetchProjectSuccessful(response.data));
  } catch (error) {
    if (error.response.status === 403) {
      yield put(
        fetchProjectError(
          'Access to this page is restricted to authorized users only'
        )
      );
      return;
    } else if (error.response.status === 429) {
      yield put(
        fetchProjectError(
          'Too much request, please refresh and try again after few seconds'
        )
      );
    } else {
      yield put(fetchProjectError(error?.message));
    }
  }
}
function* fetchEachProjectHandler({ payload }) {
  try {
    const response = yield call(GetEachProjectService, payload);
    yield put(fetchEachProjectSuccessful(response.data));
  } catch (error) {
    yield put(fetchEachProjectError(error?.message));
  }
}

function* deleteProjectHandler({ payload }) {
  try {
    const response = yield call(DeleteProjectService, payload);
    yield put(deleteProjectSuccessful(response.data));
  } catch (error) {
    yield put(deleteProjectFailed(error?.message));
  }
}

function* createProjectHandler({ payload }) {
  try {
    const response = yield call(CreateProjectService, payload);
    yield put(createProjectSuccessful(response.data));
  } catch (error) {
    yield put(createProjectFailed(error?.message));
  }
}

function* updateProjectHandler({ payload }) {
  try {
    const response = yield call(UpdateProjectService, payload);
    yield put(updateProjectSuccessful(response.data));
  } catch (error) {
    yield put(updateProjectFailed(error?.message));
  }
}

// PROJECT SUMMARY

export function* watchFetchProject() {
  yield takeEvery(FETCH_PROJECT, fetchProjectHandler);
}
export function* watchFetchEachProject() {
  yield takeEvery(FETCH_EACH_PROJECT, fetchEachProjectHandler);
}
export function* watchDeleteProject() {
  yield takeEvery(DELETE_PROJECT, deleteProjectHandler);
}
export function* watchCreateProject() {
  yield takeEvery(CREATE_PROJECT, createProjectHandler);
}
export function* watchUpdateProject() {
  yield takeEvery(UPDATE_PROJECT, updateProjectHandler);
}

function* projectSaga() {
  yield all([
    fork(watchFetchProject),
    fork(watchFetchEachProject),
    fork(watchDeleteProject),
    fork(watchCreateProject),
    fork(watchUpdateProject),
  ]);
}

export default projectSaga;
