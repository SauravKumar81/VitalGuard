import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextType {
  user: { name: string; role: string } | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  
  // Check if user is logged in on mount (simple persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem("vitalguard_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    // Mock login logic
    const mockUser = {
      name: "Dr. Sarah Smith",
      role: "Chief Cardiologist",
      email: email
    };
    setUser(mockUser);
    localStorage.setItem("vitalguard_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vitalguard_user");
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
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
