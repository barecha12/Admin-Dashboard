import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Bell, User, Sun, Moon, Menu, Plus, Mail, CheckSquare, Globe2, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { languages, translations } from '../../config/i18n';

/**
 * Professional Header Component with popovers, translations, and theme control
 */
const Header = ({ 
  collapsed = false, 
  onToggleSidebar = () => {}, 
  onToggleTheme = () => {}, 
  theme = 'dark', 
  sidebarWidth = 'var(--sidebar-width)',
  language = 'EN',
  onChangeLanguage = () => {}
}) => {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const [search, setSearch] = useState('');
  const [quickOpen, setQuickOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const activeLang = useMemo(
    () => languages.find((l) => l.code === language) || languages[0],
    [language]
  );
  const t = translations[activeLang.code]?.header || translations.EN.header;
  const renderFlag = (flag, size = 16) => (
    flag?.startsWith('data:image')
      ? <img src={flag} alt="" style={{ width: `${size}px`, height: `${size * 0.75}px`, objectFit: 'cover', borderRadius: '4px', boxShadow: '0 0 6px rgba(0,0,0,0.15)' }} />
      : <span style={{ fontSize: `${size}px` }}>{flag || '🏳️'}</span>
  );

  const quickActions = useMemo(() => ([
    { key: 'createUser', fallback: 'Create user', path: '/users' },
    { key: 'newProduct', fallback: 'New product', path: '/products' },
    { key: 'createOrder', fallback: 'Create order', path: '/orders' },
    { key: 'newCampaign', fallback: 'New campaign', path: '/marketing/campaigns' },
    { key: 'openAnalytics', fallback: 'Open analytics', path: '/analytics' },
  ]), []);

  const notifications = useMemo(() => ([
    { id: 1, title: 'New order received', meta: 'Order #9843', unread: true },
    { id: 2, title: 'User invited', meta: 'Mila added to Managers', unread: true },
    { id: 3, title: 'System backup success', meta: '00:14 UTC', unread: true },
  ]), []);

  const tasks = [
    { id: 1, title: 'Approve 3 refunds', status: 'Pending' },
    { id: 2, title: 'Review error logs', status: 'Pending' },
    { id: 3, title: 'Ship release notes', status: 'In progress' },
  ];

  const closeAllPopovers = () => {
    setQuickOpen(false);
    setNotifOpen(false);
    setTasksOpen(false);
    setLangOpen(false);
  };

  const handleQuickSelect = (path) => {
    closeAllPopovers();
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    closeAllPopovers();
    navigate('/analytics', { state: { q: search } });
  };

  const handleMarkNotifications = () => {
    setUnreadCount(0);
    setNotifOpen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Close popovers on outside click or Escape
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeAllPopovers();
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeAllPopovers();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      style={{
        height: 'var(--header-height)',
        position: 'fixed',
        top: 0,
        right: 0,
        left: sidebarWidth,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 90,
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
      }}
    >
      {/* Search Bar + Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '320px' }}>
        <button
          title="Toggle sidebar"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          aria-expanded={collapsed ? 'false' : 'true'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)'
          }}>
          <Menu size={18} />
        </button>
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '12px 12px 12px 46px',
              color: 'var(--text-main)',
              outline: 'none',
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </form>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
        <button
          title={t.quick}
          aria-label={t.quick}
          aria-expanded={quickOpen}
          onClick={() => { setQuickOpen((o) => !o); setNotifOpen(false); setTasksOpen(false); setLangOpen(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            border: 'none',
            color: 'white',
            fontWeight: 700,
            padding: '10px 14px',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
          <Plus size={18} />
          {t.quick}
        </button>
        {quickOpen && (
          <div className="popover-card" style={{ right: 180, top: '64px', minWidth: '220px' }}>
            {quickActions.map((action) => (
              <button key={action.key} className="popover-item" onClick={() => handleQuickSelect(action.path)}>
                {t.quickActions?.[action.key] || action.fallback}
              </button>
            ))}
          </div>
        )}
        
        <button title={t.theme} aria-label={t.theme} onClick={onToggleTheme} style={{ 
          background: theme === 'light' ? 'rgba(37,99,235,0.12)' : 'rgba(34,211,238,0.08)', 
          border: '1px solid rgba(34,211,238,0.2)', 
          color: 'var(--text-main)', 
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'grid',
          placeItems: 'center'
        }}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button
            title={t.language}
            aria-label={t.language}
            aria-expanded={langOpen}
            onClick={() => { setLangOpen((o) => !o); setNotifOpen(false); setQuickOpen(false); setTasksOpen(false); }}
            style={{ 
              background: 'rgba(34,211,238,0.08)', 
              border: '1px solid rgba(34,211,238,0.2)', 
              color: 'var(--text-main)', 
              cursor: 'pointer',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              display: 'grid',
              placeItems: 'center',
              position: 'relative',
              padding: 0
            }}>
            {renderFlag(activeLang.flag, 22)}
            <span style={{ position: 'absolute', bottom: '-10px', fontSize: '10px', color: 'var(--text-muted)' }}>{activeLang.code}</span>
          </button>
          {langOpen && (
            <div className="popover-card" style={{ right: -20, top: '64px', minWidth: '220px' }}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="popover-item"
                  onClick={() => { onChangeLanguage(lang.code); setLangOpen(false); }}
                >
                  <span style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>{renderFlag(lang.flag, 16)}</span>
                  <span style={{ width: '40px', fontWeight: 700 }}>{lang.code}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{lang.sample}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          title={t.notif}
          aria-label={t.notif}
          aria-expanded={notifOpen}
          onClick={() => { setNotifOpen((o) => !o); setQuickOpen(false); setTasksOpen(false); setLangOpen(false); }}
          style={{ position: 'relative', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <Bell size={20} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              minWidth: '16px',
              height: '16px',
              padding: '0 4px',
              backgroundColor: 'var(--primary)',
              borderRadius: '999px',
              border: '2px solid var(--bg-dark)',
              color: 'white',
              fontSize: '10px',
              display: 'grid',
              placeItems: 'center'
            }}>{unreadCount}</span>
          )}
        </button>
        {notifOpen && (
          <div className="popover-card" style={{ right: 110, top: '64px', minWidth: '260px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 700 }}>{t.notif}</span>
              <button className="text-button" onClick={handleMarkNotifications}>{t.mark}</button>
            </div>
            {notifications.map((n) => (
              <div key={n.id} className="popover-item" style={{ alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600 }}>{n.title}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{n.meta}</p>
                </div>
                {n.unread && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />}
              </div>
            ))}
          </div>
        )}

        <button title="Messages" aria-label="Messages" onClick={closeAllPopovers} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <Mail size={20} />
        </button>

        <button title={t.tasks} aria-label={t.tasks} aria-expanded={tasksOpen} onClick={() => { setTasksOpen((o) => !o); setQuickOpen(false); setNotifOpen(false); setLangOpen(false); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <CheckSquare size={20} />
        </button>
        {tasksOpen && (
          <div className="popover-card" style={{ right: 60, top: '64px', minWidth: '240px' }}>
            <p style={{ fontWeight: 700, marginBottom: '8px' }}>{t.tasks}</p>
            {tasks.map((titem) => (
              <div key={titem.id} className="popover-item" style={{ justifyContent: 'space-between' }}>
                <span>{titem.title}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{titem.status}</span>
              </div>
            ))}
          </div>
        )}

        <button title="Fullscreen" aria-label="Fullscreen" onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <Maximize2 size={20} />
        </button>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border)' }}></div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={20} color="white" />
          </div>
          <div className="profile-info">
            <p style={{ fontSize: '14px', fontWeight: 600 }}>Alex Rivers</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
