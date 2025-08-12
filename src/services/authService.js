import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from '../firebase'

export const signup = async (email, password) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(userCred.user)
  return userCred
}

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
  return await signOut(auth)
}

export const sendResetEmail = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}
