// sphereEngineService.js
const { sphereEngineToken } = require('./config');

// Use the `sphereEngineToken` in your API requests
axios.post('https://api.example.com/endpoint', {
  token: sphereEngineToken,
  // other request parameters
})
.then(response => {
  // handle the response
})
.catch(error => {
  // handle the error
});
