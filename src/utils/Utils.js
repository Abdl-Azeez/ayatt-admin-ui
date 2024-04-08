import { Redirect } from "react-router-dom";

export const QueryReallignment = (queryData) => {
  if (queryData) {
    let query = '';
    for (const [key, value] of Object.entries(queryData)) {
      // console.log(value)
      if (
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
      } else {
        let result = `${key}=${value}&`;
        query = result + query;
      }
    }
    let result = query.slice(0, -1);
    return result;
  }
};

//Function to validate and return errors for a form
export const checkForm = (formData) => {
  let errorState = {};
  Object.keys(formData).forEach((item) => {
    if (formData[item] === null || formData[item] === "") {
      errorState[item] = "This field is required";
    }
  });
  return errorState;
};


export const RedirectAs404 = ({ location }) => (
  <Redirect to={Object.assign({}, location, { state: { is404: true } })} />
);


