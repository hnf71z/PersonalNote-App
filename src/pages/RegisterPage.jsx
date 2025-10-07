import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirm, onConfirmChange] = useInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, authUser } = useAuth();
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      showError('Password and confirm password do not match');
      return;
    }
    setLoading(true);
    const result = await register({ name, email, password });
    setLoading(false);
    
    if (result.success) {
      showSuccess('Registration successful! Please login with your account.');
      navigate('/login');
    } else {
      showError(result.message || 'Registration failed');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__image" data-aos="fade-right">
          <div className="auth-page__overlay"></div>
          <div className="auth-page__welcome">
            <h2>{t('createAccount')}</h2>
            <p>{t('createAccountMessage')}</p>
          </div>
        </div>
        <div className="auth-page__form" data-aos="fade-left">
          <h2><i className="fa-solid fa-user-plus"></i> {t('register')}</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="name">{t('name')}</label>
              <input id="name" type="text" value={name} onChange={onNameChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('email')}</label>
              <input id="email" type="email" value={email} onChange={onEmailChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <input id="password" type="password" value={password} onChange={onPasswordChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">{t('confirmPassword')}</label>
              <input id="confirm" type="password" value={confirm} onChange={onConfirmChange} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-register-primary" disabled={loading}>{loading ? 'Loading...' : (<><i className="fa-solid fa-user-plus"></i> {t('register')}</>)}</button>
            </div>
          </form>
          <p className="auth-page__switch">
            {t('alreadyHaveAccount')} <Link to="/login">{t('loginHere')}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
