const movies = require('./data/movies')

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

// static
app.use(express.static('public'));

// logging
app.use(morgan('combined', { stream: fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'}) }));

// error logging
app.use((err, req, res, next) => {
  console.error(err.stack);
});

// requests
app.get('/', (req, res) => {
  res.send('This is my movie API! There are many like it but this one is mine!');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
