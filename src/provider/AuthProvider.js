import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import firebase from "firebase";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const loginWithEmail = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const loginWithGoogle = () => {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signup,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
