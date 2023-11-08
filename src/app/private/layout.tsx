'use client'

import { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  IoCreateOutline,
  IoMenuOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoFastFoodOutline,
  IoAdd,
  IoSettingsOutline
} from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";

import avatar from "../../../public/avatar.png";
import logo from "../../../public/logo.png";

import { ActiveLink } from "../components/ActiveLink";
import { ProductProvider } from "../context/ProductContext";

interface privateLayoutProps {
  children: ReactNode;
}

export default function privateLayout({ children }: privateLayoutProps) {
  const router = useRouter();

  return (
    <ProductProvider>
      <main className="flex w-full">
        <section className="shadow-lg shadow-slate-400 flex w-auto">
          <div className="flex flex-col justify-between text-orange-50 min-h-screen w-16 lg:hidden hover:transition-colors bg-secondary p-3 py-5">
            <Image src={logo} alt="logo" className="" />
            <div>
              <div className="flex flex-col items-center gap-8 justify-center mb-6 ">
                <button className="text-orange-100 hover:text-orange-300 pr-1">
                  <IoSettingsOutline size={24} />
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="text-orange-100 hover:text-orange-300"
                >
                  <IoLogOutOutline size={26} />
                </button>
              </div>
              <Image
                src={avatar}
                alt="avatar"
                className="rounded-full object-cover mt-6 shadow-lg border-t-[1px] border-orange-400"
              />
            </div>
          </div>
          <div className="flex flex-col min-h-screen w-64 bg-primary px-4 py-5 justify-between lg:hidden">
            <nav className="flex flex-col gap-4">
              <span className="text-orange-200 mb-[-4px] text-sm">Gerenciar</span>
              <ActiveLink href='/private/dashboard' children={<IoMenuOutline />} title="Dashboard" />
              <ActiveLink href='/private/orders' children={<IoCreateOutline />} title="Pedidos" />
              <ActiveLink href='/private/clients' children={<IoPersonOutline />} title="Clientes" />
              <span className="text-orange-200 pt-[4px] mb-[-4px] text-sm">Produtos</span>
              <ActiveLink href='/private/products' children={<IoFastFoodOutline />} title="Produtos" />
              <ActiveLink href='/private/newProduct' children={<IoAdd />} title="Novo produto" />
              <span className="text-orange-200 pt-[4px] mb-[-4px] text-sm">Categorias</span>
              <ActiveLink href='/private/categories' children={<TbCategory2 />} title="Categorias" />
              <ActiveLink href='/private/newCategory' children={<IoAdd />} title="Nova categoria" />
            </nav>
            <div className="text-orange-100">
              <p>Bem-vindo(a)</p>
              <p>Bianca Macedo Hoffer M.</p>
            </div>
          </div>
        </section>
        <section className="p-6 w-full lg:py-0 lg:px-0">
          <div className="hidden lg:flex justify-between w-[100%] bg-secondary px-4 py-4">
            <Image src={logo} alt="logo" className="w-8" />
            <div className="flex items-center justify-center gap-4 text-t-tertiary">
              <button className="text-orange-100 hover:text-orange-200 pr-1">
                <IoSettingsOutline size={24} />
              </button>
              <button
                onClick={() => router.push("/")}
                type="button"
                className="text-orange-100 hover:text-orange-200"
              >
                <IoLogOutOutline size={26} />
              </button>
              <Image src={avatar} alt="avatar" className="rounded-full object-cover shadow-lg w-8" />
            </div>
          </div>
          <nav className="hidden lg:flex bg-primary px-4 py-4 h-16 shadow-lg flex-row justify-between w-[100%]">
            <ActiveLink href='/private/dashboard' children={<IoMenuOutline />} />
            <ActiveLink href='/private/orders' children={<IoCreateOutline />} />
            <ActiveLink href='/private/clients' children={<IoPersonOutline />} />
            <ActiveLink href='/private/products' children={<IoFastFoodOutline />} />
            <ActiveLink href='/private/newProduct' children={<IoAdd />} />
          </nav>
          <div className="lg:px-6 lg:my-4">
            {children}
          </div>
        </section>
      </main>
    </ProductProvider>
  )
}
