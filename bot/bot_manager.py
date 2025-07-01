import nextcord
from nextcord.ext import commands
from nextcord import Interaction
import asyncio
import threading
import time
from typing import Dict

class BotManager:
    def __init__(self):
        self.active_bots: Dict[str, dict] = {}
        
    def start_bot(self, token: str):
    """Start a new bot instance"""
    print(f"Attempting to start bot with token: {token[:5]}...")  # Log first 5 chars
    
    if token in self.active_bots:
        print("Bot already running")
        return
        
    try:
        intents = nextcord.Intents.default()
        bot = commands.Bot(command_prefix="!", intents=intents)
        
        @bot.slash_command(name="active", description="Claim Active Developer badge!")
        async def active(interaction: Interaction):
            await interaction.response.send_message(
                "✅ You've been registered for the Active Developer Badge.\n"
                "Please wait ~24-48 hours, then visit: "
                "https://discord.com/developers/active-developer"
            )
        
        @bot.event
        async def on_ready():
            print(f"[+] Bot started: {bot.user}")
            self.active_bots[token] = {
                "status": "running",
                "start_time": time.time(),
                "bot": bot
            }
            asyncio.create_task(self.schedule_shutdown(bot, token))
        
        def run():
            try:
                print("Starting bot...")
                bot.run(token)
            except Exception as e:
                print(f"[!] Error with bot token: {e}")
                if token in self.active_bots:
                    self.active_bots[token]["status"] = "error"
                    self.active_bots[token]["error"] = str(e)
        
        threading.Thread(target=run, daemon=True).start()
        print("Bot thread started")
        
    except Exception as e:
        print(f"Error in bot initialization: {str(e)}")
        raise
        
    async def schedule_shutdown(self, bot, token):
        """Schedule bot shutdown after 7 days"""
        await asyncio.sleep(60 * 60 * 24 * 7)  # 7 days
        await bot.close()
        if token in self.active_bots:
            self.active_bots[token]["status"] = "stopped"
            self.active_bots[token]["stop_time"] = time.time()
        print(f"[-] Bot shut down: {bot.user}")
    
    def is_bot_running(self, token: str) -> bool:
        """Check if a bot is already running with this token"""
        return token in self.active_bots and self.active_bots[token]["status"] == "running"
    
    def get_bot_status(self, token: str) -> dict:
        """Get the status of a bot"""
        if token not in self.active_bots:
            return None
            
        status = self.active_bots[token].copy()
        status.pop("bot", None)  # Don't return the bot instance
        return status

