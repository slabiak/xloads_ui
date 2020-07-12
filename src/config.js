const dev = {
    MAP_API_PREFIX: 'http://localhost:8087',
    MAP_API_TIMEOUT: 5000,
    
    OFFERS_API_PREFIX : 'http://localhost:8080',
    OFFERS_API_TIMEOUT: 5000,
  };
  
  const prod = {
    MAP_API_PREFIX: 'http://13.70.192.93:8087',
    MAP_API_TIMEOUT: 30000,
    
    OFFERS_API_PREFIX : 'http://13.70.192.93:8080',
    OFFERS_API_TIMEOUT: 30000,
  }; 
  
  const config = process.env.NODE_ENV === 'production'
    ? prod
    : dev;
  
  export default {
    //common config
    ...config
  };