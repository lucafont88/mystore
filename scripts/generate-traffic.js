const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const ENDPOINTS = [
  '/health',
  '/api/v1/auth/login', // Expected to fail if no data
  '/api/v1/products',
  '/non-existent'
];

async function sendRequest() {
  const endpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
  try {
    console.log(`Sending request to ${BASE_URL}${endpoint}`);
    await axios.get(`${BASE_URL}${endpoint}`);
  } catch (err) {
    console.log(`Request to ${endpoint} failed with status ${err.response?.status || 'Error'}`);
  }
}

console.log('Starting traffic generation (Ctrl+C to stop)...');
setInterval(sendRequest, 2000);
