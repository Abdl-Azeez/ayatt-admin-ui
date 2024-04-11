// routes/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../pages/dashboard';
import Team from '../pages/team';
import Contacts from '../pages/contacts';
import Project from '../pages/project';
import Form from '../pages/form';
import Bar from '../pages/bar';
import Pie from '../pages/pie';
import Line from '../pages/line';
import Faq from '../pages/faq';
import Calendar from '../pages/calendar/calendar';
import Geography from '../pages/geography';
import Login from '../pages/login';
import ProjectForm from '../pages/project/projectForm';

function AppRoutes({ isAuthenticated }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login />} />
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />

          <Route path="/project" element={<Project />} />
          <Route path="/project-form" element={<ProjectForm />} />

          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
        </>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </Routes>
  );
}

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.string.isRequired,
};

export default AppRoutes;
