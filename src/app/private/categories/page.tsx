'use client'

import { IoAdd, IoSearchOutline } from "react-icons/io5";

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
import { db } from "@/services/firebase";
import { SkeletonList } from "@/skeletons/SkeletonList";
import { SkeletonTable } from "@/skeletons/SkeletonTable";
import Link from "next/link";

export interface ProductData extends DocumentData {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface CategoryData {
  id: string;
  category: string;
}

export default function Categories() {
  const {
    register,
    formState
  } = useForm();
  const { errors } = formState;

  const [nameCategory, setNameCategory] = useState("");

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [filtered, setFiltered] = useState<CategoryData[]>([]);

  const [loading, setLoading] = useState(true);

  const refCategory = collection(db, "category");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [nameCategory]);

  async function fetchCategories() {
    const listCategories = [] as any;

    onSnapshot(refCategory, snapshot => {
      snapshot.docs.forEach(doc => {
        const categories = doc.data();
        listCategories.push(categories);
      });
      setCategories(listCategories);
      setLoading(false);
    });
  };

  function handleFilter() {
    if (nameCategory !== "") {
      const filter = categories.filter((name) => name.category.toLowerCase().includes(nameCategory.toLowerCase()));
      setFiltered(filter);
    };
  };

  function handleCleanFilter() {
    setNameCategory("");
    setFiltered([]);
  };

  return (
    <main>
      <div className="flex w-full justify-between items-center">
        <TitlePage
          title="Categorias"
          children={<TbCategory2 />}
        />
        <Link href="/private/newCategory">
          <Button
            children={
              <div className="flex gap-2 items-center text-base">
                <IoAdd />
                Nova categoria
              </div>}
            variantBg="orange"
          />
        </Link>
      </div>
      <Section>
        <form
          onSubmit={handleFilter}
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
      {loading
        ? <SkeletonTable />
        : <CategoriesList list={nameCategory.length > 0
          ? filtered
          : categories}
        />
      }
    </main>
  )
}