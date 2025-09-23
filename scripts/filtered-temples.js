// scripts/filtered-temples.js

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Aba_Nigeria_Temple.jpg/400px-Aba_Nigeria_Temple.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Manti_Utah_Temple.jpg/400px-Manti_Utah_Temple.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Payson_Utah_Temple.jpg/400px-Payson_Utah_Temple.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Yigo_Guam_Temple.jpg/400px-Yigo_Guam_Temple.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Washington_D.C._Temple.jpg/400px-Washington_D.C._Temple.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Lima_Peru_Temple.jpg/400px-Lima_Peru_Temple.jpg"
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Salt_Lake_Temple.jpg/400px-Salt_Lake_Temple.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Templo_de_la_Ciudad_de_M%C3%A9xico.JPG/400px-Templo_de_la_Ciudad_de_M%C3%A9xico.JPG"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Rome_Italy_Temple.jpg/400px-Rome_Italy_Temple.jpg"
  },
  {
    templeName: "Seoul Korea",
    location: "Seoul, South Korea",
    dedicated: "1985, December, 14",
    area: 28057,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Seoul_Korea_Temple.jpg/400px-Seoul_Korea_Temple.jpg"
  }
];

// Fallback SVG generator (data URI) — siempre funciona aunque el host bloquee la imagen
function fallbackSVG(name) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
    <rect width='100%' height='100%' fill='#fff0f6'/>
    <text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' font-family='Quicksand, Arial, sans-serif' font-size='18' fill='#d63384'>Image unavailable</text>
    <text x='50%' y='65%' dominant-baseline='middle' text-anchor='middle' font-family='Quicksand, Arial, sans-serif' font-size='14' fill='#6b7280'>${name}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const gallery = document.getElementById("gallery");

// Robust year extractor (evita problemas con distintos formatos)
function extractYear(text) {
  if (!text) return null;
  const m = text.match(/\b(17|18|19|20)\d{2}\b/);
  return m ? parseInt(m[0], 10) : null;
}

function displayTemples(filteredTemples) {
  gallery.innerHTML = "";
  filteredTemples.forEach((temple) => {
    const figure = document.createElement("figure");

    // Imagen con fallback y manejo de errores
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      console.warn("Image failed to load:", temple.imageUrl, " — using fallback.");
      img.src = fallbackSVG(temple.templeName);
    });

    // Opcional: log de carga para debug
    img.addEventListener("load", () => {
      //console.log("Loaded image:", temple.templeName);
    });

    const figcap = document.createElement("figcaption");
    figcap.innerHTML = `
      <h2>${temple.templeName}</h2>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    `;

    figure.appendChild(img);
    figure.appendChild(figcap);
    gallery.appendChild(figure);
  });
}

// Default load
displayTemples(temples);

// Filters (usa extractYear para ser más robusto)
function filterTemples(criteria) {
  let filtered;
  switch (criteria) {
    case "old":
      filtered = temples.filter((t) => {
        const y = extractYear(t.dedicated);
        return y !== null && y < 1900;
      });
      break;
    case "new":
      filtered = temples.filter((t) => {
        const y = extractYear(t.dedicated);
        return y !== null && y > 2000;
      });
      break;
    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;
    case "home":
    default:
      filtered = temples;
  }
  displayTemples(filtered);
}

// Event listeners
document.querySelectorAll(".primary-nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = link.dataset.filter || "home";
    filterTemples(filter);
    document.querySelector(".primary-nav").classList.remove("open");
  });
});

// Mobile nav toggle
const hamburger = document.querySelector(".hamburger");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    document.querySelector(".primary-nav").classList.toggle("open");
  });
}

// Footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lm = document.getElementById("lastModified");
if (lm) lm.textContent = document.lastModified;
