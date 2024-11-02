

// Initialize the map
const map = L.map("map").locate({setView:true,maxZoom: 18})

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);