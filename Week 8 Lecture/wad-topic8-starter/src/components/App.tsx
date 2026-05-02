import { json } from 'body-parser';
import { response } from 'express';
import { useEffect, useState } from 'react';

interface Song {
    id: number;
    title: string;
    artist: string;
    year: number;
    downloads: number;
    price: number;
    quantity: number;
}

export default function App() {
    const [username, setUsername] = useState<string | null>(null);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [artist, setArtist] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        fetch('/login')
        .then(response => response.json())
        .then(json => {
            setUsername(json.username);
        })
        .catch(error => {
            console.log(error);
            setUsername(null)
        })
    }, []);

    async function doLogin() {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword
                })
            });
            if (response.status === 200) {
                const json = await response.json();
                setUsername(json.username);
                setLoginPassword('');
            } else {
                alert('Login Faile');
                setUsername(null)
            }
        } catch (error) {
            console.log(error);
            alert('Error during login');
            setUsername(null);
        }
    }

    async function doLogout() {
        try {
            await fetch('/logout', {
                method: 'POST'
            });
            setUsername(null);
        } catch (error) {
            console.log(error);
            alert('Error during logout')
        }
    }

    async function searchSongs() {
        if (artist.trim() === '') {
            alert('Please enter an artist name');
            return;
        }

        try {
            const response = await fetch(`/artist/${encodeURIComponent(artist)}`);
            const data: Song[] = await response.json();
            setSongs(data);
        } catch (error) {
            console.log(error);
            alert('Error searching for songs');
        }
    }

    async function buySong(id: number) {
        try {
            const response = await fetch(`/song/${id}/buy`, {
                method: 'POST'
            });

            if (response.status === 401) {
                alert('You are not logged in');
                return;
            }

            if (response.status === 200) {
                alert('Song purchased successfully');
                searchSongs();
            } else if (response.status === 404) {
                alert('Song not found');
            } else {
                alert('Could not buy song');
            }
        } catch (error) {
            console.log(error);
            alert('Error buying song');
        }
    }

    const songsOut = songs.map(song => (
        <div
            key={song.id}
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginTop: '10px'
            }}
        >
            <p><strong>{song.title}</strong></p>
            <p>Artist: {song.artist}</p>
            <p>Year: {song.year}</p>
            <p>Price: £{song.price}</p>
            <p>Stock: {song.quantity}</p>
            <button onClick={() => buySong(song.id)}>Buy</button>
        </div>
    ));

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome to the HitTastic! App!</h1>

            {username === null ? (
                <div style={{ marginBottom: '20px' }}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                    <button onClick={doLogin} style={{ marginLeft: '10px' }}>
                        Login
                    </button>
                </div>
            ) : (
                <div style={{ marginBottom: '20px' }}>
                    <strong>Logged in as {username}</strong>
                    <button onClick={doLogout} style={{ marginLeft: '10px' }}>
                        Logout
                    </button>
                </div>
            )}

            <div>
                <h2>Search by Artist</h2>
                <input
                    type="text"
                    placeholder="Enter artist name"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                <button onClick={searchSongs} style={{ marginLeft: '10px' }}>
                    Search
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {songsOut}
            </div>
        </div>
    );
}
