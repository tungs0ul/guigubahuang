import { useEffect, useState } from "react";
import { firestore } from "./config";
import firebase from "firebase";

const useFireStore = (
  collection,
  order = "time",
  rule = "desc",
  limit = 1000
) => {
  const [docs, setDocs] = useState("");
  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .where("check", "==", true)
      .orderBy(order, rule)
      .limit(limit)
      .onSnapshot((snap) => {
        setDocs(snap.docs.map((e) => e.data()));
      });

    return () => unsub();
  }, [collection, order, rule]);

  return docs;
};

export const writeFireStore = async (collection, value) => {
  try {
    await firestore
      .collection(collection)
      .add({ ...value, time: firebase.firestore.FieldValue.serverTimestamp() });
    return "";
  } catch (e) {
    return "error";
  }
};

export default useFireStore;
