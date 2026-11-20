import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getStoredUser,
  isAuthenticated,
  type RegisterData,
} from "../api/authApi";
import type { LoginCredentials, User } from "../types";

interface AuthContextValue {
  user: Omit<User, "password"> | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser());
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { user: loggedUser } = await apiLogin(credentials);
    setUser(loggedUser);
  };

  const register = async (data: RegisterData) => {
    const { user: newUser } = await apiRegister(data);
    setUser(newUser);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}