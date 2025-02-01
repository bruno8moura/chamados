import "./header.css";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

import { AuthContext } from "../../contexts/auth";
import avatarImg from "../../assets/avatar.png";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <main className="sidebar">
      <article>
        <img
          src={user.avatarUrl ? user.avatarUrl : avatarImg}
          alt="Foto do usuário"
        />
      </article>

      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>

      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>

      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Perfil
      </Link>
    </main>
  );
}

export default Header;
