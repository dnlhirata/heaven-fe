"use client"
import { useState } from "react"

export default function Questions({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])

  const generateQuestions = async () => {
    setLoading(true)
    const response = await fetch(`http://localhost:8000/api/books/${bookId}/generate_questions/`)
    const data = await response.json()
    setQuestions(data.questions)
    setLoading(false)
  }

  return (
      <section className="flex-1 h-auto overflow-y-auto p-3 border-2 border-gray-400">
        <h1 className="text-center py-2">Question Generator</h1>
        <button className="bg-purple-950 px-2 py-1 rounded text-sm" onClick={generateQuestions}>Generate questions</button>
        {loading ? <div>Generating...</div> :
          <ol>
            {questions.map((question: string, index: number) => (<li className="py-1" key={index}>{question}</li>))}
          </ol>
        }
      </section>
  )
}