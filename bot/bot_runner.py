import nextcord
from nextcord.ext import commands
from nextcord import Interaction
import asyncio
import sys

def run_bot(token: str):
    intents = nextcord.Intents.default()
    intents.message_content = True
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

    bot.run(token)

if __name__ == "__main__":
    token = sys.argv[1]
    run_bot(token)