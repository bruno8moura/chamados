import React, { useContext } from "react";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./dashboard.css";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <main>
      <Header />
      <section className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>
        <article>
          <Link to="/new" className="new">
            <FiPlus size={25} color="#fff" />
            Novo Chamado
          </Link>
          <section className="dashbord">
            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Cliente">Mercado Esquina</td>
                  <td data-label="Assunto">Assunto</td>
                  <td data-label="Status">
                    <span className="badge" style={{ backgroundColor: "#999" }}>
                      Em aberto
                    </span>
                  </td>
                  <td data-label="Cadastrado">Em aberto</td>
                  <td data-label="#">
                    <button
                      className="action"
                      style={{ backgroundColor: "#3583f6" }}
                    >
                      <FiSearch size={17} color="#FFF" />
                    </button>
                    <button
                      className="action"
                      style={{ backgroundColor: "#f6a935" }}
                    >
                      <FiEdit2 size={17} color="#FFF" />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td data-label="Cliente">Informática Tech</td>
                  <td data-label="Assunto">Assunto</td>
                  <td data-label="Status">
                    <span className="badge" style={{ backgroundColor: "#999" }}>
                      Em aberto
                    </span>
                  </td>
                  <td data-label="Cadastrado">Em aberto</td>
                  <td data-label="#">
                    <button
                      className="action"
                      style={{ backgroundColor: "#3583f6" }}
                    >
                      <FiSearch size={17} color="#FFF" />
                    </button>
                    <button
                      className="action"
                      style={{ backgroundColor: "#f6a935" }}
                    >
                      <FiEdit2 size={17} color="#FFF" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </article>
      </section>
      <button onClick={() => logout()}>Sair</button>
    </main>
  );
}
