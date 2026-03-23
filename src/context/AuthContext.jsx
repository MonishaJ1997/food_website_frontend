import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged in user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Register a new user
  const register = (form) => {
    localStorage.setItem("registeredUser", JSON.stringify(form));
    return { success: true };
  };

  // Login user
  // LOGIN
const login = (email, password) => {
  const saved = JSON.parse(localStorage.getItem("registeredUser"));

  if (!saved) {
    return { success: false, reason: "not_registered" }; // ❌ no user
  }

  if (saved.email !== email) {
    return { success: false, reason: "not_registered" }; // ❌ email not found
  }

  if (saved.password !== password) {
    return { success: false, reason: "wrong_password" }; // ❌ password wrong
  }

  // ✅ successful login
  setUser(saved);
  localStorage.setItem("user", JSON.stringify(saved));
  return { success: true };
};

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};