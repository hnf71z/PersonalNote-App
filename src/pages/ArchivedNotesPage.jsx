import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import NotesList from '../components/NotesList';
import SearchBar from '../components/SearchBar';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';

const MySwal = withReactContent(Swal);

function ArchivedNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });
  const { t } = useLanguage();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
      } else {
        showError(t('fetchNotesError'));
      }
      setLoading(false);
    }

    fetchNotes();
  }, [t, showError]);

  const onKeywordChangeHandler = (newKeyword) => {
    setKeyword(newKeyword);
    setSearchParams(newKeyword ? { keyword: newKeyword } : {});
  };

  const onDeleteHandler = (id) => {
    MySwal.fire({
      title: t('deleteConfirmation'),
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: t('yesDeleteIt'),
      cancelButtonText: t('cancel'),
      background: 'var(--surface)',
      color: 'var(--on-surface)',
      customClass: {
        popup: 'swal-popup-simple',
        title: 'swal-title-simple',
        actions: 'swal-actions-simple',
        confirmButton: 'swal-confirm-simple',
        cancelButton: 'swal-cancel-simple',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNote(id);
        showSuccess(t('noteDeleted'));
        const { error, data } = await getArchivedNotes();
        if (!error) {
          setNotes(data);
        }
      }
    });
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    showSuccess(t('noteUnarchived'));
    const { error, data } = await getArchivedNotes();
    if (!error) {
      setNotes(data);
    }
  };

  if (loading) {
    return (
      <section className="archived-page">
        <h2>{t('archived')}</h2>
        <div className="loading">
          <i className="fa-solid fa-spinner fa-spin"></i> {t('loading')}
        </div>
      </section>
    );
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archived-page">
      <h2>{t('archived')}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onUnarchive={onUnarchiveHandler}
        showArchiveButtons={true}
      />
    </section>
  );
}

export default ArchivedNotesPage;