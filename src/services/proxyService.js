const axios = require('axios');

const getProxy = async () => {
  try {
    // Using free proxy list API
    const response = await axios.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all');
    const proxies = response.data.split('\n').filter(proxy => proxy.trim());
    return proxies[Math.floor(Math.random() * proxies.length)];
  } catch (error) {
    console.error('Error fetching proxy:', error);
    return null;
  }
};

module.exports = { getProxy };