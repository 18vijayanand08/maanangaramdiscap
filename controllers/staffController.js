import { fetchDiscordUser, fetchPresence } from "../services/presenceBot.js";

export const getDiscordStaff = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await fetchDiscordUser(userId);
    const presence = await fetchPresence(userId);

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        status: presence.status,
        custom_status: presence.custom_status,
        activity: presence.activity
      }
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    return res.json({ success: false, error: "Failed to fetch Discord user" });
  }
};