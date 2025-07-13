const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(__dirname, {
  index: 'index.html'
}));

// Route to serve JSON
app.get('/api/markers', (req, res) => {
  try {
    const data = require('./encampment_map_data.json');
    res.json(data);
  } catch (error) {
    console.error('Error serving JSON:', error);
    res.status(500).json({ error: 'Failed to serve JSON' });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
