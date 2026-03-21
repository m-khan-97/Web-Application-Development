import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../style.css'

const map = L.map('map');

const attribution = '&copy; OpenStreetMap cintributors';

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution
}).addTo(map);

const university = [50.9079, -1.4015];
const newYork = [40.75, -74];


map.setView(university, 14);

const universityMarker = L.marker(university).addTo(map);
universityMarker.bindPopup('University Location').openPopup();

const newYorkBtn = document.getElementById('newYorkBtn');
const findArtistBtn = document.getElementById('findArtistBtn');
const artistInput = document.getElementById('artistInput')

newYorkBtn.addEventListener('click', () => {
    map.setView(newYork, 18);
});

findArtistBtn.addEventListener('click', async () => {
    const artist = artistInput.value.trim();

    if(artist === '') {
        alert('Please enter an artist name');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/hometown/${encodeURIComponent(artist)}`);

        if (response.status === 404) {
            alert('Artist not found');
            return;
        }

        const data = await response.json();

        map.setView([data.lat, data.lon], 14);
    } catch (error) {
        alert('There was error connecting to server');
    }
});