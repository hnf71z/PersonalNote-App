import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, authUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (authUser) {
      navigate(from, { replace: true });
    }
  }, [authUser, navigate, from]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);
    
    if (result.success) {
      showSuccess('Login successful!');
      navigate(from, { replace: true });
    } else {
      showError(result.message || 'Login failed');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__image" data-aos="fade-right">
          <div className="auth-page__overlay"></div>
          <div className="auth-page__welcome">
            <h2>{t('welcomeBack')}</h2>
            <p>{t('welcomeBackMessage')}</p>
          </div>
        </div>
        <div className="auth-page__form" data-aos="fade-left">
          <h2><i className="fa-solid fa-right-to-bracket"></i> {t('login')}</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input id="email" type="email" value={email} onChange={onEmailChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input id="password" type="password" value={password} onChange={onPasswordChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-login-primary" disabled={loading}>{loading ? 'Loading...' : (<><i className="fa-solid fa-right-to-bracket"></i> {t('login')}</>)}</button>
            </div>
          </form>
          <p className="auth-page__switch">
            {t('dontHaveAccount')} <Link to="/register">{t('registerHere')}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
