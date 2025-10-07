import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message) => showToast(message, 'success');
  const showError = (message) => showToast(message, 'error');
  const showInfo = (message) => showToast(message, 'info');
  const showWarning = (message) => showToast(message, 'warning');

  return (
    <ToastContext.Provider value={{
      toasts,
      showToast,
      showSuccess,
      showError,
      showInfo,
      showWarning,
      removeToast
    }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => onRemove(toast.id)}
        >
          <div className="toast__icon">
            {toast.type === 'success' && <i className="fa-solid fa-check-circle"></i>}
            {toast.type === 'error' && <i className="fa-solid fa-times-circle"></i>}
            {toast.type === 'warning' && <i className="fa-solid fa-exclamation-triangle"></i>}
            {toast.type === 'info' && <i className="fa-solid fa-info-circle"></i>}
          </div>
          <div className="toast__message">{toast.message}</div>
          <button className="toast__close" onClick={() => onRemove(toast.id)}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}