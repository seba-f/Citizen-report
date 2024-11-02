//test user
const testUser = {
	username: "testuser123",
	name: "Test User",
	password: "password123",
	email: "testuser@example.com",
	bio: "This is a test user bio",
	birth: "1990-01-01",
	tel: "123-456-7890",
	isAdmin: false,
};

const testReport = {
	lat: 0.0,
	lng: 0.0,
	desc: "TESTDESC",
	adresa: "BUCURESTI",
	userId: 3,
};

// Initialize the map
const map = L.map("map").locate({
	setView: true,
	maxZoom: 32,
	enableHighAccuracy: true,
});

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
}).addTo(map);

function onLocationFound(e) {
	L.marker(e.latlng).addTo(map).bindPopup("You are here!").openPopup();
	L.circle(e.latlng, { radius: e.accuracy }).addTo(map);
}
map.on("locationfound", onLocationFound);

function fetchReports() {
	fetch("http://localhost:5005/api/reports")
		.then((response) => response.json())
		.then((data) => {
			console.log(data.items); // Log data or display it on your page
		})
		.catch((error) => console.error("Error fetching items:", error));

	fetch("http://localhost:5005/api/reports")
		.then((response) => response.json())
		.then((data) => {
			console.log(data.items); // Log data or display it on your page
		})
		.catch((error) => console.error("Error fetching items:", error));
}

async function addUser(user) {
	try {
		const response = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		const result = await response.json();

		if (response.ok) {
			console.log("User added successfully:", result);
		} else {
			console.error("Error adding user:", result.error);
		}
	} catch (error) {
		console.error("Network error:", error);
	}
}

async function addReport(report) {
	console.log("Sending report data:", report);
	try {
		const response = await fetch("/api/reports", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(report),
		});
		const result = await response.json();

		if (response.ok) {
			console.log("Report added successfully:", result);
		} else {
			console.error("Error adding report:", result.error);
		}
	} catch (error) {
		console.error("Network error:", error);
	}
}

document.addEventListener("DOMContentLoaded", fetchReports);
