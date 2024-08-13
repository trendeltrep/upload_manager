require('dotenv').config();
const express = require('express');
const fs = require('fs');
var cors = require('cors')
const path = require('path');
const multer = require('multer');
const unzipper = require('unzipper');
const puppeteer = require('puppeteer');
const app = express();
app.use(cors());

const backendPort = 3000;
const frontendPort = 3001;

//enabling cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${frontendPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//validate filetype and size
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }, //max file size - 10mb
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/x-zip-compressed' ||
            file.mimetype === 'application/zip'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only ZIP files are allowed.'));
        }
    }
});

app.use(express.static('public'));

app.post('/upload', upload.single('archive'), async (req, res) => {
    const archivePath = req.file.path;
    const extractPath = path.join(__dirname, 'extracted');

    //unzip archive and save into "exctract" folder
    await fs.createReadStream(archivePath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .promise();

    //make screenshot and save it into "screenshot.png"
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const indexPath = path.join(extractPath, 'index.html');
    await page.goto(`file://${indexPath}`, {"waitUntil" : "networkidle2"});
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
    
    res.sendFile(path.join(__dirname, 'screenshot.png'));
});

app.listen(backendPort, () => {
    console.log(`Backend started on http://localhost:${backendPort}`);
});
