export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return Response.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    console.log(`Calling backend at: ${apiUrl}/api/start-bot`);
    
    const response = await fetch(`${apiUrl}/api/start-bot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend error:', errorData);
      throw new Error(errorData.detail || 'Failed to start bot');
    }

    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    console.error('API route error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}