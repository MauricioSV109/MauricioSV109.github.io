// Carpeta donde están tus imágenes (desde imagenes.html)
const carpeta = "imagenes/";

// Lista de imágenes que quieres mostrar (NOMBRES EXACTOS)
const imagenes = [
    "images.png",
    "foto2.png",
    "loquesea.jpg"
];

// Selecciona el contenedor donde van las imágenes
const contenedor = document.getElementById("contenedor-imagenes");

// Recorre la lista y las pone en pantalla
imagenes.forEach(nombre => {
    const ruta = carpeta + nombre;

    const img = document.createElement("img");
    img.src = ruta;
    img.alt = nombre;
    img.style.width = "200px";
    img.style.margin = "10px";

    contenedor.appendChild(img);
});
