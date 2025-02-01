import { db } from "../../../config/firebase";

export default async function UpdateUserService({ name, avatarUrl, uid }) {
  if (!name && !avatarUrl) return;

  const { updateDoc, database, doc } = db;

  const updatedData = {};

  if (!!name) updatedData.name = name;
  if (!!avatarUrl) updatedData.avatarUrl = avatarUrl;

  return updateDoc(doc(database, "users", uid), updatedData);
}
