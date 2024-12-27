# Twitter Trends Scraper

A web application that automatically scrapes trending topics from Twitter using Selenium WebDriver, stores the data in MongoDB, and displays results through a simple web interface. The application uses proxy rotation for making requests and maintains a historical record of trending topics.

## Features

- Automated Twitter trending topics scraping using Selenium
- Proxy rotation using ProxyMesh for IP address management
- MongoDB integration for data persistence
- Web interface for triggering scrapes and viewing results
- Unique ID generation for each scraping session
- Timestamp and IP address tracking

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Chrome browser
- Twitter account credentials

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd twitter-trends-scraper
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
TWITTER_USERNAME=your_twitter_username

TWITTER_PASSWORD=your_twitter_password

MONGODB_URI=your_mongodb_connection_string

PORT=3000
```

## Project Structure

```
├── node_modules
├── src
│   ├── config
│   │   └── db.js           # MongoDB configuration
│   ├── models
│   │   └── trend.js        # MongoDB schema for trends
│   ├── public
│   │   └── index.html      # Web interface
│   ├── services
│   │   ├── proxyService.js # Proxy rotation logic
│   │   └── scraper.js      # Selenium scraping implementation
│   └── server.js           # Express server setup
├── .env
├── package-lock.json
└── package.json
```

## Usage

1. Start the server:

```bash
node src/server.js
```

2. Open your browser and navigate to `http://localhost:3000`

3. Click the "Run Script" button to initiate scraping

4. View the results displayed on the page, including:
   - Top 5 trending topics
   - Timestamp of the scrape
   - IP address used for the request
   - JSON representation of the MongoDB record

## API Endpoints

- `POST /scrape`: Triggers the scraping process and returns the results

## Data Structure

Each trend record in MongoDB contains:
```json
{
  "uniqueId": "uuid-v4-string",
  "nameoftrend1": "First trending topic",
  "nameoftrend2": "Second trending topic",
  "nameoftrend3": "Third trending topic",
  "nameoftrend4": "Fourth trending topic",
  "nameoftrend5": "Fifth trending topic",
  "timestamp": "ISO timestamp",
  "ipAddress": "IP address used"
}
```

## Technical Implementation

### Scraping Module

- Uses Selenium WebDriver for browser automation
- Implements headless Chrome for efficiency
- Handles Twitter authentication
- Extracts trending topics from the Twitter homepage

### Proxy Service

- Rotates through available proxies
- Implements error handling for failed proxy connections
- Uses ProxyScrape API for proxy list generation

### Database Integration

- MongoDB connection with mongoose
- Implements schema validation
- Handles concurrent requests

## Error Handling

The application implements comprehensive error handling for:
- Failed scraping attempts
- Database connection issues
- Proxy rotation failures
- Invalid Twitter credentials

## Security Considerations

- Secure storage of Twitter credentials in environment variables
- Input validation for all API endpoints
- Error message sanitization
- Rate limiting implementation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.