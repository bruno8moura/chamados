import React from "react";
import { FiPlusCircle } from "react-icons/fi";

import "./new.css";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import QueryClientsService from "../../services/database/QueryClientsService";
import CreateOrderService from "../../services/database/CreateOrderService";
import { toast } from "react-toastify";

function New() {
  const { user } = React.useContext(AuthContext);

  const [customers, setCustomers] = React.useState([
    { id: 0, name: "Carregando...", loading: true },
  ]);
  const [customerSelected, setCustomerSelected] = React.useState(0);
  const [complement, setComplement] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    async function loadCustomers() {
      const result = await QueryClientsService();
      setCustomers([{ id: "0", name: "Selecione..." }, ...result]);
    }

    loadCustomers();
  }, []);

  function handleStatusOptionChange({ target }) {
    setStatus(target.value);
  }

  function handleSubjectOptionChange({ target }) {
    setSubject(target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await CreateOrderService({
      clientId: customers[customerSelected].id,
      subject,
      status,
      complement,
      uid: user.uid,
    });

    toast.success("Chamado registrado com sucesso!");
    clearFields();
  }

  function handleClientsChange({ target }) {
    setCustomerSelected(target.value);
  }

  function clearFields() {
    setCustomerSelected(0);
    setSubject("");
    setStatus("");
    setComplement("");
  }

  return (
    <main>
      <Header />
      <section className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>
        <article className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label htmlFor="clients">Clientes</label>
            {
              <select
                name="clients"
                id="clients"
                value={customerSelected}
                onChange={handleClientsChange}
                disabled={customers[0].loading}
              >
                {customers.map((c, index) => (
                  <option key={c.id} value={index}>
                    {c.name}
                  </option>
                ))}
              </select>
            }

            <label htmlFor="subject">Assunto</label>
            <select
              name="subject"
              id="subject"
              // defaultValue={subject ? subject : ""}
              value={subject}
              onChange={handleSubjectOptionChange}
            >
              <option key={0} value="">
                Selecione...
              </option>
              <option key={1} value="Suporte">
                Suporte
              </option>
              <option key={2} value="Visita tcnica">
                Visita tcnica
              </option>
              <option key={3} value="Financeiro">
                Financeiro
              </option>
            </select>
            <label htmlFor="status">Status</label>

            <section className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleStatusOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleStatusOptionChange}
                checked={status === "Progresso"}
              />
              <span>Em progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleStatusOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </section>

            <label htmlFor="complement">Complemento</label>
            <textarea
              name="complement"
              id="complement"
              value={complement}
              onChange={({ target }) => setComplement(target.value)}
              placeholder="Descreva seu problema (opcional)."
            />
            <button type="submit">Registrar</button>
          </form>
        </article>
      </section>
    </main>
  );
}

export default New;
