import React, { useState, useEffect, useMemo } from 'react';
import { LogOut, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { sidebarConfig, ChevronDown } from '../../config/sidebarConfig';
import { translations } from '../../config/i18n';

/**
 * Professional Sidebar Component
 * Uses NavLink for active routing states and Framer Motion for subtle interactions
 */
const Sidebar = ({ collapsed = false, language = 'EN' }) => {
  const { roles } = useAuth();

  const initialOpen = useMemo(() => {
    const defaults = {};
    sidebarConfig.forEach(group => {
      group.items.forEach(item => {
        if (item.key) defaults[item.key] = !!item.defaultOpen;
      });
    });
    return defaults;
  }, []);

  const [open, setOpen] = useState(initialOpen);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Auto-collapse submenus when sidebar is collapsed
  useEffect(() => {
    if (collapsed) {
      setOpen((prev) => {
        const closed = { ...prev };
        Object.keys(closed).forEach((k) => (closed[k] = false));
        return closed;
      });
    }
  }, [collapsed]);

  const hasAccess = (allowed) => !allowed || allowed.some((r) => roles.includes(r));

  const tSidebar = translations[language]?.sidebar || translations.EN.sidebar;
  const translateGroup = (key, fallback) => tSidebar.groups?.[key] || fallback;
  const translateItem = (key, fallback) => tSidebar.items?.[key] || fallback;

  const sidebarGroups = sidebarConfig;

  return (
    <div style={{
      width: collapsed ? '78px' : 'var(--sidebar-width)',
      height: '100vh',
      background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.08), rgba(168,85,247,0.04))',
      backgroundColor: 'var(--bg-card-soft)',
      borderRight: '1px solid var(--border)',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: collapsed ? '1.25rem 0.75rem' : '1.5rem 1rem',
      zIndex: 100,
      boxShadow: 'inset -1px 0 0 var(--border), 0 20px 60px rgba(0,0,0,0.4)',
      transition: 'width 0.25s ease, padding 0.25s ease'
    }}>
      {/* Brand Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '2.5rem',
        padding: '0 0.5rem'
      }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'relative',
            width: '42px',
            height: '42px',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.0) 55%), conic-gradient(from 140deg, var(--primary), var(--secondary), var(--primary))',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 35px rgba(0,0,0,0.28), 0 0 28px var(--primary-glow)',
            overflow: 'hidden'
          }}
        >
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              inset: '-6px',
              border: '1px dashed rgba(255,255,255,0.28)',
              borderRadius: '16px',
              mixBlendMode: 'screen'
            }}
          />
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: '50% 50%'
            }}
          >
            <span style={{ 
              width: '7px', 
              height: '7px', 
              borderRadius: '50%', 
              background: 'var(--secondary)', 
              boxShadow: '0 0 14px var(--secondary)', 
              transform: 'translateX(18px)' 
            }} />
          </motion.span>
          <Sparkles size={19} color="white" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }} />
        </motion.div>
        {!collapsed && (
          <div>
            <h2 style={{ fontSize: '1.18rem', fontWeight: 800, letterSpacing: '-0.4px', marginBottom: '2px' }}>Northstar Console</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.2px' }}>Control & Insight</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {sidebarGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            {!collapsed && (
              <p style={{ 
                fontSize: '11px', 
                fontWeight: 700, 
                color: 'var(--text-muted)', 
                letterSpacing: '1px', 
                marginBottom: '12px',
                paddingLeft: '16px'
              }}>
                {translateGroup(group.titleKey, group.title)}
              </p>
            )}
            {group.items
              .filter((item) => hasAccess(item.allowed) && !item.hidden)
              .map((item) => (
              <div key={item.path} style={{ marginBottom: '6px' }}>
                <NavLink
                  to={item.path}
                  title={translateItem(item.labelKey, item.label)}
                  style={({ isActive }) => ({
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: isActive ? 'rgba(34, 211, 238, 0.12)' : 'transparent',
                    borderRadius: '12px',
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 0 0 1px rgba(34,211,238,0.35)' : 'none'
                  })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <item.icon size={18} />
                    {!collapsed && <span style={{ fontSize: '14px' }}>{translateItem(item.labelKey, item.label)}</span>}
                  </div>
                  
                  {!collapsed && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {item.badge && (
                      <span style={{ 
                        fontSize: '10px', 
                        padding: '2px 6px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white',
                        borderRadius: '6px',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                      }}>
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.count}</span>
                    )}
                    {item.children && (
                      <button
                        onClick={(e) => { e.preventDefault(); toggle(item.key); }}
                        aria-label={open[item.key] ? 'Collapse' : 'Expand'}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center'
                        }}
                      >
                        <motion.div animate={{ rotate: open[item.key] ? 180 : 0 }}>
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>
                    )}
                  </div>
                  )}
                </NavLink>

                {item.children && open[item.key] && !collapsed && (
                  <div style={{ paddingLeft: '44px', paddingTop: '6px', display: 'grid', gap: '6px' }}>
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        title={translateItem(child.labelKey, child.label)}
                        style={({ isActive }) => ({
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                          backgroundColor: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                          fontSize: '13px',
                          fontWeight: 500
                        })}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--border)' }} />
                        {translateItem(child.labelKey, child.label)}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? '0' : '12px',
        padding: '12px 16px',
        background: 'transparent',
        border: 'none',
        color: '#ef4444',
        cursor: 'pointer',
        fontWeight: 600
      }}>
        <LogOut size={18} />
        {!collapsed && <span style={{ fontSize: '14px' }}>{translateItem('logout', 'Logout')}</span>}
      </button>
    </div>
  );
};

export default Sidebar;
