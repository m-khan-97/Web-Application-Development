import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../style.css';

const map = L.map('map');

const attribution = '&copy; OpenstreetMap contributors';
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution}).addTo(map)

const southampton: [number, number] = [50.9097, -1.4044];
const london: [number, number] = [51.5072, -0.1276]

map.setView(southampton, 17);

const southamptonMArker = L.marker(southampton)
.addTo(map)
.bindPopup('Southampton')
.openPopup();

const londonBtn = document.getElementById('londonBtn') as HTMLButtonElement
const southBtn = document.getElementById('southamptonBtn') as HTMLButtonElement


londonBtn.addEventListener('click', () => {
    map.setView(london, 13);
});

southBtn.addEventListener('click', () => {
    map.setView(southampton, 13);
});