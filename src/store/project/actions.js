import {
  FETCH_PROJECT,
  FETCH_PROJECT_SUCCESSFUL,
  FETCH_PROJECT_API_FAILED,
  FETCH_EACH_PROJECT,
  FETCH_EACH_PROJECT_SUCCESSFUL,
  FETCH_EACH_PROJECT_API_FAILED,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESSFUL,
  DELETE_PROJECT_FAILED,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESSFUL,
  CREATE_PROJECT_FAILED,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESSFUL,
  UPDATE_PROJECT_FAILED,
} from './actionTypes';

export const fetchProject = (payload) => {
  return {
    type: FETCH_PROJECT,
    payload,
  };
};

export const fetchProjectSuccessful = (payload) => {
  return {
    type: FETCH_PROJECT_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchProjectError = (error) => {
  return {
    type: FETCH_PROJECT_API_FAILED,
    payload: error,
  };
};

export const fetchEachProject = (id) => {
  return {
    type: FETCH_EACH_PROJECT,
    payload: id,
  };
};

export const fetchEachProjectSuccessful = (payload) => {
  return {
    type: FETCH_EACH_PROJECT_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchEachProjectError = (error) => {
  return {
    type: FETCH_EACH_PROJECT_API_FAILED,
    payload: error,
  };
};

export const createProject = (payload) => {
  return {
    type: CREATE_PROJECT,
    payload,
  };
};

export const createProjectSuccessful = (payload) => {
  return {
    type: CREATE_PROJECT_SUCCESSFUL,
    payload,
  };
};

export const createProjectFailed = (error) => {
  return {
    type: CREATE_PROJECT_FAILED,
    payload: error,
  };
};

export const updateProject = (payload) => {
  return {
    type: UPDATE_PROJECT,
    payload,
  };
};

export const updateProjectFailed = (error) => {
  return {
    type: UPDATE_PROJECT_FAILED,
    payload: error,
  };
};

export const updateProjectSuccessful = (payload) => {
  return {
    type: UPDATE_PROJECT_SUCCESSFUL,
    payload,
  };
};

export const deleteProject = (id) => {
  return {
    type: DELETE_PROJECT,
    payload: id,
  };
};

export const deleteProjectSuccessful = (payload) => {
  return {
    type: DELETE_PROJECT_SUCCESSFUL,
    payload,
  };
};

export const deleteProjectFailed = (error) => {
  return {
    type: DELETE_PROJECT_FAILED,
    payload: error,
  };
};

