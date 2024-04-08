// routes/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Team from '../pages/team';
import Contacts from '../pages/contacts';
import Invoices from '../pages/invoices';
import Form from '../pages/form';
import Bar from '../pages/bar';
import Pie from '../pages/pie';
import Line from '../pages/line';
import FAQ from '../pages/faq';
import Calendar from '../pages/calendar/calendar';
import Geography from '../pages/geography';
import Login from '../pages/login';

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
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/geography" element={<Geography />} />
        </>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </Routes>
  );
}

export default AppRoutes;
