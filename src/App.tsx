/* eslint-disable */
import React, { ComponentType } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';


import Collections from './components/Collections';
import Dashboard from './components/Dashboard';
import PageLayout from './components/PageLayout';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="collections" element={<ProtectedRoute component={Collections} />} />
        </Route>
      </Routes>
  );
}
