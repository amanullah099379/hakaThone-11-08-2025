import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { signupSchema } from '../../utils/validators'
import { signup as fbSignup } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Signup() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await fbSignup(values.email, values.password)
            await Swal.fire('Success', 'Signup successful. Check your email for verification.', 'success')
            navigate('/verify')
          } catch (err) {
            console.error(err)
            await Swal.fire('Error', err.message || 'Failed to signup', 'error')
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

            <div>
              <label className="block text-sm">Confirm Password</label>
              <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" />
              <div className="text-xs text-red-500"><ErrorMessage name="confirmPassword" /></div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 text-white rounded">Signup</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
