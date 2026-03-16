import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { languages } from '../../config/i18n';

/**
 * Main Layout Component
 * Wraps all pages with the Sidebar and Header
 * Includes page transitions for a premium feel
 */
const MainLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? saved === 'true' : false;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('theme-mode') || 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('lang-code') || 'EN');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    }
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem('lang-code', language);
    const langDir = languages.find((l) => l.code === language)?.dir || 'ltr';
    document.documentElement.setAttribute('dir', langDir);
  }, [language]);

  // Scroll to top on route change to avoid carrying scroll position
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const sidebarWidth = collapsed ? '78px' : 'var(--sidebar-width)';

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      {/* Permanent Navigation */}
      <Sidebar collapsed={collapsed} language={language} />
      
      {/* Scrollable Content Area */}
      <div 
        className="main-content" 
        style={{ 
          flex: 1, 
          marginLeft: sidebarWidth, 
          padding: '2rem',
          paddingTop: 'calc(var(--header-height) + 1rem)',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Header 
          collapsed={collapsed} 
          onToggleSidebar={() => setCollapsed((c) => !c)} 
          onToggleTheme={toggleTheme}
          theme={theme}
          language={language}
          onChangeLanguage={setLanguage}
          sidebarWidth={sidebarWidth} 
        />
        
        {/* Page Content with Entrance Animation */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default MainLayout;
