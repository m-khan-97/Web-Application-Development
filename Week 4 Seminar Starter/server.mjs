import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

const app = express();
const db = new Database('wadsongs.db');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => {
  res.send('Artist hometown API is running');
});

app.get('/hometown/:artist', (req, res) => {
  const artist = req.params.artist;

  const stmt = db.prepare('SELECT * FROM artists WHERE name = ?');
  const row = stmt.get(artist);

  if (!row) {
    return res.status(404).json({ error: 'Artist not found' });
  }

  res.json({
    artist: row.name,
    hometown: row.hometown,
    lat: row.lat,
    lon: row.lon
  });
});

app.post('/hometown', (req, res) => {
  const { artist, hometown, lat, lon } = req.body;

  if (!artist || !hometown || lat === undefined || lon === undefined) {
    return res.status(400).json({ error: 'artist, hometown, lat and lon are required' });
  }

  try {
    const stmt = db.prepare(
      'INSERT INTO artists (name, hometown, lat, lon) VALUES (?, ?, ?, ?)'
    );

    const info = stmt.run(artist, hometown, lat, lon);

    res.status(200).json({
      message: 'Hometown added successfully',
      id: info.lastInsertRowid,
      artist,
      hometown,
      lat,
      lon
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});