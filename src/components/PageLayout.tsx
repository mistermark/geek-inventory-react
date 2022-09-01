import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

import './PageLayout.css';

/**
 *
 * @return {React.ReactElement}
 */
export default function PageLayout(): React.ReactElement {
  return (
    <div className='page-layout grid'>
      <Header />
      <main className='bg-gray-100'>
        <div className="h-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
