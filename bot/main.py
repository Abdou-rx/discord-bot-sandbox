from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bot_manager import BotManager
import uvicorn

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot_manager = BotManager()

@app.post("/api/start-bot")
async def api_start_bot(request: Request):
    try:
        data = await request.json()
        token = data.get('token')
        
        if not token:
            raise HTTPException(status_code=400, detail="Token is required")
        
        if bot_manager.is_bot_running(token):
            return {
                "message": "✅ Bot is already running",
                "status": "running"
            }
        
        bot_manager.start_bot(token)
        return {
            "message": "✅ Bot launched successfully. It will auto-shutdown in 7 days.",
            "status": "running"
        }
        
    except Exception as e:
        print(f"Error in api_start_bot: {str(e)}")  # Add this line
        raise HTTPException(
            status_code=500,
            detail=f"Failed to start bot: {str(e)}"
        )

@app.get("/api/test")
async def test_endpoint():
    return {"status": "ok", "message": "API is working"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)