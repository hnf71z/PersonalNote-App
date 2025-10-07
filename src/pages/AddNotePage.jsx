import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

function AddNotePage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onBodyInputHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await addNote({ title, body });
    setLoading(false);
    
    if (!result.error) {
      showSuccess('Note added successfully!');
      navigate('/');
    } else {
      showError('Failed to add note');
    }
  };

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <form onSubmit={onSubmitEventHandler}>
          <input
            className="add-new-page__input__title"
            type="text"
            placeholder={t('enterTitle')}
            value={title}
            onChange={onTitleChangeHandler}
            required
          />
          <div
            className="add-new-page__input__body"
            data-placeholder={t('writeNote')}
            contentEditable
            onInput={onBodyInputHandler}
            suppressContentEditableWarning={true}
          />
          <div className="add-new-page__action">
            <button type="submit" disabled={loading}>
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> {t('saving')}</>
              ) : (
                <><i className="fa-solid fa-save"></i> {t('save')}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddNotePage;