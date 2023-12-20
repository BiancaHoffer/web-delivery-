'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { FirebaseError } from 'firebase/app';

import { toast } from 'react-toastify';
import { and, collection, onSnapshot, or, query, where } from 'firebase/firestore';

import Cookie from "js-cookie"

interface AuthContextProps {
  userLogged: boolean;
  loading: boolean;
  user: User | null;
  signIn: (userData: UserSignIn) => void;
  signOutUser: () => void;
  resetPassword: (email: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  password: string;
  type: "user" | "admin";
  address: [];
}

interface UserSignIn {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const refUser = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);

      user?.getIdToken(true).then(idToken => {
        Cookie.set("auth-cookie", idToken);
      })

      if (user) {
        setUserLogged(true);
        ;
      };
    });
  }, []);

  async function signIn(userData: UserSignIn) {
    try {
      setLoading(true);

      const teste = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      setUserLogged(true);
    } catch (error) {
      setLoading(false);
      setUser(null);
      setUserLogged(false);

      const errorCode = error as FirebaseError;

      if (errorCode.code === "auth/invalid-login-credentials") {
        toast.error("Senha ou e-mail não conferem.");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOutUser() {
    try {
      signOut(auth);
      setUser(null);
      setUserLogged(false);
      Cookie.remove("auth-cookie");
    } catch (error) {
      toast.error("Houve um erro. Entre em contato com o administrador.");
    }
  }

  async function resetPassword(email: string) {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.error("Você recebeu um e-mail para redefinir senha. Verifique sua caixa de entrada ou Spam.");
    } catch {
      toast.error("Houve um erro. Entre em contato com o administrador.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      userLogged,
      loading,
      user,
      signIn,
      signOutUser,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}