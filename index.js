const express = require('express');
const { getGames, getGameById } = require('./controllers');

const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

// Exercise 1: Retrieve All Games

app.get('/games', (req, res) => {
  let result = getGames();
  if (result.length === 0) {
    return res.status(404).json({ error: 'Data not found!' });
  }
  res.json(result);
});

// Exercise 2: Retrieve Movie by ID

app.get('/games/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let result = getGameById(id);
  if (result.length === 0) {
    return res.status(404).json({ error: 'Data not found!' });
  }
  res.json(result);
});

module.exports = { app };
