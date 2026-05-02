import ViteExpress from 'vite-express';
import express, { Request, Response, NextFunction } from 'express';
import Database from 'better-sqlite3';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';
import './session-types';

const app = express();
const PORT = 3000;

app.use(express.json());

const db = new Database("wadsongs.db");

// -------------------- SESSION SETUP --------------------
const sessDb = new Database('session.db');

const SqliteStore = betterSqlite3Session(expressSession, sessDb);

app.use(expressSession({
    store: new SqliteStore(),
    secret: 'BinnieAndClyde',
    resave: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
        maxAge: 600000,
        httpOnly: false
    }
}));

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.session.username) {
        next();
    } else {
        res.status(401).json({ error: 'You must be logged in' })
    }
}


// -------------------- LOGIN / LOGOUT ROUTES --------------------

// POST login
app.post('/login', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM ht_users WHERE username = ? AND password = ?');
        const user = stmt.get(req.body.username, req.body.password);

        if (user !== undefined) {
            req.session.username = req.body.username;
            res.json({ username: req.body.username });
        } else {
            res.status(401).json({ error: 'Incorrect login!' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET login status
app.get('/login', (req, res) => {
    res.json({ username: req.session.username || null });
});

// POST logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ loggedout: true });
    });
});

// -------------------- EXISTING ROUTES --------------------

// Search by artist
app.get('/artist/:artist', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
        const results = stmt.all(req.params.artist);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Search by title
app.get('/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=?');
        const results = stmt.all(req.params.title);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Search by title and artist
app.get('/artist/:artist/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=? AND artist=?');
        const results = stmt.all(req.params.title, req.params.artist);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Buy a song with a given ID
app.post('/song/:id/buy', authMiddleware, (req, res) => {
    try {
        const stmt = db.prepare('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?');
        const info = stmt.run(req.params.id);
        const didUpdate = info.changes == 1;
        res.status(didUpdate ? 200 : 404).json({ success: didUpdate, id: req.params.id });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Delete a song with a given ID
app.delete('/song/:id', authMiddleware, (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM wadsongs WHERE id=?');
        const info = stmt.run(req.params.id);
        const didDelete = info.changes == 1;
        res.status(didDelete ? 200 : 404).json({ success: didDelete });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Add a song
app.post('/song/create', authMiddleware, (req, res) => {
    try {
        const stmt = db.prepare('INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES(?,?,?,0,?,?)');
        const info = stmt.run(req.body.title, req.body.artist, req.body.year, req.body.price, req.body.quantity);
        res.json({ id: info.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error });
    }
});

ViteExpress.listen(app, PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
