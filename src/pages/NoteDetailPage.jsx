import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const { t, lang } = useLanguage();
  const { showSuccess } = useToast();

  useEffect(() => {
    let mounted = true;
    async function fetchNote() {
      const { error, data } = await getNote(id);
      if (error) {
        navigate('/404', { replace: true });
        return;
      }
      if (mounted) setNote(data);
    }

    fetchNote();

    return () => { mounted = false; };
  }, [id, navigate]);

  const onDeleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
      showSuccess('Note deleted successfully!');
      navigate('/');
    }
  };

  const onArchiveHandler = async () => {
    await archiveNote(id);
    showSuccess('Note archived successfully!');
    navigate('/');
  };

  const onUnarchiveHandler = async () => {
    await unarchiveNote(id);
    showSuccess('Note unarchived successfully!');
    navigate('/');
  };

  if (!note) {
    return (
      <section className="detail-page">
        <div className="loading">
          <i className="fa-solid fa-spinner fa-spin"></i> {t('loading')}
        </div>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt, lang)}</p>
      <div className="detail-page__body">
        {parser(note.body)}
      </div>
      <div className="detail-page__action">
        {note.archived ? (
          <button 
            className="action" 
            type="button" 
            onClick={onUnarchiveHandler}
          >
            <i className="fa-solid fa-box-open"></i> {t('move')}
          </button>
        ) : (
          <button 
            className="action" 
            type="button" 
            onClick={onArchiveHandler}
          >
            <i className="fa-solid fa-archive"></i> {t('archive')}
          </button>
        )}
        <button 
          className="action" 
          type="button" 
          onClick={onDeleteHandler}
        >
          <i className="fa-solid fa-trash"></i> {t('delete')}
        </button>
      </div>
    </section>
  );
}

export default NoteDetailPage;