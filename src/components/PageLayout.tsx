import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

/**
 *
 * @return {React.ReactElement}
 */
export default function PageLayout(): React.ReactElement {
  return (
    <div>
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
