// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");
    
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      if (storedAdmin) {
        setLoading(false);
      } else {
        api
          .get("/auth/me")
          .then((res) => {
            if (res.data.success) {
              setUser(res.data.user);
            }
          })
          .catch(() => {
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
          })
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Regular user login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.removeItem("admin");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setAdmin(null);
    return res.data;
  };

  // Admin login - uses separate endpoint
  const adminLogin = async (email, password) => {
    const res = await api.post("/auth/admin/login", { email, password });
    const { token, admin } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAdmin(admin);
    setUser(null);
    return res.data;
  };

  const signup = async (userData) => {
    const res = await api.post("/auth/signup", userData);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.removeItem("admin");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setAdmin(null);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setAdmin(null);
  };

  const value = {
    user,
    admin,
    login,
    adminLogin,
    signup,
    logout,
    loading,
    isAdmin: !!admin,
    isAuthenticated: !!user || !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}