let openForms = true;

function generateForms(){
    if(openForms){
        const iframeElement = document.createElement("iframe");
        iframeElement.src = "forms.html";
        iframeElement.style.width = "100%";  // Optional: makes iframe full width
        iframeElement.style.height = "500px"; // Optional: sets iframe height
        iframeElement.style.display = "block"; 
        let iframeContainer = document.getElementById("iframeContainer");
        iframeContainer.appendChild(iframeElement); // Appends iframe to body
        openForms = false;
    }
    else{
        const iframeElement = document.querySelector("iframe");
        iframeElement.remove();
        openForms = true;
    }
}

function seeData(){
    const name = document.getElementByIdid("name");
    const username = document.getElementByIdid("username");
    const email = document.getElementByIdid("email");
    const phone = document.getElementByIdid("phone");
    const age = document.getElementByIdid("age");
    const reputation = document.getElementByIdid("reputation");
    const role = document.getElementByIdid("role");
    //const data_creare_cont = document.getElementByIdid("data_creare_cont");
}

function app(){
    const historyButton = document.getElementById('historyButton');
    historyButton.addEventListener('click', generateForms);
}

document.addEventListener('DOMContentLoaded', app);