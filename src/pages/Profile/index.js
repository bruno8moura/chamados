import { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

import "./profile.css";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import avatar from "../../assets/avatar.png";
import UpdateUserService from "../../services/database/UpdateUserService";
import UploadImageService from "../../services/storage/UploadImageService";

function Profile() {
  const { user, storageUser, setUser, logout, getUser } =
    useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [avatarImage, setAvatarImage] = useState(null);
  const [name, setName] = useState(user && user.name);
  const [email] = useState(user && user.email);

  function handleFile(e) {
    const image = e.target.files[0];
    if (!image || !["image/jpeg", "image/png"].includes(image.type)) {
      toast.error("Selecione uma imagem válida (JPEG ou PNG)");
      e.target.value = "";
      setAvatarImage(null);
      return;
    }

    setAvatarImage(image);
    setAvatarUrl(URL.createObjectURL(image));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!avatarImage && name === user.name) {
      toast.warning("Nada foi atualizado!");
      return;
    }

    const tempUser = { uid: user.uid };
    if (avatarImage) {
      toast.warn("Sua imagem está sendo atualizada, aguarde...");
      const urlImage = await UploadImageService(avatarImage, user.uid);
      tempUser.avatarUrl = urlImage;
      setAvatarUrl(urlImage);
      toast.success("Imagem atualizada!");
    }

    if (name !== user.name) tempUser.name = name;

    await UpdateUserService(tempUser);
    setName(name);

    storageUser(tempUser);
    setUser(getUser());

    toast.success("Perfil atualizado!");
  }

  return (
    <main>
      <section>
        <Header />
      </section>

      <section className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <article className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload size={25} color="#fff" />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              {!!avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled />

            <button type="submit">Salvar</button>
          </form>
        </article>
        <article className="container">
          <button type="button" onClick={() => logout()} className="logout-btn">
            Sair
          </button>
        </article>
      </section>
    </main>
  );
}

export default Profile;
