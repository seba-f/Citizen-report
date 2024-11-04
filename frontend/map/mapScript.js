
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

let userLat;
let userLng;

function selectReport(){
	fetchReports();
	
}

function onLocationFound(e) {
		userLat=e.latlng.lat;
		userLng=e.latlng.lng;
		L.marker(e.latlng).addTo(map).bindPopup("You are here!").openPopup();
		L.circle(e.latlng, { radius: e.accuracy }).addTo(map);
	}

const reportBtn=document.getElementsByClassName("navBtn")[2];

reportBtn.addEventListener('click',()=>{
	localStorage.setItem("report",{lat:userLat,lng:userLng,desc:"",adresa:"",userId:localStorage.getItem("user")});
	console.log(localStorage.getItem("report"));
	window.location.href="../formular/forms.html";
});

function markerClick() {
	console.log("CLICK");
    this.openPopup();
}

function addMarker(e,lat,lng) {
		var newMarker=L.marker([lat,lng]).addTo(map).bindPopup(selectReport(lat,lng));
		newMarker.openPopup();
}

map.on('click', addMarker);
map.on("locationfound", onLocationFound);


const navBar=document.getElementsByClassName("navbar")[0];
navBar.addEventListener('click',(e)=>{e.stopPropagation();});

function fetchReports() {
	fetch("http://localhost:5005/api/reports")
		.then((response) => response.json())
		.then((data) => {
			return data // Log data or display it on your page
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



document.addEventListener("DOMContentLoaded", fetchReports);




