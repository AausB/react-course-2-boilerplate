const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'public')

app.use(express.static(publicPath));

// handle get requests
// serve all routes
app.get('*', (request, response) => {
  response.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});