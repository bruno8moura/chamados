import { db } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";

export default async function CreateOrderService({
  clientId,
  subject,
  status,
  complement,
  uid,
}) {
  try {
    const { addDoc, database, collection } = db;

    await addDoc(collection(database, "orders"), {
      id: uuidv4(),
      clientId,
      subject,
      status,
      complement,
      owner_uid: uid,
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
