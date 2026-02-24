import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

// FIX CORS FULLY
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/staff", staffRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Discord Staff API Running 🚀");
});

// Render chooses port automatically
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT} 🚀`);
});
