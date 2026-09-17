import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCurrentUser, UserResponse } from "@/services/api/auth";

import { setUnauthorizedHandler } from "@/services/api/client";

import {
    deleteToken,
    getToken,
    saveToken,
} from "@/services/storage/authStorage";

type SessionContextType = {
  token: string | null;
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // React to 401 responses anywhere in the app
  useEffect(() => {
    setUnauthorizedHandler(() => {
      void deleteToken();

      setToken(null);
      setUser(null);
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, []);

  // Restore and validate session when app starts
  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const storedToken = await getToken();

        if (!storedToken) {
          return;
        }

        // The Axios interceptor automatically sends storedToken.
        // Backend verifies it through /users/me.
        const currentUser = await getCurrentUser();

        if (!active) {
          return;
        }

        setToken(storedToken);
        setUser(currentUser);
      } catch {
        if (active) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const signIn = async (newToken: string) => {
    await saveToken(newToken);

    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
      setToken(newToken);
    } catch (error) {
      await deleteToken();

      setToken(null);
      setUser(null);

      throw error;
    }
  };

  const signOut = async () => {
    await deleteToken();

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = token !== null && user !== null;

  return (
    <SessionContext.Provider
      value={{
        token,
        user,
        isLoading,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("useSession must be used inside a SessionProvider");
  }

  return context;
}
/*
my architecture is becoming :

SessionProvider
                         │
          ┌──────────────┼───────────────┐
          ↓              ↓               ↓
       Login          Router           Profile
          │              │               │
       signIn()    isAuthenticated     signOut()

*/
