import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

// ---- FIX CORS COMPLETELY ---- //
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));
app.options("*", cors()); // Important
// ------------------------------ //

app.use(express.json());

// Routes
app.use("/api/staff", staffRoutes);

// Root Test Endpoint
app.get("/", (req, res) => {
  res.send("Discord Staff API Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT} 🔥`);
});
