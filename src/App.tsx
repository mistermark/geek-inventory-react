/* eslint-disable */
import React, { ComponentType } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import Collections from './views/Collections';
import Dashboard from './views/Dashboard';
import Admin from './views/Admin';
import PageLayout from './components/PageLayout';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="verify-email" element={<Dashboard notify="verify_email" />} />
          <Route path="collections" element={<ProtectedRoute component={Collections} />} />
          <Route path="admin" element={<ProtectedRoute component={Admin} />} />
        </Route>
      </Routes>
  );
}
