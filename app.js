const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

let sessionHistory = new Set();

let lastRequestTime = 0;

function rateLimit(req, res, next) {
    const currentTime = new Date().getTime();
    if (currentTime - lastRequestTime < 1000) {
        return res.status(429).json({ error: "Rate limit exceeded. Please wait a second." });
    }
    lastRequestTime = currentTime;
    next();
}

const existingFolders = [];

const approvedFolders = ['png', 'gif', 'jpg', 'jpeg', 'webm', 'mp4', /* other folders */];

approvedFolders.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    if (fs.existsSync(folderPath)) {
        existingFolders.push(folderPath);
    }
});

// You can optionally log the existing folders for debugging
console.log('Existing Folders:', existingFolders);

function getRandomUrl(validFolders) {
    if (validFolders.length === 0) {
        return null;
    }

    const randomFolder = validFolders[Math.floor(Math.random() * validFolders.length)];
    const validsFilePath = path.join(randomFolder, 'valids.txt');
    
    try {
        const data = fs.readFileSync(validsFilePath, 'utf8');
        const urls = data.split('\n').filter(Boolean);

        // Check if all URLs have been served
        const unservedUrls = urls.filter(url => !sessionHistory.has(url));
        if (unservedUrls.length === 0) {
            // Reset session history if all URLs have been served
            sessionHistory.clear();
            return urls[Math.floor(Math.random() * urls.length)];
        }

        return unservedUrls[Math.floor(Math.random() * unservedUrls.length)];

    } catch (err) {
        console.error(`Error reading file ${validsFilePath}:`, err);
        return null;
    }
}



// Endpoint to get available folders
app.get('/folders', (req, res) => {
    // Send just the folder names, not full paths
    const folderNames = existingFolders.map(folderPath => path.basename(folderPath));
    res.json(folderNames);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/random-url', rateLimit, (req, res) => {
    const selectedFolders = req.query.folders ? req.query.folders.split(',') : approvedFolders;
    const validFolders = existingFolders.filter(folderPath => 
        selectedFolders.includes(path.basename(folderPath))
    );

    const url = getRandomUrl(validFolders);
    if (url) {
        sessionHistory.add(url); // Add the served URL to the session history
        res.send({ url });
    } else {
        res.status(200).send({ message: 'No valid URLs found.' });
    }
});


// Example: Resetting the session history
sessionHistory = new Set();


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});