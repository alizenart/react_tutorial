// firebase.js
import { useEffect, useState, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3B060yRjPYtgCqA2SBb2PEDMm8hgTGlY",
  authDomain: "react-tutorial-35db6.firebaseapp.com",
  databaseURL: "https://react-tutorial-35db6-default-rtdb.firebaseio.com",
  projectId: "react-tutorial-35db6",
  storageBucket: "react-tutorial-35db6.appspot.com",
  messagingSenderId: "248693620696",
  appId: "1:248693620696:web:3fa51fb9b3a0dcb39fbcad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('User signed in:', result.user);
    })
    .catch((error) => {
      console.error('Error signing in with Google:', error);
    });
};

// Sign out function
export const firebaseSignOut = () => signOut(auth);

// Custom hook to track auth state
export const useAuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return [user];
};

// Hook to read data from Firebase
export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => setData(snapshot.val()),
      (error) => setError(error)
    );
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [path]);

  return [data, error];
};

// Hook to update data in Firebase
export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult({ message: "Update successful", timestamp: Date.now() }))
        .catch((error) => setResult({ error, message: error.message }));
    },
    [path]
  );

  return [updateData, result];
};

export const useProfile = () => {
  const [user] = useAuthState()
  const [isAdmin, isLoading, error] = useDbData(
    `/admins/${user?.uid || "guest"}`
  )
  return [{ user, isAdmin }, isLoading, error]
}