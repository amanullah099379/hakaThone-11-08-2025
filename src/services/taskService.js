import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from '../firebase'

const tasksCollection = (userId) => collection('tasks')

export const createTask = async (task) => {
  const docRef = await addDoc(tasksCollection(), {
    ...task,
    createdAt: serverTimestamp(),
  })
  return docRef
}

export const fetchUserTasks = async (userId) => {
  const q = query(tasksCollection(), where('ownerId', '==', userId), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const updateTask = async (taskId, updates) => {
  const docRef = doc('tasks', taskId)
  await updateDoc(docRef, updates)
}

export const deleteTask = async (taskId) => {
  const docRef = doc('tasks', taskId)
  await deleteDoc(docRef)
}
