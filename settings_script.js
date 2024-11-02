let current_image_address = document.getElementById("profileImage").src;
let initial_image_address = document.getElementById("profileImage").src;
console.log(current_image_address);
let initial_values = Array.from(document.querySelectorAll('.form-control')).map(input => input.value);
for(let i = 0; i < initial_values.length; i++)
{
    console.log(initial_values[i]);
}

document.getElementById('fileInput').addEventListener('change', schimba_imagine);

function schimba_imagine() {
    const file = document.getElementById('fileInput').files[0]; 
    if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            alert('Formatul de fișier nu este permis. Vă rugăm să alegeți un JPG, GIF sau PNG.');
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        document.getElementById("profileImage").src = imageUrl;
        
        document.getElementById('fileInput').onload = function() {
            URL.revokeObjectURL(imageUrl);
        };
    }
    current_image_address = document.getElementById("profileImage").src;
    console.log(current_image_address);
}

function salveaza_modificari() {
    console.log("Apel - Salveaza modificarile");
    // Implement actual save functionality here

    initial_values = Array.from(document.querySelectorAll('.form-control')).map(input => input.value);
}

function inapoi_meniu() {
    const current_values = Array.from(document.querySelectorAll('.form-control')).map(input => input.value);
    let ok = true;
    if (initial_image_address !== current_image_address)
    {
        ok = false;
    }
    else for (let i = 0; i < current_values.length; i++) {
        console.log(current_values[i]);
        if (current_values[i] !== initial_values[i]) {
            ok = false;
        }
    }

    if (!ok) {
        const userConfirmed = confirm("Doriti sa reveniti la meniul principal fara sa salvati schimbarile?");
        if (userConfirmed) {
            console.log("S-a apasat da");
            //window.location.href = "pagina principala"; 
        }
    }
}
