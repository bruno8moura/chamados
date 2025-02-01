import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../SignIn/signin.css";
import logo from "../../assets/logo.png";

import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    signUp({ name, email, password });
  }

  return (
    <main className="container-center">
      <section className="login">
        <header className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </header>
        <form onSubmit={handleSubmit}>
          <h1>Nova conta</h1>
          <input
            type="text"
            placeholder="Seu name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value={loadingAuth ? "Carregando..." : "Cadastrar"}
          />
        </form>
        <Link to="/">Já tem uma conta? Faça login</Link>
      </section>
    </main>
  );
}
