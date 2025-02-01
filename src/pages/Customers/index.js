import React from "react";
import { FiUsers } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";
import CreateClientService from "../../services/database/CreateClientService";

function Customers() {
  const { user } = React.useContext(AuthContext);

  const [companyName, setCompanyName] = React.useState("");
  const [cnpj, setCnpj] = React.useState("");
  const [address, setAddress] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!companyName || !cnpj || !address) {
      toast.error("Preencha todos os campos!");
      return;
    }

    await CreateClientService({
      name: companyName,
      document: cnpj,
      address,
      uid: user.uid,
    });

    cleanForm();
    toast.success("Cliente cadastrado com sucesso!");
  }

  function cleanForm() {
    setCompanyName("");
    setCnpj("");
    setAddress("");
  }

  return (
    <main>
      <section>
        <Header />
      </section>

      <section className="content">
        <Title name="Clientes">
          <FiUsers size={25} />
        </Title>

        <article className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label htmlFor="company_name">Nome fantasia</label>
            <input
              type="text"
              placeholder="Digite o nome da empresa"
              name="company_name"
              id="company_name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              placeholder="Digite o CNPJ"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />

            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              name="address"
              placeholder="Digite o endereço da empresa"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button type="submit">Salvar</button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default Customers;
