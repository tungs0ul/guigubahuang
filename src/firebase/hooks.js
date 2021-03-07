import { useEffect, useState } from "react";
import { firestore, storage } from "./config";
import firebase from "firebase";

export const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = storage.ref(file.name);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

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
  }, [collection, order, rule, limit]);

  return docs;
};

export const writeFireStore = async (collection, value) => {
  try {
    await firestore.collection(collection).add({
      ...value,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return "";
  } catch (e) {
    return "error";
  }
};

export default useFireStore;
