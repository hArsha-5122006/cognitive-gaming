import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (username, email, password, role, mentorEmail) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      throw new Error('User with this email already exists.');
    }
    users[email] = { username, email, password, role, mentorEmail };
    localStorage.setItem('users', JSON.stringify(users));
    const emailMap = JSON.parse(localStorage.getItem('emailMap') || '{}');
    emailMap[email] = username;
    localStorage.setItem('emailMap', JSON.stringify(emailMap));
    const userData = { username, email, role };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[email];
    if (!userData || userData.password !== password) {
      throw new Error('Invalid email or password.');
    }
    const { username, role } = userData;
    const loggedUser = { username, email, role };
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    return loggedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
