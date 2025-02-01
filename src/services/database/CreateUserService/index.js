import { db } from "../../../config/firebase";

export default async function CreateUserService({ name, email, uid }) {
  const { setDoc, database, doc } = db;

  await setDoc(doc(database, "users", uid), {
    name,
    email,
    avatarUrl: null,
  });
}
