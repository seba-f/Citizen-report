const container = document.getElementById("container");
const registerSwitch = document.getElementById("register");
const loginBtn = document.getElementById("login");
const registerBtn=document.getElementById("registerBtn")


registerSwitch.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

registerBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  const user = {username: document.getElementById('username').value,
    name:document.getElementById('nume').value,
    password:document.getElementById('pass').value,
    email:document.getElementById('email').value
  };
  localStorage.setItem('user',JSON.stringify(user));
  addUser(user);
  console.log("registered user ",user);
  window.location.href="../map/map.html";
});

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
