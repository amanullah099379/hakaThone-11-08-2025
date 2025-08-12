import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { sendResetEmail } from '../../services/authService'
import Swal from 'sweetalert2'

const schema = Yup.object().shape({ email: Yup.string().email('Invalid email').required('Required') })

export default function ForgotPassword() {
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await sendResetEmail(values.email)
            await Swal.fire('Success', 'Password reset email sent', 'success')
          } catch (err) {
            console.error(err)
            await Swal.fire('Error', err.message || 'Failed to send email', 'error')
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
            <button disabled={isSubmitting} type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Send Reset Email</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
