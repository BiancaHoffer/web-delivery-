import page1 from "../../../public/page1.png";
import page2 from "../../../public/page2.png";
import page3 from "../../../public/page3.png";
import page4 from "../../../public/page4.png";
import page5 from "../../../public/page4.png";


export default function usageRights() {
  return (
    <>

      <div className="flex justify-center items-center h-[100vh] ">
        <p className="w-full max-w-2xl text-justify p-8">
          <span className="text-orange-400 text-2xl">Termos de Uso do Sistema</span>
          <br /><br />


          Bem-vindo ao Sistema de Delivery, desenvolvido por Bianca Macedo Hoffer Madruga.
          <br /><br />



          Direitos de Propriedade:
          <br />


          Todos os direitos de propriedade intelectual relacionados ao código-fonte, design e funcionamento deste Sistema pertencem ao Desenvolvedor.<br />
          Fica registrado que, o cliente [Felipe..... ] e demais sócios da empresa [Pizzaria...] do CNPJ [000...]  tem acesso total e vitalicio ao sistema.
          <br /><br />
          Licença de Uso:
          <br />


          O Desenvolvedor concede ao Cliente o direito não exclusivo e intransferível de usar o Sistema de acordo com as seguintes condições:
          <br />


          a. O Cliente tem permissão para usar o Sistema em suas operações comerciais internas.
          <br />


          b. O Cliente não tem permissão para redistribuir, sublicenciar, vender ou copiar o código-fonte do Sistema.
          <br />



          c. O Cliente pode solicitar assistência técnica do Desenvolvedor, sujeita a termos e taxas adicionais. A cobrança de taxas de atualizações e/ou assistência técnica será cobrada somente após o projeto for finalizado e aprovado pelo cliente.
          <br /><br />

          Ao usar este Sistema, o Cliente reconhece e concorda com estes Termos de Uso.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
        <div style={{ border: "2px solid #FB923C", padding: "12px", borderRadius: "20px", borderColor: "" }}>
          <h2 style={{ marginBottom: "12px", fontWeight: "bolder" }}>Dashboard</h2>
          <img style={{ border: "2px", borderRadius: "8px" }} src="https://github.com/BiancaHoffer/app-delivery/assets/99914904/f069323e-f5d3-4788-a7e5-5d3e19593822" />
        </div>
      </div>
    </>
  )
}