const dev = 'http://localhost:8081/'
const prod = 'http://49.234.23.113:8081/'
export const baseURL = process.env.NODE_ENV === "development" ? dev : prod;

// console.log(baseURL, 'process.env.REACT_APP_API_URL');
