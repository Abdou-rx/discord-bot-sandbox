export async function POST(request) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is required" }),
        { status: 400 }
      )
    }

    // In a real implementation, you would call your FastAPI endpoint here
    const response = await fetch('https://urban-space-doodle-r4pj66w599rp2x4x6-8000.app.github.dev/api/start-bot', {
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