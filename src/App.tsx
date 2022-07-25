/* eslint-disable */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Collections from './components/Collections';
import Dashboard from './components/Dashboard';
import PageLayout from './components/PageLayout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="collections" element={<Collections />} />
      </Route>
    </Routes>
  );
}
