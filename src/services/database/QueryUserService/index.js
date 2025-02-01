import { db } from "../../../config/firebase";

export default async function QueryUserService({ uid }) {
  const { getDoc, database, doc } = db;
  const docRef = doc(database, "users", uid);

  const result = await getDoc(docRef);

  return result ? result.data() : null;
}
