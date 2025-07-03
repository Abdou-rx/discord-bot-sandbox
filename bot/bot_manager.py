import subprocess
import time
from typing import Dict

class BotManager:
    def __init__(self):
        self.active_bots: Dict[str, dict] = {}
        
    def start_bot(self, token: str):
        """Start a new bot instance in a separate process"""
        print(f"Attempting to start bot with token: {token[:5]}...")
        
        if token in self.active_bots:
            print("Bot already running")
            return {
                "message": "✅ Bot is already running",
                "status": "running"
            }
            
        try:
            # Start bot in a separate process
            process = subprocess.Popen(
                ["python", "bot/bot_runner.py", token],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            
            self.active_bots[token] = {
                "status": "running",
                "start_time": time.time(),
                "process": process
            }
            
            return {
                "message": "✅ Bot launched successfully. It will auto-shutdown in 7 days.",
                "status": "running"
            }
            
        except Exception as e:
            print(f"Error starting bot: {str(e)}")
            raise
            
    def is_bot_running(self, token: str) -> bool:
        """Check if a bot is already running with this token"""
        return token in self.active_bots and self.active_bots[token]["status"] == "running"
    
    def get_bot_status(self, token: str) -> dict:
        """Get the status of a bot"""
        if token not in self.active_bots:
            return None
            
        return self.active_bots[token].copy()