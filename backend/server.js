const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();

// Settings
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// DB connection
const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully", uri);
});
connection.on('error', err => {
    console.error('MongoDB database connection error:', err)
})

// Routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
