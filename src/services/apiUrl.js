// config/apiUrl.js
const apiUrl = (() => {
  return process.env.NEXT_PUBLIC_API_URL || 'https://staging.tractorgyan.com';
})();

export default apiUrl;
