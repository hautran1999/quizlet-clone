import { app } from "../services/firebase";
import { getUserByUid, updateUser } from "./users";

const flashcardsRef = app.firestore().collection("flashcards");

export const createFlashcard = async (data) => {
  await flashcardsRef.doc(data.id).set(data);
  const user = await getUserByUid(data.author.uid);
  await updateUser(data.author.uid, {
    created: [
      ...user.created,
      {
        id: data.id,
        title: data.title,
        description: data.description,
        total: data.cards.length,
      },
    ],
  });
};

export const getFlashcards = async () => {
  let data = [];
  const snapshot = await flashcardsRef.get();
  snapshot.docs.map((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const getFlashcardById = async (id, currentUser) => {
  const doc = await flashcardsRef.doc(id).get();
  const data = doc.data();
  const user = await getUserByUid(currentUser.uid);
  let isHave = false;
  for (const watched of user.watched) {
    if (watched.id === id) {
      isHave = true;
    }
  }
  if (!isHave) {
    await updateUser(currentUser.uid, {
      watched: [
        ...user.watched,
        {
          id: data.id,
          title: data.title,
          description: data.description,
          total: data.cards.length,
          author: data.author,
        },
      ],
    });
  }
  return data;
};

export const updateFlashcard = async (data) => {
  await flashcardsRef.doc(data.id).update(data);
};
