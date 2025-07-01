'use client'

import { useState } from 'react'

export default function TokenForm({ onSubmit, error }) {
  const [token, setToken] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(token)
    setToken('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="token" className="block text-sm font-medium mb-2">
          Discord Bot Token
        </label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter your bot token"
        />
        <p className="mt-1 text-xs text-gray-400">
          Never share your token with anyone. It will only be used to start your bot.
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Launch Bot
      </button>
    </form>
  )
}