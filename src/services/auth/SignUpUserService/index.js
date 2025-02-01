import { auth } from "../../../config/firebase";

export default async function CreateUserService({ email, password }) {
  const { authentication, createUserWithEmailAndPassword } = auth;
  return createUserWithEmailAndPassword(authentication, email, password);
}
