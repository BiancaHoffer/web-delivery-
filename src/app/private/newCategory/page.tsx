'use client'

import { useEffect, useState } from "react";

import { IoAdd } from "react-icons/io5";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Section } from "@/app/components/Section";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { TitlePage } from "@/app/components/TitlePage";

import { toast } from 'react-toastify';

import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import { Loading } from "@/app/components/Loading";

const createNewProductFormSchema = z.object({
  name: z.string().nonempty("Nome da categoria obrigatório"),
})

export type CreateNewProductFormData = z.infer<typeof createNewProductFormSchema>

export default function NewCategory() {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<CreateNewProductFormData>({
    resolver: zodResolver(createNewProductFormSchema),
    defaultValues: {
      name: "",
    }
  });

  const refCategory = collection(db, "category");

  useEffect(() => {
    async function getCategory() {
      const listCategories = [] as any;

      onSnapshot(refCategory, snapshot => {
        snapshot.docs.forEach(doc => {
          const categories = doc.id;
          listCategories.push(categories);
        });
      });
      setCategories(listCategories);
    }
    getCategory();
  }, []);

  const { errors } = formState;

  async function handleAddCategory(data: CreateNewProductFormData) {
    try {
      setIsLoading(true);
      /*const categoryExists = categories.findIndex(name => name === data.name);

      if (categoryExists) {
        toast.warn("Já existe uma categoria com este nome.", {
          position: "top-right",
          autoClose: 9000,
          theme: "colored",
        });
        return;
      }*/

      const categoryName = data.name.toLowerCase()
      await setDoc(doc(db, "category", categoryName), {});

      toast.success("Categoria criada com sucesso!", {
        position: "top-right",
        autoClose: 9000,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar categoria. Entre em contato com o administrador.", {
        position: "top-right",
        autoClose: 9000,
        theme: "colored",
      });
      console.log(error)
    } finally {
      reset();
      setIsLoading(false);
    }
  }

  return (
    <main>
      <TitlePage
        title="Registrar categoria"
        children={<IoAdd />}
        subtitle="Adicione novas categorias para seus produtos!"
      />
      <form
        onSubmit={handleSubmit(handleAddCategory)}
      >
        <Section>
          <div className="w-full sm:w-full">
            <Input
              name="name"
              errors={errors}
              register={register}
              placeholder="Nome da categoria"
            />
          </div>
        </Section>
        <div className="flex gap-4">
          <Button
            type="submit"
            children={isLoading ? <Loading /> : "Salvar"}
            disabled={isLoading}
            variantBg="orange"
          />
          <Button
            type="button"
            children="Cancelar"
            variantBg="gray"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </form>
    </main>
  )
}
