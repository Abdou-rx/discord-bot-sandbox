'use client'

export default function BotStatus({ status, message, startTime }) {
  const calculateUptime = () => {
    if (!startTime) return '0d 0h 0m'
    const start = new Date(startTime)
    const now = new Date()
    const diff = now - start
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <div className="p-4 bg-gray-700 rounded-md">
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded-full mr-2 ${status === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="font-medium">
          {status === 'running' ? 'Bot is running' : 'Bot is offline'}
        </span>
      </div>
      
      <p className="mb-2">{message}</p>
      
      {status === 'running' && (
        <div className="text-sm text-gray-300">
          <p>Uptime: {calculateUptime()}</p>
          <p className="mt-1">
            Remember: The bot will automatically shut down after 7 days.
          </p>
        </div>
      )}
    </div>
  )
}