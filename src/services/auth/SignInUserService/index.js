import { auth } from "../../../config/firebase";

export default async function SignInUserService({ email, password }) {
  const { authentication, signInWithEmailAndPassword } = auth;
  return signInWithEmailAndPassword(authentication, email, password);
}
