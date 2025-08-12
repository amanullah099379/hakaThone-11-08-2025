import * as Yup from 'yup'

export const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
})

export const taskSchema = Yup.object().shape({
  title: Yup.string().min(3, 'Too short').required('Required'),
  description: Yup.string().max(500, 'Too long'),
  deadline: Yup.date()
    .required('Required')
    .test('is-future', 'Deadline must be today or in the future', function (value) {
      if (!value) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const valDate = new Date(value)
      valDate.setHours(0, 0, 0, 0)
      return valDate >= today
    }),
})
