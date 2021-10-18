import { startBot } from "https://deno.land/x/discordeno/mod.ts";

startBot({
  token: "BOT_TOKEN",
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