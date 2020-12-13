import { app } from "../services/firebase";
const usersRef = app.firestore().collection("users");

const indexOfId = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) return i;
  }
  return -1;
};

export const getUsers = async () => {
  let data = [];
  const snapshot = await usersRef.get();
  snapshot.docs.map((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const hiddenFlashcardById = async (user, id) => {
  const indexIdWatched = indexOfId(user.watched, id);
  const indexIdLearned = indexOfId(user.learned, id);
  indexIdWatched !== -1 &&
    user.watched.splice(indexIdWatched, indexIdWatched + 1);
  indexIdLearned !== -1 &&
    user.learned.splice(indexIdLearned.indexIdLearned + 1);
  await updateUser(user.uid, {
    watched: user.watched,
    learned: user.learned,
  });
};

export const updateFlashcardUser = async (user, id, data) => {
  const indexIdWatched = indexOfId(user.watched, id);
  const indexIdLearned = indexOfId(user.learned, id);
  const indexIdCreated = indexOfId(user.created, id);
  if (indexIdWatched !== -1) {
    user.watched[indexIdWatched].title = data.title;
    user.watched[indexIdWatched].description = data.description;
    user.watched[indexIdWatched].total = data.cards.length;
  }
  if (indexIdLearned !== -1) {
    user.learned[indexIdLearned].title = data.title;
    user.learned[indexIdLearned].description = data.description;
    user.learned[indexIdLearned].total = data.cards.length;
  }
  if (indexIdCreated !== -1) {
    user.created[indexIdCreated].title = data.title;
    user.created[indexIdCreated].description = data.description;
    user.created[indexIdCreated].total = data.cards.length;
  }
  await updateUser(user.uid, {
    watched: user.watched,
    learned: user.learned,
    created: user.created,
  });
};

export const deleteCreatedById = async (user, id) => {
  const indexIdCreated = indexOfId(user.created, id);
  indexIdCreated !== -1 &&
    user.created.splice(indexIdCreated, indexIdCreated + 1);
  await updateUser(user.uid, {
    created: user.created,
  });
};

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
