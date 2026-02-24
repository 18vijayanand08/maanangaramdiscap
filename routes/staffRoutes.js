import express from "express";
import { getDiscordStaff } from "../controllers/staffController.js";

const router = express.Router();

// /api/staff/:id
router.get("/:id", getDiscordStaff);

export default router;