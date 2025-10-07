import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NotesPage from './pages/NotesPage';
import ArchivedNotesPage from './pages/ArchivedNotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <Router>
            <div className="app-container">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <NotesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes"
                    element={
                      <ProtectedRoute>
                        <NotesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes/new"
                    element={
                      <ProtectedRoute>
                        <AddNotePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes/:id"
                    element={
                      <ProtectedRoute>
                        <NoteDetailPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/archived"
                    element={
                      <ProtectedRoute>
                        <ArchivedNotesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
            </Router>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
