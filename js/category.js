// Renders the product grid on a category page (pages/category-*.html)
(function () {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const cat = grid.dataset.cat;

  function render() {
    const lang = ntLang();
    const products = NileTextileData.getProductsByCategory(cat);

    document.querySelectorAll('[data-cat-title]').forEach(el => {
      el.textContent = NileTextileData.categoryLabel(cat);
    });
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const label = NileTextileData.categoryLabel(cat);
      titleEl.textContent = lang === 'en'
        ? `${label} | Nile Textile`
        : `${label} | نايل تكستايل`;
    }

    if (!products.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <span data-lang="ar">لا توجد منتجات مضافة في هذا القسم بعد. يمكن إضافة منتجات جديدة من <a href="../admin/admin.html" style="color:#1d74a8; font-weight:700;">لوحة التحكم</a>.</span>
        <span data-lang="en">No products have been added to this category yet. New products can be added from the <a href="../admin/admin.html" style="color:#1d74a8; font-weight:700;">admin panel</a>.</span>
      </div>`;
      return;
    }

    grid.innerHTML = products.map(p => {
      const name = lang === 'en' ? (p.name_en || p.name) : p.name;
      const desc = lang === 'en' ? (p.desc_en || p.desc || '') : (p.desc || '');
      const tag = lang === 'en' ? (p.tag_en || p.tag) : p.tag;
      return `
      <div class="product-card">
        <div class="thumb">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="200" height="200" fill="#e7ecf2"/>
            <g stroke="#b7c2d6" stroke-width="1.5" opacity=".6">
              <path d="M0 30 H200"/><path d="M0 70 H200"/><path d="M0 110 H200"/><path d="M0 150 H200"/>
              <path d="M30 0 V200"/><path d="M70 0 V200"/><path d="M110 0 V200"/><path d="M150 0 V200"/>
            </g>
          </svg>
        </div>
        <div class="body">
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(desc)}</p>
          ${tag ? `<span class="tag">${escapeHtml(tag)}</span>` : ''}
        </div>
      </div>
    `;
    }).join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  render();
  document.addEventListener('click', (e) => {
    if (e.target.closest('.lang-toggle')) setTimeout(render, 0);
  });
})();
