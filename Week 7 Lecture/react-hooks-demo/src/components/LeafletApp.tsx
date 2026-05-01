import { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletApp() {
    const map = useRef<L.Map |  null>(null);  //Ref: to preserve data that we dont want to render
    const [latLng, setLatLng] = useState(L.latLng(51.05, -0.72));  //To preserve data that we want to render

    useEffect(() => {
        map.current = L.map("map1");

        L.tileLayer ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                { attribution: "Copyright OSM contributors, ODBL" } )
                .addTo(map.current);

        map.current.setView(latLng, 14);

        map.current.on("moveend", () => {
            const centre = map.current!.getCenter();
            setLatLng(centre)
        });
    },[]);

    function setPos() {
        const lat = parseFloat((document.getElementById("lat") as HTMLInputElement).value);
        const lng = parseFloat((document.getElementById("lon") as HTMLInputElement).value);
        const newLatLng = L.latLng(lat, lng);

        map.current?.setView(newLatLng, 14);
        setLatLng(newLatLng);
    }

    return (
        <div>
            <h2>Leaflet with Ref and Effect</h2>
            Lat: <input id="lat" />
            Lon: <input id="lon" />
            <button onClick={setPos}>Go</button>
            <p>Map centered at : {latLng.lat} {latLng.lng}</p>
            <div id="map1" style={{width: "800px", height: "400px"}}></div>
        </div>
    )
}