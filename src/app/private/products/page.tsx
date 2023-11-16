'use client'

import {
  IoFastFoodOutline,
  IoSearchOutline,
} from "react-icons/io5";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Section } from "@/app/components/Section";
import { TitlePage } from "@/app/components/TitlePage";
import { InputSelect } from "@/app/components/InputSelect";
import { ProductsList } from "@/app/private/products/components/ProductsList";

import {
  DocumentData,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/services/firebase";

export interface ProductData extends DocumentData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export default function Products() {
  const {
    register,
    formState
  } = useForm();
  const { errors } = formState;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [filtered, setFiltered] = useState<ProductData[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const [selected, setSelected] = useState("Selecionar categoria");
  const [nameProduct, setNameProduct] = useState("");

  const [loadingProducts, setLoadigProducts] = useState(false)

  const refProduct = collection(db, "product");
  const refCategory = collection(db, "category");

  useEffect(() => {
    async function getDocsCategory() {
      let listCatories = [] as string[];

      await getDocs(refCategory)
        .then((docs) => {
          docs.forEach((doc) => {
            listCatories.push(doc.id);
          });
        });
      setCategories(listCatories);
    }
    getDocsCategory();
  }, []);

  useEffect(() => {
    async function getProductByCategory() {
      const listProducts = [] as any;
      try {
        setLoadigProducts(true)
        onSnapshot(refProduct, snapshot => {
          snapshot.docs.forEach(doc => {
            const products = doc.data();
            listProducts.push(products);
          });
          setProducts(listProducts);
        });
      } catch {

      } finally {
        setLoadigProducts(false)
      }
    }
    getProductByCategory();
  }, []);

  useEffect(() => {
    function search() {
      handleSearch();
    };

    search();
  }, [nameProduct, selected])

  function handleSearch() {
    if (selected !== "Selecionar categoria") {
      const filter = products.filter((e) => e.category.includes(selected));
      setFiltered(filter);
    }

    if (nameProduct !== "") {
      const filter = products.filter((e) => e.name.toLowerCase().includes(nameProduct.toLowerCase()));
      setFiltered(filter);
    }

    if (nameProduct !== "" && selected !== "Selecionar categoria") {
      const filter = products.filter((e) => e.name.toLowerCase().includes(nameProduct.toLowerCase()) && e.category.includes(selected));
      setFiltered(filter);
    }

    return;
  };

  function handleCleanFilter() {
    setNameProduct("");
    setSelected("Selecionar categoria");
    setFiltered([]);
  }

  return (
    <main>
      <TitlePage
        title="Produtos"
        children={<IoFastFoodOutline />}
      />
      <Section>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 w-full items-end"
        >
          <fieldset className="w-[100%] flex flex-col">
            <legend className="mb-2 text-zinc-900 font-medium sm:w-full text-sm ">
              Pesquisar por nome
            </legend>
            <Input
              icon={<IoSearchOutline />}
              name="search"
              register={register}
              errors={errors}
              activeErrors={false}
              placeholder="Pesquisar..."
              onChange={(e) => setNameProduct(e.target.value)}
              value={nameProduct}
            />
          </fieldset>
          <span className="text-zinc-400 flex w-[40px] items-center justify-center pb-3">
            e/ou
          </span>
          <fieldset className="w-[100%] gap-2 flex flex-col">
            <legend className="text-zinc-900 font-medium sm:w-full mb-2 text-sm">
              Categoria do produto
            </legend>
            <InputSelect
              list={categories}
              selected={selected}
              setSelected={setSelected}
            />
          </fieldset>
          <Button
            type="button"
            children="Limpar"
            variantBg="gray"
            onClick={handleCleanFilter}
          />
        </form>
      </Section>
      <ProductsList list={nameProduct.length > 0 || selected !== "Selecionar categoria" ? filtered : products} />
    </main>
  )
}