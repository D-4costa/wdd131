// scripts/script.js
// Populate select element from products array and handle review.html localStorage counter/resume display

const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

document.addEventListener('DOMContentLoaded', () => {
  // populate select on form page
  const productSelect = document.getElementById('product');
  if (productSelect) {
    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id; // value uses id per assignment
      opt.textContent = p.name;
      productSelect.appendChild(opt);
    });
  }

  // If on review.html, show submission details and increment counter in localStorage
  if (location.pathname.endsWith('review.html')) {
    // Parse the query string (form used GET)
    const params = new URLSearchParams(location.search);
    const detailsDiv = document.getElementById('submissionDetails');
    if (detailsDiv) {
      // Build a readable summary of the submitted fields
      const productId = params.get('product') || 'N/A';
      const productObj = products.find(p => p.id === productId);
      const productName = productObj ? productObj.name : productId;
      const rating = params.get('rating') || 'N/A';
      const date = params.get('installDate') || 'N/A';
      const features = params.getAll('features');
      const user = params.get('userName') || 'Anonymous';
      const reviewText = params.get('reviewText') || '';

      const html = `
        <p><strong>Product:</strong> ${escapeHtml(productName)}</p>
        <p><strong>Rating:</strong> ${escapeHtml(rating)}</p>
        <p><strong>Installed on:</strong> ${escapeHtml(date)}</p>
        <p><strong>Features:</strong> ${features.length ? escapeHtml(features.join(', ')) : 'None selected'}</p>
        <p><strong>User:</strong> ${escapeHtml(user)}</p>
        <p><strong>Review:</strong></p>
        <div class="card">${escapeHtml(reviewText)}</div>
      `;
      detailsDiv.innerHTML = html;
    }

    // localStorage counter
    try {
      const key = 'productReviewCount';
      let count = parseInt(localStorage.getItem(key) || '0', 10);
      // Only increment if the page was loaded with query params (i.e., after a submit)
      if (location.search && location.search.length > 1) {
        count = count + 1;
        localStorage.setItem(key, String(count));
      }
      const counterEl = document.getElementById('reviewCount');
      if (counterEl) counterEl.textContent = String(count);
    } catch (err) {
      // localStorage might be disabled - handle gracefully
      console.error('localStorage error', err);
    }
  }
});

// Utility to prevent XSS in output
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
