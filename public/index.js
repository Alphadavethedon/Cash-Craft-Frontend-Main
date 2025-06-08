const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Vite default port
  credentials: true, // If you use cookies/JWT in httpOnly
}));
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));