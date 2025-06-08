import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const db = path.join(__dirname, 'db.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/count', async (_req, res) => {
    try {
        const data = await fs.readFile(db, 'utf-8');
        const json = JSON.parse(data);

        json.count += 1;

        await fs.writeFile(db, JSON.stringify(json, null, 2));
        res.send({ count: json.count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to increment count' });
    }
});

app.get('/music', async (_req, res) => {
    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=scaratek&api_key=${process.env.API_KEY}&format=json&limit=1`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch from Last.fm');

        const data = await response.json();
        const track = data.recenttracks?.track?.[0];

        if (!track) {
            return res.status(404).json({ error: 'No recent tracks found' });
        }

        const nowPlaying = track['@attr']?.nowplaying === 'true';

        res.json({
            nowPlaying,
            title: track.name || '',
            artist: track.artist?.['#text'] || '',
            album: track.album?.['#text'] || '',
            image: track.image?.[2]?.['#text'] || '',
            url: track.url || '',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch music data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
