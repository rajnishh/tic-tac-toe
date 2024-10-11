// config.js

const config = {
  development: {
    API_URL: 'http://localhost:5000',
  },
  production: {
    API_URL: 'https://your-production-url.com',
  },
};

// Dynamically export based on the environment
export const API_URL = __DEV__ ? config.development.API_URL : config.production.API_URL;
