import { createContext, useEffect, useState } from "react";

import SignUpUserService from "../services/auth/SignUpUserService";
import CreateUserService from "../services/database/CreateUserService";
import SignInUserService from "../services/auth/SignInUserService";
import SignOutUserService from "../services/auth/SignOutUserService";
import QueryUserService from "../services/database/QueryUserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AutProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const storageUser = localStorage.getItem("@ticketsPRO");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  async function signIn({ email, password }) {
    try {
      setLoadingAuth(true);
      const loggedUser = await SignInUserService({ email, password });
      const userData = await QueryUserService({ uid: loggedUser.user.uid });

      const data = {
        name: userData.name,
        email: loggedUser.user.email,
        uid: loggedUser.user.uid,
        avatarUrl: userData.avatarUrl,
      };
      storageUser(data);
      setUser(data);
      setLoadingAuth(false);
      toast.success("Bem-vindo(a) de volta!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoadingAuth(false);
      toast.error("Ops! Algo deu errado!");
    }
  }

  async function signUp({ name, email, password }) {
    try {
      setLoadingAuth(true);
      const data = await SignUpUserService({ name, email, password });
      const newUser = { name, email, uid: data.user.uid };
      await CreateUserService(newUser);
      storageUser(newUser);
      setUser(newUser);
      setLoadingAuth(false);
      toast.success("Seja bem vindo ao sistema!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoadingAuth(false);
      toast.error("Ops! Algo deu errado!");
    }
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify({ ...user, ...data }));
  }

  function getUser() {
    const data = localStorage.getItem("@ticketsPRO");
    if (!data) return {};

    return JSON.parse(data);
  }

  async function logout() {
    try {
      await SignOutUserService();
      localStorage.removeItem("@ticketsPRO");
      setUser(null);
    } catch (error) {
      console.error(error);
      toast.error("Ops! Algo deu errado!");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
        storageUser,
        setUser,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AutProvider;
