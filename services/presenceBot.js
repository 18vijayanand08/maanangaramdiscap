import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

let botReady = false;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

// Login
client.login(process.env.BOT_TOKEN).catch(err => {
  console.error("Bot login failed:", err);
});

// Ready event
client.on("ready", () => {
  botReady = true;
  console.log(`Presence Bot Ready as ${client.user.tag}`);
});

// SAFE FETCH USER
export const fetchDiscordUser = async (userId) => {
  if (!botReady) {
    console.log("Bot not ready yet");
    return null;
  }

  try {
    const user = await client.users.fetch(userId);

    return {
      user_id: user.id,
      username: user.username,
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    };
  } catch (err) {
    console.error("Fetch user error:", err);
    return null;
  }
};

// SAFE PRESENCE
export const fetchPresence = async (userId) => {
  if (!botReady) {
    console.log("Bot not ready yet");
    return {
      status: "offline",
      custom_status: null,
      activity: null
    };
  }

  try {
    const guild = await client.guilds.fetch(process.env.SERVER_ID);
    const member = await guild.members.fetch(userId);

    const p = member.presence;

    return {
      status: p?.status || "offline",
      custom_status: p?.activities?.[0]?.state || null,
      activity: p?.activities?.[0]?.name || null
    };
  } catch (err) {
    console.error("Presence fetch error:", err);
    return {
      status: "offline",
      custom_status: null,
      activity: null
    };
  }
};
