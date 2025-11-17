// URL del archivo JSON en GitHub Pages
const url = "https://mauriciosv109.github.io/assets/img.json";

// Contenedor donde van las imágenes
const galeria = document.getElementById("galeria");

// Cargar el JSON
fetch(url)
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
    .catch(error => console.error("Error cargando JSON:", error));
