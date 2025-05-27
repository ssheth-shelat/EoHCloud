const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5500; // Same as Live Server default port or change if needed

const FILE_ID = '1dfnwpTrNC32c5O3PADhThyaKIo4vqXrt'; // Replace with actual Google Drive file ID
const FILE_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;
const LOCAL_FILE_PATH = path.join(__dirname, 'encampment_map_data.json');

// Serve static files (index.html, JSON, etc.)
app.use(express.static(__dirname));

// Route to download JSON
app.get('/download-json', async (req, res) => {
  try {
    const response = await fetch(FILE_URL);
    const data = await response.text(); // Google Drive returns as text
    
    fs.writeFileSync(LOCAL_FILE_PATH, data);
    console.log('JSON downloaded and saved to project directory.');
    
    res.status(200).send('JSON downloaded successfully');
  } catch (error) {
    console.error('Error downloading JSON:', error);
    res.status(500).send('Error downloading JSON');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
