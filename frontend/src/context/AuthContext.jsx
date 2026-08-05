import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import api from "../services/api";
import axios from "axios"; // 👈 ADD THIS IMPORT

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "https://avocado-web-admin-2.onrender.com/api"; // 👈 ADD THIS

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    const token = localStorage.getItem("token");
    console.log("🔍 AuthProvider - Token found:", !!token);
    
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        try {
          const adminData = JSON.parse(storedAdmin);
          console.log("✅ Stored admin found:", adminData);
          setAdmin(adminData);
          setLoading(false);
          return;
        } catch (e) {
          console.error("Error parsing stored admin:", e);
          localStorage.removeItem("admin");
        }
      }
      
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log("✅ Stored user found:", userData);
          setUser(userData);
          setLoading(false);
          return;
        } catch (e) {
          console.error("Error parsing stored user:", e);
          localStorage.removeItem("user");
        }
      }
      
      verifyToken();
    } else {
      console.log("🔍 No token found, setting loading to false");
      setLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      console.log("🔍 Token verification response:", res.data);
      
      if (res.data.success) {
        const userData = res.data.user;
        if (userData.role === "admin") {
          setAdmin(userData);
          localStorage.setItem("admin", JSON.stringify(userData));
        } else {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (email, password) => {
  try {
    console.log("🔑 Attempting admin login for:", email);
    
    // ✅ FIXED: Match your backend route exactly
    const response = await axios.post(`${API_URL}/auth/admin/login`, { email, password });
    console.log("📦 Admin login response:", response.data);
    
    if (response.data.success) {
      const { token, admin: adminData } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(adminData));
      localStorage.removeItem("user");
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      console.log("👤 Admin data:", adminData);
      setAdmin(adminData);
      setUser(null);
      
      console.log("✅ Admin state updated:", adminData);
      return response.data;
    }
  } catch (error) {
    console.error("❌ Admin login error:", error);
    throw error;
  }
}, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem("token", token);
      localStorage.removeItem("admin");
      localStorage.setItem("user", JSON.stringify(user));
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setAdmin(null);
      
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      const res = await api.post("/auth/signup", userData);
      const { token, user } = res.data;
      
      localStorage.setItem("token", token);
      localStorage.removeItem("admin");
      localStorage.setItem("user", JSON.stringify(user));
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setAdmin(null);
      
      return res.data;
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setAdmin(null);
    console.log("✅ Logged out");
  }, []);

  const isAdmin = useMemo(() => !!admin, [admin]);
  const isAuthenticated = useMemo(() => !!user || !!admin, [user, admin]);

  const value = useMemo(() => ({
    user,
    admin,
    login,
    adminLogin,
    signup,
    logout,
    loading,
    isAdmin,
    isAuthenticated,
  }), [user, admin, login, adminLogin, signup, logout, loading, isAdmin, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}