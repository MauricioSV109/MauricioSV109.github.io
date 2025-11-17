// Ruta del JSON que contiene la lista de imágenes
const rutaJSON = "assets/img.json";

// Contenedor donde aparecerán las imágenes
const galeria = document.getElementById("galeria");

// Leer el JSON desde GitHub Pages
fetch(rutaJSON)
    .then(response => response.json())
    .then(data => {
        data.imagenes.forEach(nombre => {
            let ruta = "imagenes/" + nombre;

            let box = `
                <div class="img-box">
                    <img src="${ruta}" alt="${nombre}">
                    <a class="btn" href="${ruta}" target="_blank">Ver imagen</a>
                </div>
            `;

            galeria.innerHTML += box;
        });
    })
    .catch(error => {
        console.error("Error cargando img.json:", error);
    });
