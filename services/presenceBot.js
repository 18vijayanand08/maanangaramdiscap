// services/presenceBot.js
import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

// Login bot
client.login(process.env.BOT_TOKEN);

// Bot ready log
client.on("ready", () => {
  console.log(`Presence Bot Logged in as ${client.user.tag}`);
});

/**
 * Fetch basic user info
 */
export const fetchDiscordUser = async (userId) => {
  const user = await client.users.fetch(userId);

  return {
    id: user.id,
    username: user.username,
    avatar: user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : null
  };
};

/**
 * Fetch presence (online/offline + activity)
 */
export const fetchPresence = async (userId) => {
  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);

    // Fetch member and presence
    const member = await guild.members.fetch(userId);

    if (!member.presence) {
      return {
        status: "offline",
        custom_status: null,
        activity: null
      };
    }

    const presence = member.presence;
    const activity = presence.activities?.[0] || null;

    return {
      status: presence.status,
      custom_status: activity?.state || null,
      activity: activity?.name || null
    };

  } catch (err) {
    console.log("Presence Fetch Error:", err.message);
    return {
      status: "offline",
      custom_status: null,
      activity: null
    };
  }
};