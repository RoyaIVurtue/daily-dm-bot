const { Client, GatewayIntentBits, Partials } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

// Your daily messages (Sunday → Saturday)
const messages = [
  "Good morning sweet girl, I hope you have an amazing day! I love you so much!",
  "Good morning beautiful! I love you so so much have a great day ml",
  "Good morning love! I hope you have the best day, I love youu",
  "Good morning hun! Inħobbok ħafna għandek ġurnata sabiħa!",
  "Good morning goergous! Shi did I spell that ritgh",
  "Good morning ml! Weekend is tmrr! I love u smmm",
  "Good morning!! I love uuu its finally the weekendd!"
];

// Use the updated event name so the bot stays alive
client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Runs every day at 11:00 UTC (adjust if needed)
  cron.schedule("0 11 * * *", async () => {
    try {
      const user = await client.users.fetch("1274883986719506539");

      const today = new Date().getDay(); // 0–6
      const messageToSend = messages[today];

      await user.send(messageToSend);
      console.log("Daily DM sent:", messageToSend);
    } catch (err) {
      console.error("Failed to send daily DM:", err);
    }
  });
});

// IMPORTANT: use environment variable on Railway
client.login(process.env.TOKEN);
