/* Main JS for Kitty Café & Bakery
   Demonstrates: objects, arrays, functions, DOM, events, localStorage, template literals, conditional logic.
*/
const site = { name: 'Kitty Café & Bakery', year: new Date().getFullYear() };
const products = [
  { 
    id: 1, 
    name: 'Strawberry Croissant', 
    img: 'images/strawberry_croissant.svg', 
    desc: 'Flaky, buttery croissant filled with fresh strawberry cream and topped with powdered sugar.' 
  },
  { 
    id: 2, 
    name: 'Pink Cupcake', 
    img: 'images/pink_cupcake.svg', 
    desc: 'Soft vanilla cupcake with creamy pink frosting and a hint of rose flavor.' 
  },
  { 
    id: 3, 
    name: 'Heart Macaron', 
    img: 'images/heart_macaron.svg', 
    desc: 'Delicate almond shells with a smooth raspberry filling, shaped with love.' 
  },
  { 
    id: 4, 
    name: 'Mini Cake', 
    img: 'images/mini_cake.svg', 
    desc: 'A small layered cake with light vanilla sponge and whipped cream frosting.' 
  }
];

// Populate dynamic content
function init() {
  setYear();
  populateProducts();
  setupMenuToggle();
  setupButtons();
  setupCarousel();
  setupContactForm();
  setupOrderModal();
}

// Set copyright years
function setYear() {
  document.querySelectorAll('#year, #yearAbout, #yearContact').forEach(el => { 
    if (el) el.textContent = site.year; 
  });
}

// Fill products grid using template literals
function populateProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h4>${p.name}</h4>
      <p class="muted">${p.desc}</p>
    `;
    grid.appendChild(div);
  });
}

// Menu toggle for small screens
function setupMenuToggle() {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-expanded', String(!expanded));
  });
}

// Buttons
function setupButtons() {
  const seeMore = document.getElementById('seeMore');
  if (seeMore) seeMore.addEventListener('click', () => alert('More items will be available soon.'));
  const orderNow = document.getElementById('orderNow');
  if (orderNow) orderNow.addEventListener('click', () => openModal());
}

// Simple carousel functionality
function setupCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  let idx = 0;
  const items = Array.from(track.querySelectorAll('.quote'));
  function show(i) {
    items.forEach((it, j) => it.style.display = (j === i ? 'block' : 'none'));
  }
  show(idx);
  const left = document.querySelector('.carousel-btn.left');
  const right = document.querySelector('.carousel-btn.right');
  if (left) left.addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; show(idx); });
  if (right) right.addEventListener('click', () => { idx = (idx + 1) % items.length; show(idx); });
}

// Contact form with localStorage
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = { 
      name: form.name.value.trim(), 
      email: form.email.value.trim(), 
      message: form.message.value.trim(), 
      date: new Date().toISOString() 
    };
    saveToLocal('w06_messages', entry);
    form.reset();
    renderList('w06_messages', 'messagesList');
  });
  renderList('w06_messages', 'messagesList');
}

// Generic save helper
function saveToLocal(key, value) {
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.push(value);
  localStorage.setItem(key, JSON.stringify(arr));
}

// Render a list from localStorage
function renderList(key, listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  list.innerHTML = '';
  arr.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name}</strong> (${new Date(item.date).toLocaleString()}): <p>${item.message || item.details}</p>`;
    list.appendChild(li);
  });
}

// Order modal features
function setupOrderModal() {
  const modal = document.getElementById('orderModal');
  const form = document.getElementById('orderForm');
  const close = document.getElementById('closeModal');
  if (close) close.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const entry = { 
        name: form.name.value.trim(), 
        email: form.email.value.trim(), 
        details: form.details.value.trim(), 
        date: new Date().toISOString() 
      };
      saveToLocal('w06_orders', entry);
      form.reset();
      renderList('w06_orders', 'ordersList');
      closeModal();
      alert('Thank you — your order has been saved locally.');
    });
  }
  renderList('w06_orders', 'ordersList');
}

function openModal() {
  const m = document.getElementById('orderModal');
  if (m) m.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  const m = document.getElementById('orderModal');
  if (m) m.setAttribute('aria-hidden', 'true');
}

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else { 
  init(); 
}
