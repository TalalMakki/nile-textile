// Admin panel logic — reads/writes via NileTextileData (localStorage-backed)
(function () {
  const productForm = document.getElementById('product-form');
  const productList = document.getElementById('product-list');
  const clientForm = document.getElementById('client-form');
  const clientList = document.getElementById('client-list');

  function renderProducts() {
    const lang = ntLang();
    const products = NileTextileData.getProducts();
    if (!products.length) {
      productList.innerHTML = `<p class="empty-state">
        <span data-lang="ar">لا توجد منتجات مضافة بعد.</span>
        <span data-lang="en">No products added yet.</span>
      </p>`;
      return;
    }
    productList.innerHTML = products.map(p => {
      const name = lang === 'en' ? (p.name_en || p.name) : p.name;
      const tag = lang === 'en' ? (p.tag_en || p.tag) : p.tag;
      return `
      <div class="admin-list-item" data-id="${p.id}">
        <div class="meta">
          <strong>${escapeHtml(name)}</strong>
          <span>${NileTextileData.categoryLabel(p.category)}${tag ? ' · ' + escapeHtml(tag) : ''}</span>
        </div>
        <div class="admin-actions">
          <button class="icon-btn js-delete-product" data-id="${p.id}">
            <span data-lang="ar">حذف</span><span data-lang="en">Delete</span>
          </button>
        </div>
      </div>
    `;
    }).join('');
  }

  function renderClients() {
    const clients = NileTextileData.getClients();
    if (!clients.length) {
      clientList.innerHTML = `<p class="empty-state">
        <span data-lang="ar">لا يوجد عملاء مضافون بعد.</span>
        <span data-lang="en">No clients added yet.</span>
      </p>`;
      return;
    }
    clientList.innerHTML = clients.map(c => `
      <div class="admin-list-item" data-id="${c.id}">
        <div class="meta"><strong>${escapeHtml(c.name)}</strong></div>
        <div class="admin-actions">
          <button class="icon-btn js-delete-client" data-id="${c.id}">
            <span data-lang="ar">حذف</span><span data-lang="en">Delete</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  productForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('pf-name').value.trim();
    const category = document.getElementById('pf-cat').value;
    const desc = document.getElementById('pf-desc').value.trim();
    const tag = document.getElementById('pf-tag').value.trim();
    if (!name) return;
    // new items are stored under both languages until translated in the data file
    NileTextileData.addProduct({ name, name_en: name, category, desc, desc_en: desc, tag, tag_en: tag });
    productForm.reset();
    renderProducts();
  });

  clientForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name-admin').value.trim();
    if (!name) return;
    NileTextileData.addClient({ name });
    clientForm.reset();
    renderClients();
  });

  document.addEventListener('click', (e) => {
    const delProduct = e.target.closest('.js-delete-product');
    if (delProduct) {
      NileTextileData.deleteProduct(delProduct.dataset.id);
      renderProducts();
      return;
    }
    const delClient = e.target.closest('.js-delete-client');
    if (delClient) {
      NileTextileData.deleteClient(delClient.dataset.id);
      renderClients();
      return;
    }
    if (e.target.closest('.lang-toggle')) {
      setTimeout(() => { renderProducts(); renderClients(); }, 0);
    }
  });

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  renderProducts();
  renderClients();
})();
