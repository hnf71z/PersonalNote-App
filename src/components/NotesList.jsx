import React from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';

function NotesList({ notes, onDelete, onArchive, onUnarchive, showArchiveButtons = false }) {
  const { t, lang } = useLanguage();

  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{showArchiveButtons ? t('emptyArchive') : t('noNotes')}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <div className="note-item__content">
            <Link to={`/notes/${note.id}`} className="note-item__title">
              {note.title}
            </Link>
            <p className="note-item__date">{showFormattedDate(note.createdAt, lang)}</p>
            <div className="note-item__body">
              {parser(note.body)}
            </div>
          </div>
          <div className="note-item__actions">
            <button
              className="note-item__delete-button"
              onClick={() => onDelete(note.id)}
            >
              <i className="fa-solid fa-trash"></i> {t('delete')}
            </button>
            {showArchiveButtons ? (
              <button
                className="note-item__archive-button"
                onClick={() => onUnarchive(note.id)}
              >
                <i className="fa-solid fa-box-open"></i> {t('move')}
              </button>
            ) : (
              <button
                className="note-item__archive-button"
                onClick={() => onArchive(note.id)}
              >
                <i className="fa-solid fa-archive"></i> {t('archive')}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;