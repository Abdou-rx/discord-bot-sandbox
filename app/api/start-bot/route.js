export async function POST(request) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400 }
      )
    }

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

    const data = await response.json()
    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }
}