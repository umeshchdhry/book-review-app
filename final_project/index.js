const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Authentication Middleware
app.use("/customer/auth/*", function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied');
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = decoded;
        next();
    });
});

const PORT = 5000;
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
