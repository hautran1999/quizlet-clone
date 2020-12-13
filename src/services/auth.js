import { app, provider } from "./firebase";

export const loginWithEmailAndPassword = async (payload) => {
  await app.auth().signInWithEmailAndPassword(payload.email, payload.password);
};

export const getInfoUser = async () => {
  return await app.auth().currentUser;
};

export const logOutUser = async () => {
  await app.auth().signOut();
};

export const loginWithGoogle = async () => {
  await app.auth().signInWithPopup(provider);
};
