import connectDB from "./config/connectDB.js";
import scrapeHackerNews from "./services/scraper.service.js";

const startServer = async (app, PORT) => {
  try {
    await connectDB();
    app.listen(PORT, async () => {
      console.log(`🚀 Server running on port ${PORT}`);
       await scrapeHackerNews();
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default startServer;
