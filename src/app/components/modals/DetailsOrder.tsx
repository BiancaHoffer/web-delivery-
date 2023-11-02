import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { Button } from "../Button";

interface ModalDetailsOrderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  item: any;
}

export function DetailsOrder({ isOpen, setIsOpen, item }: ModalDetailsOrderProps) {
  return (
    <>
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
                    Detalhes do pedido de: {item.client}
                  </Dialog.Title>
                  <div className="flex gap-4 flex-col mb-8">
                    <div className="bg-zinc-50 shadow-inner rounded-lg p-6">
                      <p className="text-sm font-medium pb-2">Detalhes do cliente: </p>
                      <p>Nome: {item.client}</p>
                      <p>Telefone: {item.phone}</p>
                      <p>Endereço: {item.address}</p>

                      <p>Observação:</p>
                    </div>

                    <div className="bg-zinc-50 shadow-inner rounded-lg p-6">
                      <p className="text-sm font-medium pb-2">Detalhes do pedido:</p>
                      <p>1x Pizza GG</p>
                      <p>1x Pizza GG</p>
                      <p>1x Cola-Cola</p>

                      <p>Observação:</p>
                    </div>


                    <div className="bg-zinc-50 shadow-inner rounded-lg p-6">
                      <p className="text-sm font-medium pb-2">Status:</p>
                      <p>{item.status}</p>
                    </div>
                  </div>
                  <Button
                    variantBg="gray"
                    children="Fechar"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}