'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  collection,
  doc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";

import { db } from '../services/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  products: ProductData[];
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
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const refProduct = collection(db, "product");

  useEffect(() => {
    async function getProductByCategory() {
      const listProducts = [] as any;

      onSnapshot(refProduct, snapshot => {
        snapshot.docs.forEach(doc => {
          const products = doc.data();
          listProducts.push(products);
        });
        setProducts(listProducts);
        setCheckingStatus(!checkingStatus);
      })
    }

    getProductByCategory();
  }, [checkingStatus]);



  async function deleteProduct(id: string) {
    await deleteDoc(doc(db, "product", id));
    setCheckingStatus(!checkingStatus);
  }

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      deleteProduct,
      checkingStatus,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext);

  return context;
}