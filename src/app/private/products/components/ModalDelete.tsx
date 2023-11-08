import { Dispatch, Fragment, SetStateAction } from "react";

import { Button } from "@/app/components/Button";

import { Dialog, Transition } from "@headlessui/react";

import { db } from "@/app/services/firebase";
import { deleteDoc, doc } from "firebase/firestore";


interface ModalDeleteProps {
  id: string;
  name: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalDelete({ isOpen, setIsOpen, id, name }: ModalDeleteProps) {
  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, "product", id));
    } catch {
      alert("Erro ao deletar produto. Entre em contato com o administrador.")
    } finally {
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
                  Excluir produto: {name}
                </Dialog.Title>
                <form action="">
                  <div>
                    <p className="text-base text-gray-500 mb-8">
                      Tem certeza de que deseja excluir esse produto?
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      variantBg="red"
                      children="Excluir"
                      onClick={() => handleDelete(id)}
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