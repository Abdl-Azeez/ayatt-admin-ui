import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// import SaveIcon from "@mui/icons-material/Save";
import Header from "../../components/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../theme";
import {
  createProject,
  createProjectFailed,
  updateProject,
  fetchEachProject,
} from "../../store/project/actions";

const ProjectForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { message, loading, projectError, project } = useSelector(
    (state) => state.Project
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [isNonMobile, setIsNonMobile] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    longitude: "",
    latitude: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsNonMobile(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id) {
      dispatch(fetchEachProject(id));
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName || "",
        latitude: project.latitude || "",
        longitude: project.longitude || "",
      });
    }
  }, [project]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (project) {
      formData.id = project.id;
      dispatch(updateProject(formData));
    } else {
      dispatch(createProject(formData));
    }
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        navigate("/project");
        dispatch(createProjectFailed(""));
      }, 3000);
    }
  }, [dispatch, message, navigate]);

  useEffect(() => {
    if (projectError) {
      setTimeout(() => {
        dispatch(createProjectFailed(""));
      }, 3000);
    }
  }, [dispatch, projectError]);

  useEffect(() => {
    dispatch(createProjectFailed(""));
  }, [dispatch]);

  return (
    <Box m="20px">
      <Header
        title={`${project ? "UPDATE PROJECT" : "CREATE PROJECT"}`}
        subtitle={`${
          project ? "Update existing Project" : "Create a New Project"
        }`}
      />
      <div className="mb-4 w-8/12">
        {message && (
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        )}
        {projectError && (
          <Alert variant="filled" severity="error">
            {projectError}
          </Alert>
        )}
      </div>
      <form onSubmit={handleFormSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          gap="30px"
          width={isNonMobile ? "70%" : "100%"}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Project Name"
            name="projectName"
            InputLabelProps={{
              style: {
                color: colors.greenAccent[500],
                fontWeight: "bold",
              },
            }}
            value={formData.projectName}
            onChange={handleFormChange}
            required
          />
          <Box display={isNonMobile ? "flex" : "block"} gap="30px">
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Latitude"
              name="latitude"
              InputLabelProps={{
                style: {
                  color: colors.greenAccent[500],
                  fontWeight: "bold",
                },
              }}
              value={formData.latitude}
              onChange={handleFormChange}
              required
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Longitude"
              name="longitude"
              InputLabelProps={{
                style: {
                  color: colors.greenAccent[500],
                  fontWeight: "bold",
                },
              }}
              value={formData.longitude}
              onChange={handleFormChange}
              required
            />
          </Box>
        </Box>
        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end"
          width={isNonMobile ? "70%" : "100%"}
          gap="10px"
        >
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            // startIcon={<SaveIcon />}
            type="submit"
            color="secondary"
            variant="contained"
          >
            {project ? "Update Project" : "Create New Project"}
          </LoadingButton>
          <Link to="/project" style={{ textDecoration: "none" }}>
            <Button color="info" variant="contained">
              Back
            </Button>
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default ProjectForm;
