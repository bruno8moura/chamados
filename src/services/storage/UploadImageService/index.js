import { storageFiles, db } from "../../../config/firebase";

export default async function UploadImageService(avatarImage, userId) {
  const { storage, ref, uploadBytes, getDownloadURL } = storageFiles;
  const uploadRef = ref(storage, `images/${userId}/perfil.png`);
  const result = await uploadBytes(uploadRef, avatarImage);
  const urlImage = await getDownloadURL(result.ref);

  return urlImage;
}
