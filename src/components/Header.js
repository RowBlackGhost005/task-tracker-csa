import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="app-icon"><img src='/images/check.png' className='header-icon' alt='Check Icon'></img></div>

        <h1 className="app-title">TO-DO Tracker</h1>

        <div className="settings-placeholder">
          {/* Settings or Profile Placeholder*/}
        </div>
      </div>

      <nav className="nav-bar">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Tasks
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Create Task
        </NavLink>
      </nav>
    </header>
  );
}