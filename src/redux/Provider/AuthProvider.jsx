import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthState } from "../slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...(userDoc.exists()
              ? userDoc.data()
              : { name: firebaseUser.email.split("@")[0] }),
            createdAt: firebaseUser.metadata.creationTime,
          };

          localStorage.setItem("user", JSON.stringify(userData));

          dispatch({ type: "auth/setUser", payload: userData });
        } catch (error) {
          console.error("Error getting user data:", error);
        }
      } else {
        localStorage.removeItem("user");
        dispatch({ type: "auth/clearUser" });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return children;
};
export default AuthProvider;
