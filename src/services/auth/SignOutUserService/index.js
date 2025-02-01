import { auth } from "../../../config/firebase";

export default async function SignOutUserService() {
  const { signOut, authentication } = auth;
  return signOut(authentication);
}
