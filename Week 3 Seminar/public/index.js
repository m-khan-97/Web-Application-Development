"use strict";
const searchButton = document.getElementById("search");
const artistInput = document.getElementById("theArtist");
const resultDiv = document.getElementById("htresults");
const messageDiv = document.getElementById("message");
searchButton.addEventListener("click", async () => {
    const artist = artistInput.value.trim();
    if (artist === "") {
        alert("Please enter an artist name");
        return;
    }
    try {
        const response = await fetch(`/songs/artist/${encodeURIComponent(artist)}`);
        if (response.status !== 200) {
            alert("There was error searching for a song");
            return;
        }
        const songs = await response.json();
        resultDiv.innerHTML = "";
        if (songs.length === 0) {
            resultDiv.innerHTML = "<p>No songs found. </p>";
            return;
        }
        songs.forEach((song) => {
            const p = document.createElement("p");
            p.innerHTML = `${song.artist} - ${song.title} (${song.year}) | £${song.price} | Stock: ${song.quantity}`;
            resultDiv.appendChild(p);
        });
    }
    catch (error) {
        alert("Error connecting to server");
        console.log(error);
    }
});
