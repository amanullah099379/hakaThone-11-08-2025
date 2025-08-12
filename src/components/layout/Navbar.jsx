import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { logout as fbLogout } from '../../services/authService'
import Swal from 'sweetalert2'

export default function Navbar() {
  const user = useAuthStore((s) => s.user)
  const clearUser = useAuthStore((s) => s.clearUser)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const res = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true
    })
    if (res.isConfirmed) {
      await fbLogout()
      clearUser()
      navigate('/login')
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="font-bold text-lg">Task Manager</Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm">{user.email}</div>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="px-3 py-1 bg-blue-500 text-white rounded">Login</Link>
              <Link to="/signup" className="px-3 py-1 bg-green-500 text-white rounded">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
