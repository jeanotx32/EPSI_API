/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const API_KEY = "8f94826adab8ffebbeadb4f9e161b2dc";

const todoRoutes = require('./routes/todo');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = 8000;

// PROTECT ALL ROUTES THAT FOLLOW
app.use((req, res, next) => {
    const apiKey = req.get('Authorization');
    if (!apiKey || apiKey !== `Bearer ${API_KEY}`) {
      res.status(401).json({error: 'unauthorised'});
    } else {
      next();
    }
  });

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// Routes "Todo"
app.use('/api', todoRoutes);

// Fallback route
app.use((req, res) => {
    res.status(404);
});


