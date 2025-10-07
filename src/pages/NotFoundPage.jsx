import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="not-found">
      <h2>404</h2>
      <p>{t('notFound')}</p>
      <Link to="/">
        <button><i className="fa-solid fa-home"></i> {t('backToHome')}</button>
      </Link>
    </section>
  );
}

export default NotFoundPage;