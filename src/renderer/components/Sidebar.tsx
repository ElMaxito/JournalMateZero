import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <nav className="sidebar">
    <div className="logo">JournalMate</div>
    <div className="nav-section">
      <NavLink to="/" end className="nav-item">
        <i className="icon-dashboard"></i> Main
      </NavLink>
      <NavLink to="/entries" className="nav-item">
        <i className="icon-entries"></i> Entries
      </NavLink>
      <NavLink to="/insights" className="nav-item">
        <i className="icon-insights"></i> Insights
      </NavLink>
      <NavLink to="/options" className="nav-item">
        <i className="icon-options"></i> Options
      </NavLink>
    </div>
  </nav>
);

export default Sidebar;