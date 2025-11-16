
function previewFile(event) {
    const file = event.target.files[0];
    const previewBox = document.getElementById("previewBox");

    if (!file) {
        previewBox.style.display = "none";
        previewBox.innerHTML = "";
        return;
    }

    previewBox.style.display = "block";

   
    if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = "80%";
        img.style.marginTop = "20px";
        previewBox.innerHTML = "";
        previewBox.appendChild(img);
    } else {
       
        previewBox.innerHTML = `
            <p>Archivo seleccionado:</p>
            <strong>${file.name}</strong>
        `;
    }
}
