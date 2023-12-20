'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  getDocs
} from "firebase/firestore";

import { db } from '../services/firebase';
import { toast } from 'react-toastify';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  loading: boolean;
  deleteProduct: (id: string) => Promise<void>;
  checkingStatus: boolean;
}

export interface ProductData {
  id: string;
  product: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export const ProductContext = createContext({} as AuthContextProps);

export function ProductProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  async function deleteProduct(id: string) {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "product", id));
      setCheckingStatus(!checkingStatus);

      toast.error("Produto excluido com sucesso!", {
        position: "top-right",
        autoClose: 9000,
        theme: "colored"
      });
    } catch {
      toast.error("Houve um erro ao exlucar o produto. Entre em contato com o administrador.", {
        position: "top-right",
        autoClose: 9000,
        theme: "colored"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProductContext.Provider value={{
      loading,
      deleteProduct,
      checkingStatus
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext);

  return context;
}