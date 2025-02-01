import { db } from "../../../config/firebase";

export default async function CreateClientService({
  name,
  document,
  address,
  uid,
}) {
  try {
    const { addDoc, database, collection } = db;

    await addDoc(collection(database, "clients"), {
      name,
      document,
      address,
      owner_uid: uid,
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
