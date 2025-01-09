/*
This script is intended to handle the server and routing for the application
*/

// Node imports
import express from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import session from 'express-session';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 2555;

import signup from './routes/signup.js';
import login from './routes/login.js';
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// Home route (public)
app.get('/', (req, res) => {
    res.render('pages/landingpage');
});

app.use('/signup', signup)
app.use('/login', login)

// for any routes that do not exist it will redirect
app.get('*', (req, res) => {
    res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


// Made by A^2
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});