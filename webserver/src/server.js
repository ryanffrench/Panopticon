const fs = require('fs');
const path = require('path');
const next = require('next');
const express = require('express');
const https = require('https');

// Set up paths for your SSL certificates
const keyPath = path.join(__dirname, '../cert/localhost/localhost.decrypted.key');
const certPath = path.join(__dirname, '../cert/localhost/localhost.crt');

const key = fs.readFileSync(keyPath);
const cert = fs.readFileSync(certPath);

// Set up Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextConfig = {
    dev,
    dir: path.join(__dirname, '../../frontend'),    // Where your Next.js app source code is
    conf: {
        distDir: path.join(__dirname, '../../frontend/.next')  // Where the build output is
    }
};

console.log('Next.js directory:', path.join(__dirname, '../../frontend')); // Debug log
const app = next(nextConfig);
const handle = app.getRequestHandler();

const server = express();

app.prepare().then(() => {
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    // Start HTTPS server
    const httpsServer = https.createServer({ key, cert }, server);

    const port = 3000;
    httpsServer.listen(port, () => {
        console.log(`Server is listening on https://localhost:${port}`);
    });
}).catch((err) => {
    console.error('Error starting Next.js app:', err);
    console.error('Current directory:', __dirname);  // Debug log
});