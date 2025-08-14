import React from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'
import Problem from './pages/Problem'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useState } from 'react'


const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    const me = async function () {
      const res = await fetch('http://localhost:5001/me', {
        method: "GET",
        headers: { "Authorization": token }
      })
      const data = await res.json();
      if (data.success) {
        setUser(data)
      } else {
        localStorage.removeItem("token")
        setLoading(false)
        navigate('/sigin')
      }

    }
    me()
  }, [navigate])
  return (
    <div>
      <div>
        {loading && <div className='bg-black min-h-screen'>loading......</div>}
      </div>
      <Toaster />

      <Navbar />
      <Routes>
        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" replace />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/home' replace />} />
        <Route path='/signin' element={!user ? <SignIn /> : <Navigate to='/home' replace />} />
        <Route path="/problems" element={user ? <Problem /> : <Navigate to="/signin" replace />} />
      </Routes>
    </div>
  )
}

export default App