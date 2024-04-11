import HttpService from "./HttpService";

export const GetProjectService = () => {
  const http = new HttpService();
  let url = 'admin/projects';

  return http.getData(url);
};

export const GetEachProjectService = (id) => {
  const http = new HttpService();
  const url = `admin/project/${id}`;
  return http.getData(url);
};

export const CreateProjectService = (payload) => {
  const http = new HttpService();
  const url = 'admin/project';
  return http.postData(payload, url);
};
export const UpdateProjectService = (payload) => {
  const http = new HttpService();
  const url = `admin/project/${payload.id}`;
  return http.putData(payload, url);
};

export const DeleteProjectService = (id) => {
  const http = new HttpService();
  const url = `admin/project/${id}`;
  return http.deleteData(url);
};