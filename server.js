import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();

// ✅ Allow ALL sources (temporary)
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// API routes
app.use("/api/staff", staffRoutes);

app.get("/", (req, res) => {
  res.send("Discord Staff API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
