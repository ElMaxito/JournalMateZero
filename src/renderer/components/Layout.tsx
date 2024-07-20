import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      <div className="content-wrapper">
        {children}
      </div>
    </main>
  </div>
);

export default Layout;