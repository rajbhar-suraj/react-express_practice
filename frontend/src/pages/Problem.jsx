import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SolvePage from '../components/SolvePage'

const Problem = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [solvePage, setSolvePage] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem("token")
    const getQuestions = async () => {
      const res = await fetch('http://localhost:5001/questions', {
        method: "GET",
        headers: { "Authorization": token }
      })
      const data = await res.json()
      setQuestions(data.filteredQuestions)
    }
    getQuestions()
  }, [])

  async function questionHandler(problemId) {
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5001/question/${problemId}`)
    const data = await res.json()
    if (data.success) {
      setSolvePage(data)
    }
  }
  return (
    <>
      <div>
        {
          solvePage
            ?
            <>
              <button
                className='bg-black text-white m-2 rounded-md px-4 py-2 mt-3'
                onClick={() => setSolvePage(null)}>Back</button>
              <SolvePage question={solvePage.question}/>
            </>
            :
            <div className="flex justify-center items-center mt-10 w-screen">
              <table className="table-auto border-collapse border border-gray-400 w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Title</th>
                    <th className="border border-gray-300 px-4 py-2">Difficulty</th>
                    <th className="border border-gray-300 px-4 py-2">Acceptance</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((quest) => (
                    <tr key={quest.problemId} onClick={() => questionHandler(quest.problemId)} className="hover:bg-gray-100 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2">
                        {quest.problemId}. {quest.title}
                      </td>
                      <td className={`${quest.difficulty === "Medium" ? "text-amber-600 " : "text-green-700 "}border border-gray-300 px-4 py-2`}>{quest.difficulty}</td>
                      <td className={`${quest.difficulty === "Medium" ? "text-amber-600 " : "text-green-700 "}border border-gray-300 px-4 py-2`}>{quest.acceptance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
    </>

  )
}

export default Problem