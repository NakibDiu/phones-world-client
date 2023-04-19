import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import app from "../components/firebase.init";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider)
  }

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const setProfileName = (name) => {
    return updateProfile(auth.currentUser, { displayName: name });
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    setProfileName,
    signInUser,
    logout,
    isLoading,
    setIsLoading,
    signInWithGoogle,
    setUser,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
