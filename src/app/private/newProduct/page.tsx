'use client'

import { useEffect, useState } from "react";

import { IoAdd } from "react-icons/io5";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { InputMoney } from "@/app/components/InputMoney";
import { Section } from "@/app/components/Section";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { TextArea } from "@/app/components/Textarea";
import { TitlePage } from "@/app/components/TitlePage";
import { InputSelect } from "@/app/components/InputSelect";
import { Modal } from "./components/Modal";
import { Loading } from "@/app/components/Loading";

import { toast } from 'react-toastify';

import { maskCurrency } from "@/functions/Masks";

import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "@/services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const createNewProductFormSchema = z.object({
  name: z.string().nonempty("Nome do produto obrigatório"),
  description: z.string(),
  price: z.string().nonempty("Preço do produto obrigatório")
})

export type CreateNewProductFormData = z.infer<typeof createNewProductFormSchema>

export interface CategoryData {
  id: string;
  category: string;
}

export interface ImageFile extends File {
  name: string;
}

export default function NewProducts() {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<ImageFile | null>(null);
  const [currency, setCurrency] = useState("");

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [categorySelected, setCategorySelected] = useState("Selecionar categoria");

  const [isLoading, setIsLoading] = useState(false);

  const arrayStringCategories = categories.map(category => {
    return category.category;
  })

  useEffect(() => {
    async function getDocsCategory() {
      let listCatories = [] as any[];

      await getDocs(collection(db, "category"))
        .then((docs) => {
          docs.forEach((doc) => {
            listCatories.push(doc.data() as CategoryData);
          });
          setCategories(listCatories);
        });
    };
    getDocsCategory();
  }, []);

  const {
    register,
    handleSubmit,
    formState,
    reset,
    control
  } = useForm<CreateNewProductFormData>({
    resolver: zodResolver(createNewProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    }
  });

  const { errors } = formState;

  const UIDProductGenerate = Math.floor(Date.now() * Math.random()).toString(32);

  async function handleCreateProduct(data: CreateNewProductFormData) {
    if (categorySelected == "Selecionar categoria") {
      toast.warning("Por favor, selecione a categoria do produto.");
      return;
    };

    if (currency == "0.00") {
      toast.warning("O preço do produto precisa ser acima de R$ 0.01 centavos.");
      return;
    }

    if (image == null) {
      toast.warning("Por favor, insira uma imagem do produto.");
      return;
    };

    if (image.size > 5 * 1024 * 1024) {
      toast.warning("O arquivo precisa ter no máximo 5MB");
      return;
    }

    const storageRef = ref(storage, `product_images/${image.name}`);

    try {
      setIsLoading(true);
      await uploadBytes(storageRef, image)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              const product = {
                id: UIDProductGenerate,
                name: data.name,
                price: currency,
                description: data.description,
                category: categorySelected,
                image: url,
              };

              setDoc(doc(db, "product", UIDProductGenerate), product);
            });
        });

      toast.success("Produto criado com sucesso!");
    } catch {
      toast.error("Erro ao cadastrar produto. Entre em contato com o administrador.");
    } finally {
      reset();
      setImage(null);
      setCategorySelected("Selecionar categorias");
      setIsLoading(false);
    }
  }

  /*async function addProductInCategory(data: DataForm) {
    try {
      await setDoc(doc(db, `/category/${categorySelected}`), {
        products: arrayUnion(
          ...[data]
        )
      }, {
        merge: true
      })
    } catch {
      toast.error("Erro ao cadastrar produto em sua categoria. Entre em contato com o administrador.", {
        position: "top-right",
        autoClose: 9000,
        theme: "colored",
      });
    };
  };*/

  return (
    <main>
      <TitlePage
        title="Registrar produto"
        children={<IoAdd />}
        subtitle="Adicione novos produtos ao seu menu!"
      />
      <form
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <Section>
          <div className="w-[50%] sm:w-full">
            <Input
              name="name"
              errors={errors}
              register={register}
              placeholder="Nome do produto"
            />
          </div>
          <div className="w-[50%] sm:w-full">
            <InputSelect
              setSelected={setCategorySelected}
              selected={categorySelected}
              list={arrayStringCategories}
            />
          </div>
        </Section>
        <Section>
          <div className="flex-col justify-center flex gap-4 w-full">
            <div className="lg:flex-col w-full flex gap-4">
              <div className="w-[50%] lg:w-full">
                <div className="flex border-lg transition-colors">
                  <div className="mr-[-2px] border-2 border-y-border border-l-border border-r-white rounded-s-lg bg-zinc-100 shadow-inner flex items-center px-2 py-[5px] md:py-[8px]  text-t-secondary font-medium text-base">
                    Imagem
                  </div>
                  <div className="rounded-e-lg border-[1px] flex bg-white items-center px-2 py-[5px] md:py-[8px] w-full">
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      className="md:text-sm cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImage(file);
                        };
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[50%] lg:w-full">
                <InputMoney
                  name="price"
                  errors={errors}
                  register={register}
                  placeholder="Preço"
                  prefix="R$"
                  value={currency}
                  onChange={e => setCurrency(maskCurrency(e.target.value))}
                />
              </div>
            </div>
            <div className="w-full">
              <TextArea
                errors={errors}
                activeErrors={false}
                register={register}
                name="description"
                placeholder="Breve descrição do produto"
              />
            </div>
          </div>
        </Section>
        <div className="flex gap-4">
          <Button
            type="submit"
            children={isLoading ? <Loading /> : "Salvar"}
            disabled={isLoading}
            variantBg="orange"
            value={currency}
          />
          <Button
            type="button"
            children="Cancelar"
            variantBg="gray"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </form>
      <Modal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        setImage={setImage}
        setList={setCategorySelected}
        setCurrency={setCurrency}
        reset={reset}
      />
    </main>
  )
}
