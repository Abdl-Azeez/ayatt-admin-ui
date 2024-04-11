import { Box, Alert, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, fetchProjectError } from "../../store/project/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const Project = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, projects, projectError } = useSelector(
    (state) => state.Project
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  useEffect(() => {
    if (!projects) {
      dispatch(fetchProject());
    }
  }, [dispatch, projects]);

  useEffect(() => {
    if (projectError) {
      setTimeout(() => {
        dispatch(fetchProjectError(""));
      }, 2000);
    }
  }, [dispatch, projectError]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={`/project-form?id=${params.row.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            color="info"
            startIcon={<EditOutlinedIcon />}
          >
            Edit
          </Button>
        </Link>
      ),
    },
  ];

  const rows = projects
    ? projects.map((project) => ({
        id: project.id,
        projectName: project.projectName ? project.projectName : "------",
        latitude: project.latitude ? project.latitude : "------",
        longitude: project.longitude ? project.longitude : "------",
      }))
    : [];

  return (
    <Box m="20px">
      <div
        className="flex w-full justify-between items-center"
        display="flex"
        justifyContent="between"
        alignItems={"center"}
      >
        <Header title="PROJECTS" subtitle="List of all projects" />
        <Link to="/project-form" style={{ textDecoration: "none" }}>
          <Button
            color="secondary"
            variant="contained"
            sx={{ marginRight: "12px" }}
          >
            Create Project
          </Button>
        </Link>
      </div>
      {projectError && (
        <Alert variant="filled" severity="error">
          {projectError}
        </Alert>
      )}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          detailPanel={(rowData) => (
            <div style={{ padding: "10px" }}>
              <h4>Details:</h4>
              <p>{rowData.projectName}</p>
            </div>
          )}
          loading={loading}
          loadingOverlay={
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          }
          noRowsOverlay={<div>No projects available</div>}
        />
      </Box>
    </Box>
  );
};

export default Project;
