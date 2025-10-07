const showFormattedDate = (date, lang) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  return new Date(date).toLocaleDateString(locale, options);
};

export { showFormattedDate };
