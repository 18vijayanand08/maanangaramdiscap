import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

// ENABLE CORS FOR EVERYONE (FIXES YOUR ERROR)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Routes
app.use("/api/staff", staffRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Discord Staff API Running 🚀");
});

// Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT} 🔥`)
);
