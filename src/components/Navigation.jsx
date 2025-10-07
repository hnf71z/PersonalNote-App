import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

function Navigation() {
  const location = useLocation();
  const { authUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang, lang } = useLanguage();

  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <Link to="/"><i className="fa-solid fa-note-sticky"></i> Personal Notes</Link>
      </div>
      <div className="navigation__links">
        <Link 
          to="/" 
          className={location.pathname === '/' || location.pathname === '/notes' ? 'active' : ''}
        >
          <i className="fa-solid fa-list"></i> {t('activeNotes')}
        </Link>
        <Link 
          to="/archived" 
          className={location.pathname === '/archived' ? 'active' : ''}
        >
          <i className="fa-solid fa-archive"></i> {t('archived')}
        </Link>
        <Link 
          to="/notes/new" 
          className={`add-button ${location.pathname === '/notes/new' ? 'active' : ''}`}
        >
          <i className="fa-solid fa-plus"></i> {t('addNote')}
        </Link>
        <button type="button" className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? <i className="fa-solid fa-moon" /> : <i className="fa-solid fa-sun" />}
        </button>
        <button type="button" className="lang-toggle" onClick={toggleLang} title="Toggle language">
          {lang === 'id' ? 'ID' : 'EN'}
        </button>

        {authUser ? (
          <>
            <span className="nav-user">{authUser.name}</span>
            <button type="button" className="button-logout" onClick={logout} title={t('logout')}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
          </>
        ) : (
          <>
            <Link to="/login"><i className="fa-solid fa-right-to-bracket"></i> {t('login')}</Link>
            <Link to="/register"><i className="fa-solid fa-user-plus"></i> {t('register')}</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;