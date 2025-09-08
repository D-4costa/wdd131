document.addEventListener('DOMContentLoaded', () => {
    const hamb = document.getElementById('hamburger');
    const nav = document.getElementById('primary-nav');
    function updateAria(open) {
      hamb.setAttribute('aria-expanded', open);
      hamb.querySelector('.hamburger-icon').textContent = open ? '✕' : '☰';
      hamb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    hamb.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      updateAria(isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamb.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        updateAria(false);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        updateAria(false);
        hamb.focus();
      }
    });
    const yearEl = document.getElementById('year');
    const modifiedEl = document.getElementById('last-modified');
    const now = new Date();
    yearEl.textContent = now.getFullYear();
    modifiedEl.textContent = document.lastModified || 'No last modified date';
  });
  