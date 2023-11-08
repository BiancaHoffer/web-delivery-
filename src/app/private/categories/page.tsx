'use client'

import { IoSearchOutline } from "react-icons/io5";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { TbCategory2 } from "react-icons/tb";

import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Section } from "@/app/components/Section";
import { TitlePage } from "@/app/components/TitlePage";
import { CategoriesList } from "./components/CategoriesList";

import {
  DocumentData,
  collection,
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

export default function Categories() {
  const {
    register,
    formState
  } = useForm();
  const { errors } = formState;

  const [filtered, setFiltered] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [nameCategory, setNameCategory] = useState("");

  const refCategory = collection(db, "category");

  useEffect(() => {
    async function getCategories() {
      const listCategories = [] as any;

      onSnapshot(refCategory, snapshot => {
        snapshot.docs.forEach(doc => {
          const categories = doc.id;
          listCategories.push(categories);
        });
        setCategories(listCategories);
      });
    }
    getCategories();
  }, []);

  useEffect(() => {
    function search() {
      handleSearch();
    };

    search();
  }, [nameCategory])

  function handleSearch() {
    if (nameCategory !== "") {
      const filter = categories.filter(name => name.toLowerCase().includes(nameCategory.toLowerCase()));
      setFiltered(filter);
    }
  };

  function handleCleanFilter() {
    setNameCategory("");
    setFiltered([]);
  }

  return (
    <main>
      <TitlePage
        title="Categorias"
        children={<TbCategory2 />}
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
              onChange={(e) => setNameCategory(e.target.value)}
              value={nameCategory}
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
      <CategoriesList list={nameCategory.length > 0 ? filtered : categories} />
    </main>
  )
}