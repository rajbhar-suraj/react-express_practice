import React, { useState } from 'react'

const SolvePage = ({ question }) => {
  const [code, setCode] = useState("")
  const [mySubmissions,setMySubmissions] = useState()

  async function submissionHandler(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    console.log(question.id)

    const res = await fetch('http://localhost:5001/submissions', {
      method: "POST",
      headers: { "Authorization": token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: question.id,
        code
      })
    })
    const data = await res.json()
    console.log(data)
  }

  async function getSubmissions(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    console.log(question.id)

    const res = await fetch(`http://localhost:5001/submissions/${question.id}`, {
      method: "GET",
      headers: { "Authorization": token, 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    console.log(data)
    setMySubmissions(data.questionSubmission)
    
  }
  return (
    <div className='grid grid-cols-10 h-screen'>
      <div className='col-span-5 m-5'>
        <h1 className='text-center text-4xl font-bold'>{question.id + ". " + question.title}</h1>
        <p className='mt-10 text-3xl'>Description: </p>
        <p className='mt-3 text-xl'>
          {question.description}
        </p>
        <h3 className='text-xl mt-10'>TestCases</h3>

        <ul>
          {question.testcase.map((tc, index) => (
            <li key={index} className='flex gap-2'>
              <strong>Input:</strong> {tc.input} | <strong>Output:</strong> {tc.output}
            </li>
          ))}
        </ul>
        {mySubmissions && <div>
            <h2>{mySubmissions.questionId}</h2>
            <h3>{mySubmissions.code}</h3>
            <h4>{mySubmissions.passed}</h4>
          </div>}

      </div>
      <div className='col-span-5 border-1 m-5 bg-zinc-800 text-amber-50 rounded-md'>
        <h2 className='text-2xl m-3'>Code Editor</h2>

        <textarea
          className="w-full border-1 h-1/2 p-2 rounded mt-5 text-2xl"
          placeholder="Write your solution here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          type='submit'
          onClick={submissionHandler}
          className='bg-white rounded-md px-3 py-2 m-2 text-black cursor-pointer'>
          Submit
        </button>
        <button
          type='submit'
          onClick={getSubmissions}
          className='bg-white rounded-md px-3 py-2 m-2 text-black cursor-pointer'>
          Your Submissions
        </button>

        <div>
          <h2>Test Cases</h2>
          <ul>
            {question.testcase.map((tc, index) => (
              <li key={index} className='flex gap-2'>
                <strong>Input:</strong> {tc.input} | <strong>Output:</strong> {tc.output}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SolvePage