// ===== Project data (single source of truth for marquee + grid) =====
const projects = [
  { name: "Katkare", url: "https://katkare.de/", tag: "Pet health · Germany", hue: 210 },
  { name: "Plant1", url: "https://plant1.in/", tag: "Ecommerce build", hue: 140 },
  { name: "My Fair Lady", url: "https://my-fair-lady-931jf03q.myshopify.com/", tag: "Shopify storefront", hue: 330 },
  { name: "Gheemazing", url: "https://www.gheemazing.nl/", tag: "Ecommerce build", hue: 40 },
  { name: "Godfathers", url: "https://godfathers-pqihawiu.myshopify.com/", tag: "Shopify storefront", hue: 260 },
  { name: "Thyroveda", url: "https://thyroveda.myshopify.com/", tag: "Shopify storefront", hue: 15 },
  { name: "Vnari", url: "https://vnari.in/", tag: "Ecommerce build", hue: 185 },
  { name: "Milano di Rouge", url: "https://milanodirouge.com/", tag: "Fashion storefront", hue: 350 },
  { name: "Alykaye Essentials", url: "https://alykayeessentials.com/", tag: "Ecommerce build", hue: 95 },
  { name: "Naviata", url: "https://www.naviata.com/", tag: "Shopify storefront", hue: 225 },
  { name: "Casa Furniture", url: "https://casafurnitureusa.com/", tag: "Furniture · USA", hue: 25 },
];

function swatchGradient(hue){
  return `linear-gradient(135deg, hsl(${hue} 38% 22%), hsl(${hue + 30} 32% 14%))`;
}

// ===== Render marquee (duplicated once for seamless loop) =====
const marqueeTrack = document.getElementById("marqueeTrack");
function renderMarqueeCard(p){
  const card = document.createElement("a");
  card.href = p.url;
  card.target = "_blank";
  card.rel = "noopener";
  card.className = "marquee-card";
  card.style.background = swatchGradient(p.hue);
  card.innerHTML = `
    <div class="marquee-chrome"><span></span><span></span><span></span></div>
    <div>
      <h4>${p.name}</h4>
      <p>${p.tag}</p>
    </div>
  `;
  return card;
}
[...projects, ...projects].forEach(p => marqueeTrack.appendChild(renderMarqueeCard(p)));

// ===== Render projects grid =====
const projectsGrid = document.getElementById("projectsGrid");
// projects grid render — is line ko replace karo
projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <div class="project-swatch" style="background:${swatchGradient(p.hue)}">
      <img src="assets/projects/${p.slug}.jpg" alt="${p.name} screenshot" loading="lazy"
           onerror="this.style.display='none'">
    </div>
    <h3>${p.name}</h3>
    <p>${p.tag}</p>
    <a href="${p.url}" target="_blank" rel="noopener" class="project-visit">Visit site ↗</a>
  `;
  projectsGrid.appendChild(card);
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navClose = document.getElementById("navClose");

function openMenu(){
  navLinks.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMenu(){
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

navToggle.addEventListener("click", openMenu);
navClose.addEventListener("click", closeMenu);
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

// ===== Profile photo — tries several common filenames/extensions =====
// Rename your photo to "photo" (any of the extensions below) and drop it in /assets.
const photoCandidates = [
  "assets/photo.jpg", "assets/photo.jpeg", "assets/photo.png", "assets/photo.webp",
  "assets/Photo.jpg", "assets/Photo.jpeg", "assets/Photo.png",
  "assets/photo.JPG", "assets/photo.PNG"
];
const profilePhoto = document.getElementById("profilePhoto");
const photoFallback = document.getElementById("photoFallback");
let photoIndex = 0;

function tryNextPhoto(){
  if (photoIndex >= photoCandidates.length){
    profilePhoto.style.display = "none";
    photoFallback.style.display = "flex";
    return;
  }
  profilePhoto.src = photoCandidates[photoIndex++];
}
profilePhoto.addEventListener("error", tryNextPhoto);
profilePhoto.addEventListener("load", () => {
  profilePhoto.style.display = "block";
  photoFallback.style.display = "none";
});
tryNextPhoto();
