'use client'

import { useState } from 'react'
import TokenForm from './components/TokenForm'

export default function Home() {
  const [error, setError] = useState(null)
  const [botStatus, setBotStatus] = useState(null)

  const handleSubmit = async (token) => {
    try {
      const response = await fetch('/api/start-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()
      if (response.ok) {
        setBotStatus({
          status: 'running',
          message: data.message,
          startTime: new Date().toISOString(),
        })
        setError(null)
      } else {
        throw new Error(data.error || 'Failed to start bot')
      }
    } catch (err) {
      setError(err.message)
      setBotStatus(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚀 Discord Bot Sandbox
      </h1>
    <div className="bg-[#000000] rounded-lg p-6 shadow-[0_0_10px_#4b0082,0_0_20px_#8000ff,0_0_40px_#bf40ff]">
      <TokenForm onSubmit={handleSubmit} error={error} />
    </div>
      <div className="mt-8 text-sm text-gray-400">
        <p>
          This tool helps you get the Discord Active Developer badge by running
          a simple bot with a slash command.
        </p>
        <p className="mt-2">
          The bot will automatically shut down after 7 days to prevent
          unnecessary resource usage.
        </p>
      </div>
    </div>
  )
}