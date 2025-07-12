const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Vercel's dynamic port

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve JSON directly
app.get('/api/markers', (req, res) => {
  try {
    const data = require('./public/data/encampment_map_data.json');
    res.json(data);
  } catch (error) {
    console.error('Error serving JSON:', error);
    res.status(500).json({ error: 'Failed to serve JSON' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
