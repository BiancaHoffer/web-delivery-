import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react"
import { Button } from "../Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalEditOrderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  item: any;
}

const editOderFormSchema = z.object({
  status: z.string(),
})

export type EditOderFormSData = z.infer<typeof editOderFormSchema>

const status = [
  { id: 1, item: 'Completo' },
  { id: 2, item: 'Cancelado' },
  { id: 3, item: 'Processando' },
  { id: 4, item: 'Na cozinha' },
  { id: 5, item: 'Na estrada' },
]

interface EditOrderProps {
  data: any;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function EditOrder({ isOpen, setIsOpen, data }: EditOrderProps) {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue
  } = useForm<EditOderFormSData>({
    resolver: zodResolver(editOderFormSchema),
    defaultValues: {
      status: "",
    }
  });

  const { errors } = formState;

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleEditStatus(data: EditOderFormSData) {
    console.log(data);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
                <Dialog.Panel className="w-full h-96 max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Editar pedido de: {data.client}
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(handleEditStatus)}
                    className="h-full flex flex-col justify-between">
                    <div>
                      <p className="text-base text-gray-500 mb-2">
                        Atualize o status do cliente. Isso aparecerá simultaneamente para ele.
                      </p>
                      Input Select
                    </div>
                    <div className="flex gap-4 mb-8">
                      <Button
                        type="submit"
                        variantBg="orange"
                        children="Editar"
                        onClick={handleCloseModal}
                      />
                      <Button
                        variantBg="gray"
                        children="Cancelar"
                        type="button"
                        onClick={handleCloseModal}
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}