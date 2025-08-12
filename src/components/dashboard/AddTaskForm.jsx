import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { taskSchema } from '../../utils/validators'
import { createTask } from '../../services/taskService'
import { useAuthStore } from '../../store/useAuthStore'
import Swal from 'sweetalert2'

export default function AddTaskForm({ onTaskAdded }) {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Add Task</h3>
      <Formik
        initialValues={{ title: '', description: '', deadline: '' }}
        validationSchema={taskSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const payload = {
              title: values.title,
              description: values.description,
              deadline: new Date(values.deadline).toISOString(),
              status: 'Pending',
              ownerId: user.uid,
            }
            await createTask(payload)
            await Swal.fire('Success', 'Task created', 'success')
            resetForm()
            if (onTaskAdded) onTaskAdded()
          } catch (err) {
            console.error(err)
            await Swal.fire('Error', err.message || 'Failed to create task', 'error')
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            <div>
              <label className="block text-sm">Task Name</label>
              <Field name="title" className="w-full p-2 border rounded" />
              <div className="text-xs text-red-500"><ErrorMessage name="title" /></div>
            </div>

            <div>
              <label className="block text-sm">Description</label>
              <Field name="description" as="textarea" className="w-full p-2 border rounded" />
              <div className="text-xs text-red-500"><ErrorMessage name="description" /></div>
            </div>

            <div>
              <label className="block text-sm">Deadline</label>
              <Field name="deadline" type="date" className="w-full p-2 border rounded" />
              <div className="text-xs text-red-500"><ErrorMessage name="deadline" /></div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-green-600 text-white rounded">Add Task</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
