import { Dispatch, Fragment, SetStateAction } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";

import { Dialog, Transition } from "@headlessui/react";

import { toast } from 'react-toastify';

interface ModalDeleteProps {
  category: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const updateCategoryFormSchema = z.object({
  categoryName: z.string().nonempty("Nome da categoria obrigatório"),
})

export type UpdateCategoryFormData = z.infer<typeof updateCategoryFormSchema>

export function ModalUpdate({ isOpen, setIsOpen, category }: ModalDeleteProps) {
  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: {
      //@ts-ignore
      categoryName: category,
    }
  });

  const { errors } = formState;

  async function handleUpdateCategory(data: UpdateCategoryFormData) {
    try {
      console.log(data)
    } catch {
      toast.error("Houve um erro ao editar categoria. Entre em contato com o administrador.");
    } finally {
      reset();
      window.location.reload();
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Editar produto: {category}
                </Dialog.Title>
                <form onSubmit={handleSubmit(handleUpdateCategory)}>
                  <Input
                    errors={errors}
                    name="categoryName"
                    register={register}
                    placeholder="Categoria"
                  />
                  <div className="flex gap-4 mt-6">
                    <Button
                      type="submit"
                      variantBg="orange"
                      children="Salvar"
                    />
                    <Button
                      variantBg="gray"
                      children="Cancelar"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}