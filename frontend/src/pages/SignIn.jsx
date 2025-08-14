import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const signupControls = [
    { id: 1, type: 'email', name: 'email', label: 'Email', placeholder: 'Enter you email' },
    { id: 2, type: 'password', name: 'password', label: 'Password', placeholder: 'Enter you password' }
]

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate()

    function onDataChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    async function signinHandler(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5001/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })
            const data = await res.json()

            if (data.token) {
                const token = data.token
                toast.success(data.message)
                localStorage.setItem("token", token)
                navigate('/home')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log("Error in signin", error.message)

        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-300'>
            <div className='bg-gray-800 p-10 flex flex-col items-center justify-center'>
                <h3 className='text-3xl text-white'>Sign-in</h3>
                <h4 className='text-l text-gray-200'>Already have an account? Sign-up</h4>
                {
                    signupControls.map((con) => (
                        <div key={con.id} className='p-4 w-110'>
                            <label className='text-sm text-white'>{con.label}</label>
                            <input
                                className='w-full bg-gray-200 rounded-md p-2'
                                value={formData[con.name] || ""}
                                onChange={onDataChange}
                                type={con.type}
                                name={con.name}
                                placeholder={con.placeholder}
                            />
                        </div>
                    ))
                }
                <button
                    className='bg-gray-500 rounded-md px-3 py-2 mt-3'
                    type='Submit' onClick={signinHandler}>Register</button>
            </div>
        </div>
    )
}

export default SignIn