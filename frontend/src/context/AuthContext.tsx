import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextType {
  user: { name: string; role: string; email?: string; token?: string } | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string; email?: string; token?: string } | null>(null);
  
  // Check if user is logged in on mount (simple persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem("vitalguard_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password?: string) => {
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Backend expects { username: "...", password: "..." }
        body: JSON.stringify({ 
          username: email, 
          password: password 
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      
      const user = {
        name: data.username || email.split("@")[0], 
        role: data.role || "Doctor",
        email: email,
        token: data.access_token
      };

      setUser(user);
      localStorage.setItem("vitalguard_user", JSON.stringify(user));
      localStorage.setItem("vitalguard_token", data.access_token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vitalguard_user");
    localStorage.removeItem("vitalguard_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Component to protect routes
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
