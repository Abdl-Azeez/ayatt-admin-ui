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

const initialState = {
  projects: null,
  projectError: null,
  project: null,
  isAuthorize: null,
  message: null,
  loading: false,
};

const Project = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
    case UPDATE_PROJECT:
    case DELETE_PROJECT:
      state = {
        ...state,
        projects: null,
        projectError: null,
        loading: true,
        message: null,
        isAuthorize: null,
      };
      break;
    case FETCH_PROJECT_SUCCESSFUL:
      state = {
        ...state,
        projects: action.payload,
        projectError: null,
        loading: false,
      };
      break;

    case DELETE_PROJECT_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        projectError: null,
        message: 'Project deleted successfully',
      };
      break;
    case UPDATE_PROJECT_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        projectError: null,
        message: 'Project Updated Successfully',
      };
      break;

    case FETCH_EACH_PROJECT:
      state = {
        ...state,
        loading: true,
        projects: null,
        projectError: null,
        message: null,
        isAuthorize: null,
      };
      break;

    case FETCH_EACH_PROJECT_SUCCESSFUL:
      state = {
        ...state,
        project: action.payload,
        loading: false,
        projectError: null,
        message: null,
      };
      break;

    case CREATE_PROJECT:
      state = {
        ...state,
        loading: true,
        projectError: null,
        message: null,
      };
      break;

    case CREATE_PROJECT_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        projectError: null,
        message: `${action.payload.projectName}  created successfully`,
      };
      break;

    // case FETCH_PROJECT_API_FAILED:
    //   return {
    //     ...state,
    //     loading: false,
    //     projectError:
    //       action.payload
    //   };

    case CREATE_PROJECT_FAILED:
    case DELETE_PROJECT_FAILED:
    case FETCH_EACH_PROJECT_API_FAILED:
    case FETCH_PROJECT_API_FAILED:
      state = {
        ...state,
        projects: null,
        project: null,
        loading: false,
        message: null,
        projectError:
          action.payload
      };
      break;

    case UPDATE_PROJECT_FAILED:
      state = {
        ...state,
        loading: false,
        projectError:
          action.payload,
        message: null,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Project;
