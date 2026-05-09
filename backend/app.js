import "./src/config/env.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import startServer from "./src/server.js";
import errorHandler from "./src/middleware/errorHandler.js";

import authRoutes from "./src/routes/auth.routes.js";
import scrapeRoutes from "./src/routes/scrape.routes.js";
// import scrapeHackerNews from "./src/services/scraper.service.js";
import storyRoutes from "./src/routes/story.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Get directory name from ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.join(__dirname, "../client/dist");

// ---------------------------
// Global Middleware Setup
// ---------------------------
app.use(express.json({ limit: "400kb" }));
app.use(express.urlencoded({ extended: true, limit: "400kb" }));
app.use(cookieParser());

// ---------------------------
// CORS Setup (Dev Only)
// ---------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5001",
  process.env.CORS_ORIGIN,
].filter(Boolean);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    }),
  );
}

// ---------------------------
// API Route Handlers
// ---------------------------
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/scrape", scrapeRoutes);
app.use("/api/stories", storyRoutes);

// ---------------------------
// Serve Static Frontend Assets (Production)
// ---------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// ---------------------------
// Centralized Error Handling
// ---------------------------
app.use(errorHandler);

// ---------------------------
// Start Server
// ---------------------------
startServer(app, PORT);
