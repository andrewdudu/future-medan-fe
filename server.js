require('dotenv').config(); // read .env files
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});