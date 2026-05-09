import axios from 'axios';
import * as cheerio from 'cheerio';
import Story from '../models/story.model.js';

const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get('https://news.ycombinator.com');

    const $ = cheerio.load(data);

    const stories = [];

    $('.athing').each((index, element) => {
      if (index >= 10) return false;

      const title = $(element).find('.titleline a').text();

      const url = $(element).find('.titleline a').attr('href');

      const subtext = $(element).next();

      const pointsText = subtext.find('.score').text();
      const points = parseInt(pointsText) || 0;

      const author = subtext.find('.hnuser').text();

      const postedAt = subtext.find('.age').text();

      stories.push({
        title,
        url,
        points,
        author,
        postedAt
      });
    });

    // Use upsert logic to ensure story IDs remain stable, preserving user bookmarks
    const operations = stories.map((story) => ({
      updateOne: {
        filter: { url: story.url },
        update: story,
        upsert: true
      }
    }));

    await Story.bulkWrite(operations);

    console.log('Stories scraped successfully');
  } catch (error) {
    console.log('Scraping failed:', error.message);
  }
};

export default scrapeHackerNews;
