import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { loginSchema } from '../../utils/validators'
import { login as fbLogin } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../store/useAuthStore'

export default function Login() {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const cred = await fbLogin(values.email, values.password)
            const user = cred.user
            setUser({ uid: user.uid, email: user.email, emailVerified: user.emailVerified })
            await Swal.fire('Success', 'Logged in', 'success')
            navigate('/dashboard')
          } catch (err) {
            console.error(err)
            await Swal.fire('Error', err.message || 'Login failed', 'error')
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3 bg-white p-4 rounded shadow">
            <div>
              <label className="block text-sm">Email</label>
              <Field name="email" type="email" className="w-full p-2 border rounded" />
              <div className="text-xs text-red-500"><ErrorMessage name="email" /></div>
            </div>

            <div>
              <label className="block text-sm">Password</label>
              <Field name="password" type="password" className="w-full p-2 border rounded" />
              <div className="text-xs text-red-500"><ErrorMessage name="password" /></div>
            </div>

            <div className="flex justify-between items-center">
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
              <button type="button" onClick={() => navigate('/forgot')} className="text-sm text-blue-600">Forgot?</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
