import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { createContext, type ReactNode, useCallback, useEffect, useState } from "react";

const TOKEN_KEY = "auth_token";

SplashScreen.preventAutoHideAsync().catch(() => {});

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isTransitioning: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  isLoading: true,
  isAuthenticated: false,
  isTransitioning: false,
  signIn: async () => {
    throw new Error("useAuth must be used within AuthProvider");
  },
  signOut: async () => {
    throw new Error("useAuth must be used within AuthProvider");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        setTokenState(storedToken);
      } catch {
        setTokenState(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        SplashScreen.hideAsync().catch(() => {});
      }, 100);
    }
  }, [isLoading]);

  const signIn = useCallback(async (newToken: string) => {
    try {
      setIsTransitioning(true);
      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      setTokenState(newToken);
      setIsTransitioning(false);
    } catch (error) {
      setIsTransitioning(false);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsTransitioning(true);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setTokenState(null);
      setIsTransitioning(false);
    } catch (error) {
      setIsTransitioning(false);
      throw error;
    }
  }, []);

  const value: AuthContextData = {
    token,
    isLoading,
    isAuthenticated: !!token,
    isTransitioning,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
