let openForms = true;

function generateForms(){
    if(openForms){
        const iframeElement = document.createElement("iframe");
        iframeElement.src = "forms.html";
        iframeElement.style.width = "100%";  // Optional: makes iframe full width
        iframeElement.style.height = "500px"; // Optional: sets iframe height
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

function app(){
    const historyButton = document.getElementById('historyButton');
    historyButton.addEventListener('click', generateForms);
}

document.addEventListener('DOMContentLoaded', app);