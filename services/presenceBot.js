// services/presenceBot.js
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

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

// Bot ready
client.on("ready", () => {
  console.log(`Presence bot logged in as ${client.user.tag}`);
});

// Get basic user info
export const fetchDiscordUser = async (userId) => {
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

// Get presence (online/offline/activity)
export const fetchPresence = async (userId) => {
  try {
    const guild = await client.guilds.fetch(process.env.SERVER_ID);
    const member = await guild.members.fetch(userId);

    const presence = member.presence;
    if (!presence) {
      return {
        status: "offline",
        custom_status: null,
        activity: null
      };
    }

    return {
      status: presence.status,
      custom_status: presence.activities[0]?.state || null,
      activity: presence.activities[0]?.name || null
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
