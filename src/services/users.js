import { app } from "../services/firebase";
const usersRef = app.firestore().collection("users");

export const createUser = async (data) => {
  await usersRef.doc(data.uid).set(data);
};

export const updateUser = async (uid, data) => {
  await usersRef.doc(uid).update(data);
};

export const getUserByUid = async (uid) => {
  const doc = await usersRef.doc(uid).get();
  return doc.data();
};
