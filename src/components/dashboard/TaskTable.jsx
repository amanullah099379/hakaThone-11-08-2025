import React from 'react'
import { updateTask, deleteTask } from '../../services/taskService'
import Swal from 'sweetalert2'

export default function TaskTable({ tasks = [], refresh }) {
  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending'
      await updateTask(task.id, { status: newStatus })
      await Swal.fire('Success', `Task marked ${newStatus}`, 'success')
      if (refresh) refresh()
    } catch (err) {
      console.error(err)
      await Swal.fire('Error', 'Failed to update status', 'error')
    }
  }

  const handleDelete = async (task) => {
    const res = await Swal.fire({
      title: 'Delete task?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true
    })
    if (res.isConfirmed) {
      try {
        await deleteTask(task.id)
        await Swal.fire('Deleted', 'Task deleted', 'success')
        if (refresh) refresh()
      } catch (err) {
        console.error(err)
        await Swal.fire('Error', 'Failed to delete', 'error')
      }
    }
  }

  const handleEdit = async (task) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Task',
      html:
        '<input id="swal-title" class="swal2-input" placeholder="Title" value="'+(task.title||'')+'">' +
        '<textarea id="swal-desc" class="swal2-textarea" placeholder="Description">'+(task.description||'')+'</textarea>' +
        '<input id="swal-deadline" type="date" class="swal2-input" value="'+(task.deadline ? new Date(task.deadline).toISOString().substr(0,10) : '')+'">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('swal-title').value,
          description: document.getElementById('swal-desc').value,
          deadline: document.getElementById('swal-deadline').value,
        }
      }
    })

    if (formValues) {
      try {
        await updateTask(task.id, {
          title: formValues.title || task.title,
          description: formValues.description || task.description,
          deadline: formValues.deadline ? new Date(formValues.deadline).toISOString() : task.deadline,
        })
        await Swal.fire('Success', 'Task updated', 'success')
        if (refresh) refresh()
      } catch (err) {
        console.error(err)
        await Swal.fire('Error', 'Failed to update', 'error')
      }
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Title</th>
            <th className="py-2">Description</th>
            <th className="py-2">Deadline</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center">No tasks</td>
            </tr>
          )}
          {tasks.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="py-2">{t.title}</td>
              <td className="py-2">{t.description}</td>
              <td className="py-2">{t.deadline ? new Date(t.deadline).toLocaleDateString() : ''}</td>
              <td className="py-2">{t.status}</td>
              <td className="py-2 flex gap-2">
                <button onClick={() => handleToggleStatus(t)} className="px-2 py-1 bg-green-500 text-white rounded">✓</button>
                <button onClick={() => handleEdit(t)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(t)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
