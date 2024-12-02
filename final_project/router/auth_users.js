const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// User database mock
const users = [];

// Register route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(u => u.username === username);
    if (userExists) return res.status(400).send('User already exists');
    users.push({ username, password });
    res.status(201).send('User registered successfully');
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(400).send('Invalid credentials');
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = { authenticated: router };
