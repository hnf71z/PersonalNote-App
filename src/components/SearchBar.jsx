import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function SearchBar({ keyword, keywordChange }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      keywordChange(query);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [query, keywordChange]);

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder={t('searchNotes')}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;