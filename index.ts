import { startBot } from "https://deno.land/x/discordeno/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { check } from "./checker.ts";

startBot({
  token: config().DISCORD_TOKEN,
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    async messageCreate(message) {
      const scanResult = await check(message);

      if (!scanResult) {
        return;
      }

      let response = "";

      response += "```md\n"
      for (const key in scanResult) {
        if (!Object.prototype.hasOwnProperty.call(scanResult, key)) {
          continue
        }
        const result = scanResult[key];

        if (result.length > 0) {
          response += `${key}: ${result.join(", ")}\n`;
        }
      }
      response += "```";

      message.reply(response, false);

    },
  },
});