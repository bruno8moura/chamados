import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./signin.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSignIn(e) {
    e.preventDefault();
    signIn({ email, password });
  }

  return (
    <main className="container-center">
      <section className="login">
        <header className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </header>
        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
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
            value={loadingAuth ? "Carregando..." : "Acessar"}
          />
        </form>
        <Link to="/register">Criar uma conta</Link>
      </section>
    </main>
  );
}
