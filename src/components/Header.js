import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'

import logo from '../images/check.png';

export default function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerTop}>
        <div className={styles.appIcon}><img src={logo} className={styles.headerIcon} alt='Check Icon'></img></div>

        <h1 className={styles.appTitle}>TO-DO Tracker</h1>

        <div className={styles.settingsPlaceholder}>
          {/* Settings or Profile Placeholder*/}
        </div>
      </div>

      <nav className={styles.navBar}>
        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          Tasks
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
          Create Task
        </NavLink>
      </nav>
    </header>
  );
}