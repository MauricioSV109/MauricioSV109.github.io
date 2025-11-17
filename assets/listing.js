// Carpeta donde están tus imágenes
const carpeta = "imagenes/";

// Las extensiones permitidas
const extensiones = [".png", ".jpg", ".jpeg", ".webp"];

// Contenedor donde aparecerán las imágenes
const galeria = document.getElementById("galeria");

// Esta parte obtiene el contenido de la carpeta desde GitHub Pages
fetch(carpeta)
    .then(response => response.text())
    .then(texto => {
        // Extraer nombres de archivos dentro del listado
        let parser = new DOMParser();
        let doc = parser.parseFromString(texto, "text/html");

        let links = [...doc.querySelectorAll("a")];

        links.forEach(link => {
            let archivo = link.getAttribute("href");

            // Verificar si es una imagen
            if (extensiones.some(ext => archivo.endsWith(ext))) {

                let ruta = carpeta + archivo;

                let box = `
                    <div class="img-box">
                        <img src="${ruta}" alt="${archivo}">
                        <a class="btn" href="${ruta}" target="_blank">Ver imagen</a>
                    </div>
                `;

                galeria.innerHTML += box;
            }
        });
    });

