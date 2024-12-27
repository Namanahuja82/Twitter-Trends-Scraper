
// // src/server.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const { scrapeTrends } = require('./services/scraper');
const Trend = require('./models/trend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// // Scrape endpoint
// app.post('/scrape', async (req, res) => {
//   try {
//     const trendData = await scrapeTrends();
//     const trend = new Trend(trendData);
//     await trend.save();
//     res.json(trendData);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to scrape trends' });
//   }
// });



app.post('/scrape', async (req, res) => {
    try {
      console.log('Starting scrape request...');
      const trendData = await scrapeTrends();
      console.log('Scrape successful, saving to database...');
      
      const trend = new Trend(trendData);
      await trend.save();
      console.log('Data saved to database');
      
      res.json(trendData);
    } catch (error) {
      console.error('Error in /scrape endpoint:', error);
      res.status(500).json({ 
        error: 'Failed to scrape trends',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });


  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
