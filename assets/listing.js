// assets/listing.js
// Lista automáticamente archivos en las carpetas del repo público
const GITHUB_OWNER = "MauricioSV109";
const GITHUB_REPO  = "MauricioSV109.github.io";

async function listFolder(path) {
  const api = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;
  const res = await fetch(api);
  if (!res.ok) {
    console.warn("GitHub API response not ok for", path, res.status);
    return [];
  }
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data; // array de { name, path, download_url, type, ... }
}

function renderFiles(items, container) {
  if (!items.length) {
    container.innerHTML = "<p>No hay archivos aún.</p>";
    return;
  }
  const list = document.createElement("div");
  list.style.display = "grid";
  list.style.gap = "12px";

  items.forEach(it => {
    const row = document.createElement("div");
    row.style.background = "#111";
    row.style.padding = "12px";
    row.style.border = "1px solid #222";
    row.style.borderRadius = "8px";
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";

    const left = document.createElement("div");
    left.innerHTML = `<strong>${it.name}</strong><div style="color:#bbb;font-size:0.9em">/${it.path}</div>`;

    const actions = document.createElement("div");
    const aView = document.createElement("a");
    aView.href = it.download_url;
    aView.target = "_blank";
    aView.textContent = "Abrir";
    aView.style.marginRight = "10px";
    aView.style.color = "#4da3ff";
    aView.style.textDecoration = "none";

    const aDL = document.createElement("a");
    aDL.href = it.download_url;
    aDL.download = it.name;
    aDL.textContent = "Descargar";
    aDL.style.color = "#4da3ff";
    aDL.style.textDecoration = "none";

    actions.appendChild(aView);
    actions.appendChild(aDL);
    row.appendChild(left);
    row.appendChild(actions);
    list.appendChild(row);
  });

  container.innerHTML = "";
  container.appendChild(list);
}

function renderImages(items, container) {
  if (!items.length) {
    container.innerHTML = "<p>No hay imágenes aún.</p>";
    return;
  }
  container.innerHTML = "";
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(auto-fit,minmax(160px,1fr))";
  grid.style.gap = "12px";

  items.forEach(it => {
    const ext = it.name.split(".").pop().toLowerCase();
    if (!["png","jpg","jpeg","gif","webp","svg"].includes(ext)) return;

    const box = document.createElement("div");
    box.style.background = "#111";
    box.style.border = "1px solid #222";
    box.style.padding = "8px";
    box.style.borderRadius = "8px";
    box.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = it.download_url;
    img.alt = it.name;
    img.style.maxWidth = "100%";
    img.style.height = "120px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "6px";

    const cap = document.createElement("div");
    cap.style.marginTop = "8px";
    cap.style.color = "#ccc";
    cap.textContent = it.name;

    box.appendChild(img);
    box.appendChild(cap);
    grid.appendChild(box);
  });

  container.appendChild(grid);
}

async function autoPopulate() {
  const filesListEl = document.getElementById("filesList");
  if (filesListEl) {
    const files = await listFolder("trabajos");
    renderFiles(files.filter(i => i.type === "file"), filesListEl);
  }

  const projectsEl = document.getElementById("projectsList");
  if (projectsEl) {
    const projects = await listFolder("proyectos");
    renderFiles(projects.filter(i => i.type === "file"), projectsEl);
  }

  const galleryEl = document.getElementById("imagesGallery");
  if (galleryEl) {
    const imgs = await listFolder("imagenes");
    renderImages(imgs.filter(i => i.type === "file"), galleryEl);
  }
}

document.addEventListener("DOMContentLoaded", autoPopulate);
