function oAltaCategorie() {
  const categorieSelect = document.getElementById("categorie");
  const otherCategoryDiv = document.getElementById("otherCategoryDiv");

  if (categorieSelect.value === "Altele") {
    otherCategoryDiv.classList.remove("hidden");
  } else {
    otherCategoryDiv.classList.add("hidden");
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocalizarea nu este suportată de acest browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Utilizare Nominatim API pentru a converti coordonatele în adresă
  const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  fetch(geocodingUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.display_name) {
        const address = data.display_name;
        document.getElementById("locatie").value = address; // Completează câmpul de locație cu adresa
      } else {
        alert("Adresa nu a putut fi determinată.");
      }
    })
    .catch((error) => {
      console.error("Eroare la obținerea adresei:", error);
      alert("A apărut o eroare la obținerea adresei.");
    });
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
    window.location.href="../map/map.html";
	} catch (error) {
		console.error("Network error:", error);
	}
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Permisiunea de a accesa locația a fost refuzată.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Informațiile despre locație nu sunt disponibile.");
      break;
    case error.TIMEOUT:
      alert("Cererea de locație a expirat.");
      break;
    case error.UNKNOWN_ERROR:
      alert("A apărut o eroare necunoscută.");
      break;
  }
}

const desc=document.getElementById("descriere");
const uLat=localStorage.getItem("report").lat;
const uLng=localStorage.getItem("report").lng;
const adresa=document.getElementById("locatie");
const userId=localStorage.getItem("user").id;

var report={lat:uLat,lng:uLng,desc:desc.value,adresa:adresa.value,userId:userId}

const submitBtn=document.getElementById("submitBtn");
submitBtn.addEventListener('click',()=>{addReport(report);});
