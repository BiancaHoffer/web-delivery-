'use client'

import { useState } from "react";

import { IoAdd } from "react-icons/io5";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Section } from "@/app/components/Section";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { TitlePage } from "@/app/components/TitlePage";
import { Loading } from "@/app/components/Loading";

import { toast } from 'react-toastify';

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase";

const createNewCategoryFormSchema = z.object({
  category: z.string().nonempty("Nome da categoria obrigatório"),
})

export type CreateNewCategoryFormData = z.infer<typeof createNewCategoryFormSchema>

export default function NewCategory() {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<CreateNewCategoryFormData>({
    resolver: zodResolver(createNewCategoryFormSchema),
    defaultValues: {
      category: "",
    }
  });

  const { errors } = formState;

  async function handleAddCategory(data: CreateNewCategoryFormData) {
    try {
      setIsLoading(true);
      const categoryName = data.category.toLowerCase();
      await setDoc(doc(db, "category", categoryName), {});
      toast.success("Categoria criada com sucesso!");
    } catch (error) {
      toast.error("Houve um erro ao criar categoria. Entre em contato com o administrador.");
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
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <Section>
          <div className="w-full sm:w-full">
            <Input
              name="category"
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
