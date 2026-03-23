import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ✅ REGISTER
  const register = (form) => {
    localStorage.setItem("registeredUser", JSON.stringify(form));
  };

  // ✅ LOGIN (STRICT CHECK)
  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem("registeredUser"));

    if (!saved) {
      return "no_user";   // ❌ no register
    }

    if (saved.email !== email || saved.password !== password) {
      return "invalid";  // ❌ wrong login
    }

    setUser(saved);
    localStorage.setItem("user", JSON.stringify(saved));
    return "success";
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};