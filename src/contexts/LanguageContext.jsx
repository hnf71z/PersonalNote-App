import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    activeNotes: 'Active Notes',
    archived: 'Archived',
    addNote: 'Add Note',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dark: 'Dark',
    light: 'Light',
    loading: 'Loading...',
    saving: 'Saving...',
    save: 'Save',
    delete: 'Delete',
    archive: 'Archive',
    unarchive: 'Unarchive',
    move: 'Move',
    searchNotes: 'Search notes...',
    enterTitle: 'Enter note title...',
    writeNote: 'Write your note here...',
    noNotes: 'No notes available',
    emptyArchive: 'Archive is empty',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    noteTitle: 'Note Title',
    noteContent: 'Note Content',
    createdAt: 'Created at',
    notFound: 'Page not found',
    backToHome: 'Back to Home',
    deleteConfirmation: 'Are you sure you want to delete it?',
    yesDeleteIt: 'Delete',
    cancel: 'Cancel',
    noteDeleted: 'Note deleted successfully',
    noteArchived: 'Note archived successfully',
    noteUnarchived: 'Note unarchived successfully',
    fetchNotesError: 'Failed to fetch notes',
    welcomeBack: 'Welcome Back!',
    welcomeBackMessage: 'Sign in to continue to your notes.',
    dontHaveAccount: "Don't have an account?",
    registerHere: 'Register here',
    createAccount: 'Create Your Account',
    createAccountMessage: 'Start your journey with us today.',
    alreadyHaveAccount: 'Already have an account?',
    loginHere: 'Login here',
  },
  id: {
    activeNotes: 'Catatan Aktif',
    archived: 'Arsip',
    addNote: 'Tambah Catatan',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dark: 'Gelap',
    light: 'Terang',
    loading: 'Memuat...',
    saving: 'Menyimpan...',
    save: 'Simpan',
    delete: 'Hapus',
    archive: 'Arsipkan',
    unarchive: 'Pindahkan',
    move: 'Pindahkan',
    searchNotes: 'Cari catatan...',
    enterTitle: 'Masukkan judul catatan...',
    writeNote: 'Tulis catatan Anda di sini...',
    noNotes: 'Tidak ada catatan',
    emptyArchive: 'Arsip kosong',
    name: 'Nama',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Konfirmasi Password',
    noteTitle: 'Judul Catatan',
    noteContent: 'Isi Catatan',
    createdAt: 'Dibuat pada',
    notFound: 'Halaman tidak ditemukan',
    backToHome: 'Kembali ke Beranda',
    deleteConfirmation: 'Apakah anda yakin ingin menghapusnya?',
    yesDeleteIt: 'Hapus',
    cancel: 'Batal',
    noteDeleted: 'Catatan berhasil dihapus',
    noteArchived: 'Catatan berhasil diarsipkan',
    noteUnarchived: 'Catatan berhasil dipindahkan',
    fetchNotesError: 'Gagal memuat catatan',
    welcomeBack: 'Selamat Datang Kembali!',
    welcomeBackMessage: 'Masuk untuk melanjutkan ke catatan Anda.',
    dontHaveAccount: 'Belum punya akun?',
    registerHere: 'Daftar di sini',
    createAccount: 'Buat Akun Anda',
    createAccountMessage: 'Mulailah perjalanan Anda bersama kami hari ini.',
    alreadyHaveAccount: 'Sudah punya akun?',
    loginHere: 'Login di sini',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  const toggleLang = () => setLang((l) => (l === 'id' ? 'en' : 'id'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
