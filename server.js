const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.static("Public"));

/* ================= MONGODB ================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

/* ================= AUTH ROUTES ================= */
const authRoutes = require("./Routes/auth");
app.use("/api/auth", authRoutes);

/* ================= DEBUG: LIST MODELS ================= */
app.get("/models", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CHAT ROUTE ================= */
app.post("/api/chat", async (req, res) => {
  try {
    console.log("CHAT ROUTE HIT");

    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      reply: text || "No response from AI"
    });

  } catch (err) {
    console.log("CHAT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* ================= START SERVER ================= */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});