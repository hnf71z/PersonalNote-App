import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, putAccessToken, getUserLogged, login as apiLogin, register as apiRegister } from '../utils/network-data';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthUser(data);
        } else {
          setAuthUser(null);
        }
      }
      setInitializing(false);
    }
    fetchUser();
  }, []);

  const login = async ({ email, password }) => {
    const { error, data, message } = await apiLogin({ email, password });
    if (!error) {
      putAccessToken(data.accessToken);
      const { error: err2, data: user } = await getUserLogged();
      if (!err2) {
        setAuthUser(user);
        return { success: true };
      }
    }
    return { success: false, message: message || 'Login failed' };
  };

  const register = async ({ name, email, password }) => {
    const { error, message } = await apiRegister({ name, email, password });
    return { success: !error, message: message || (error ? 'Registration failed' : 'Registration successful') };
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, initializing, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
