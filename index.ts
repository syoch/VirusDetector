import { startBot } from "https://deno.land/x/discordeno/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

startBot({
  token: config().DISCORD_TOKEN,
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      console.log(message.content)
    },
  },
});