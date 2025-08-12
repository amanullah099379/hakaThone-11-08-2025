import { initializeApp } from 'firebase/app'

import {
  getAuth,
  sendPasswordResetEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import {
  getFirestore,
  collection as fsCollection,
  addDoc as fsAddDoc,
  query as fsQuery,
  where as fsWhere,
  orderBy as fsOrderBy,
  getDocs as fsGetDocs,
  onSnapshot as fsOnSnapshot,
  doc as fsDoc,
  setDoc as fsSetDoc,
  updateDoc as fsUpdateDoc,
  deleteDoc as fsDeleteDoc,
  serverTimestamp as fsServerTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB2FXVnbOyk44DHDxmt1ortIfd6bWd3qdQ",
  authDomain: "lms-system-3137f.firebaseapp.com",
  projectId: "lms-system-3137f",
  storageBucket: "lms-system-3137f.firebasestorage.app",
  messagingSenderId: "330056683632",
  appId: "1:330056683632:web:ea585d32d7fa32a177e4b5",
  measurementId: "G-0YN7MQ7MT8"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Re-export firestore helpers with the names we use in code
export const collection = (path) => fsCollection(db, path)
export const query = fsQuery
export const where = fsWhere
export const orderBy = fsOrderBy
export const getDocs = fsGetDocs
export const addDoc = fsAddDoc
export const onSnapshot = fsOnSnapshot
export const doc = fsDoc
export const setDoc = fsSetDoc
export const updateDoc = fsUpdateDoc
export const deleteDoc = fsDeleteDoc
export const serverTimestamp = fsServerTimestamp

export {
  sendPasswordResetEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
}
