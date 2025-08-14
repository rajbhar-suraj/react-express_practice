import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const navbarControls = [{ name: "NeetCode", path: '/home' }, { name: "Problems", path: "/problems" }, { name: "Sign-up", path: '/signup' }, { name: "Sign-in", path: '/signin' }]

const Navbar = () => {
    const navigate = useNavigate()
    function logoutHandler() {
        localStorage.removeItem("token")
        navigate('/signin')
    }
    return (
        <div className='bg-white  p-3'>
            <div className='flex items-center justify-center gap-9'>
                {
                    navbarControls.map((nav, index) => (
                        <Link to={nav.path} key={index} className='text-xl font-semibold text-gray-500'>
                            {nav.name}
                        </Link>
                    ))
                }
                <button onClick={logoutHandler} className='bg-black px-3 py-1.5 text-xl font-semibold text-white rounded-md'>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Navbar