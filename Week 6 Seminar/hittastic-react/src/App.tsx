import { useState } from "react"

interface Song {
    id: number;
    title: string;
    artist: string;
    year: number;
    price: number;
    quantity: number;
}

function App() {

    const [artist, setArtist] = useState('');
    const [songs, setSongs] = useState<Song[]>([]);

    

    async function searchSongs() {
        if (artist.trim() === '') {
            alert('Please enter an artist name');
            return;
        }

        try {
            const response = await fetch(`/songs/artist/${encodeURIComponent(artist)}`);
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            alert('Error searching for songs');
            console.log(error);
        }
    }

    const songResults = songs.map((song) => (
        <li key={song.id}>
            {song.artist} - {song.title} ({song.year}) | £{song.price} | Stock: {song.quantity}
        </li>
    ));

    return (
        <div>
            <h1>Hittastic React</h1>
        <div>
            <input 
                type="text"
                placeholder="Enter Artist Name"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                />
            <button onClick={searchSongs}>Search</button>
        </div>
        <div>
            <h2>Search Results</h2>
            <ul>{songResults}</ul>
        </div>
        <div>
            Number of songs found : {songs.length}
        </div>
        </div>
    )
}

export default App