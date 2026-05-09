import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// routes


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running ✔");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});