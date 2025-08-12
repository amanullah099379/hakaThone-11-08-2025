import React, { useEffect, useState } from 'react'
import AddTaskForm from './AddTaskForm'
import TaskTable from './TaskTable'
import { useAuthStore } from '../../store/useAuthStore'
import { collection, query, where, orderBy, onSnapshot } from '../../firebase'

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!user) return

    const q = query(collection('tasks'), where('ownerId', '==', user.uid), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      setTasks(data)
    }, (err) => {
      console.error('onSnapshot error', err)
    })

    return () => unsubscribe()
  }, [user])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <AddTaskForm onTaskAdded={() => { /* realtime will update */ }} />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>All</button>
              <button onClick={() => setFilter('Pending')} className={`px-3 py-1 rounded ${filter==='Pending' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Pending</button>
              <button onClick={() => setFilter('Completed')} className={`px-3 py-1 rounded ${filter==='Completed' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Completed</button>
            </div>
          </div>

          <TaskTable tasks={tasks.filter((t) => (filter === 'all' ? true : t.status === filter))} refresh={() => { /* realtime */ }} />
        </div>
      </div>
    </div>
  )
}
