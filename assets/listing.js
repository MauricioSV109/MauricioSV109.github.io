// Cargar el JSON con la lista de imágenes
fetch("assets/img.json")
    .then(res => res.json())
    .then(data => {
        const galeria = document.getElementById("galeria");
        const carpeta = "imagenes/";

        data.imagenes.forEach(nombre => {
            let ruta = carpeta + nombre;

            let box = `
                <div class="img-box">
                    <img src="${ruta}" alt="${nombre}">
                    <a class="btn" href="${ruta}" target="_blank">Ver imagen</a>
                </div>
            `;

            galeria.innerHTML += box;
        });
    })
    .catch(err => console.log("Error cargando img.json:", err));


