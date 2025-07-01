import TokenForm from './components/TokenForm'
import BotStatus from './components/BotStatus'

export default function Home() {
  const handleSubmit = async (token) => {
    'use server'
    try {
      const response = await fetch('http://localhost:8000/api/start-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        throw new Error('Failed to start bot')
      }

      return await response.json()
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚀 Discord Bot Sandbox
      </h1>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <TokenForm onSubmit={handleSubmit} error={null} />
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