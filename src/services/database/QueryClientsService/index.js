import { db } from "../../../config/firebase";

export default async function QueryClientsService() {
  try {
    const { getDocs, collection, database } = db;
    const customersRef = collection(database, "clients");
    const result = await getDocs(customersRef);

    if (!result.docs) {
      return [];
    }

    return result.docs.map((doc) => {
      const { id, address, document, updated_at, created_at, name, owner_uid } =
        doc.data();
      return {
        id,
        address,
        document,
        updated_at,
        created_at,
        name,
        owner_uid,
      };
    });
  } catch (error) {
    console.error("Error fetching clients: ", error);
  }
}
