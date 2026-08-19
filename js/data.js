/* ============================================================
   Nile Textile — shared data layer
   Products and clients are stored in the browser's localStorage
   so the /admin panel can add or edit them without a backend.
   On first visit each list is seeded from the defaults below.
   ============================================================ */

const NT_KEYS = {
  products: 'nt_products',
  clients: 'nt_clients',
};

const NT_CATEGORIES = [
  { id: 'clothes', label: 'ملابس جاهزة', label_en: 'Ready-made Clothing' },
  { id: 'towels', label: 'فوط', label_en: 'Towels' },
  { id: 'robes', label: 'برنس', label_en: 'Bathrobes' },
  { id: 'fabrics', label: 'أقمشة', label_en: 'Fabrics' },
];

const NT_DEFAULT_PRODUCTS = [
  { id: 'p1', category: 'clothes', name: 'طقم بيجامة قطن مشط', name_en: 'Combed Cotton Pyjama Set', desc: 'قصة مريحة من قطن مشط 100%، متاح بعدة مقاسات وألوان.', desc_en: 'Comfortable fit in 100% combed cotton, available in multiple sizes and colours.', tag: 'الأكثر طلبًا', tag_en: 'Best seller' },
  { id: 'p2', category: 'clothes', name: 'تيشيرت تريكو أساسي', name_en: 'Basic Knit T-Shirt', desc: 'نسيج تريكو خفيف مناسب للطباعة والتطريز بالجملة.', desc_en: 'Lightweight knit fabric suited to bulk printing and embroidery.', tag: 'جاهز للتصدير', tag_en: 'Export ready' },
  { id: 'p3', category: 'clothes', name: 'هودي فليس شتوي', name_en: 'Winter Fleece Hoodie', desc: 'نسيج وبرة كثيف بتشطيب داخلي ناعم، مثالي لمواسم الشتاء.', desc_en: 'Dense fleece knit with a soft inner finish, ideal for winter seasons.', tag: '', tag_en: '' },
  { id: 'p4', category: 'towels', name: 'فوطة حمام قطنية فاخرة', name_en: 'Premium Cotton Bath Towel', desc: 'امتصاص عالي ونعومة تدوم بعد الغسيل المتكرر.', desc_en: 'High absorbency and softness that lasts through repeated washing.', tag: 'الأعلى مبيعًا', tag_en: 'Top seller' },
  { id: 'p5', category: 'towels', name: 'طقم فوط مطبخ', desc: 'نسيج مزدوج الكثافة يتحمل الاستخدام اليومي المكثف.', name_en: 'Kitchen Towel Set', desc_en: 'Double-density weave built for heavy daily use.', tag: '', tag_en: '' },
  { id: 'p6', category: 'robes', name: 'برنس تيري كلاسيك', name_en: 'Classic Terry Bathrobe', desc: 'برانص فندقية بخامة تيري ثقيلة وياقة قبعة.', desc_en: 'Hotel-grade robes in heavy terry fabric with a hood collar.', tag: 'فنادق ومنتجعات', tag_en: 'Hotels & resorts' },
  { id: 'p7', category: 'robes', name: 'برنس أطفال مقلم', name_en: 'Striped Kids Bathrobe', desc: 'مقاسات أطفال بألوان وطبعات قابلة للتخصيص.', desc_en: 'Kids sizing with customisable colours and prints.', tag: '', tag_en: '' },
  { id: 'p8', category: 'fabrics', name: 'قماش تريكو بيما', name_en: 'Pima Knit Fabric', desc: 'خامة تصدير بعرض قياسي وثبات ألوان عالي.', desc_en: 'Export-grade fabric in a standard width with high colour fastness.', tag: 'بالجملة', tag_en: 'Wholesale' },
  { id: 'p9', category: 'fabrics', name: 'قماش وبرة فرنسية', name_en: 'French Terry Fabric', desc: 'مناسب لصناعة الهوديز والجاكيتات الرياضية.', desc_en: 'Suited to manufacturing hoodies and athletic jackets.', tag: '', tag_en: '' },
];

const NT_DEFAULT_CLIENTS = [
    { id: 'c1', name: 'Atlas Retail Group', logo: '' },
    { id: 'c2', name: 'Northline Apparel', logo: '' },
    { id: 'c3', name: 'Casa Bianca Home', logo: '' },
    { id: 'c4', name: 'Delta Uniforms', logo: '' },
    { id: 'c5', name: 'Aurora Hospitality', logo: '' },
];

function ntLang() {
  return document.documentElement.classList.contains('lang-en') ? 'en' : 'ar';
}

function ntLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) { localStorage.setItem(key, JSON.stringify(fallback)); return fallback.slice(); }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('nile-textile: falling back to defaults for', key, e);
    return fallback.slice();
  }
}

function ntSave(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error('nile-textile: could not save', key, e);
    return false;
  }
}

const NileTextileData = {
  getProducts() { return ntLoad(NT_KEYS.products, NT_DEFAULT_PRODUCTS); },
  getProductsByCategory(cat) { return this.getProducts().filter(p => p.category === cat); },
  saveProducts(list) { return ntSave(NT_KEYS.products, list); },
  addProduct(product) {
    const list = this.getProducts();
    product.id = 'p' + Date.now();
    list.unshift(product);
    this.saveProducts(list);
    return product;
  },
  updateProduct(id, patch) {
    const list = this.getProducts();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...patch };
    this.saveProducts(list);
    return list[idx];
  },
  deleteProduct(id) {
    const list = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(list);
  },

  getClients() { return ntLoad(NT_KEYS.clients, NT_DEFAULT_CLIENTS); },
  saveClients(list) { return ntSave(NT_KEYS.clients, list); },
  addClient(client) {
    const list = this.getClients();
    client.id = 'c' + Date.now();
    list.unshift(client);
    this.saveClients(list);
    return client;
  },
  deleteClient(id) {
    const list = this.getClients().filter(c => c.id !== id);
    this.saveClients(list);
  },

  categoryLabel(id) {
    const c = NT_CATEGORIES.find(c => c.id === id);
    if (!c) return id;
    return ntLang() === 'en' ? c.label_en : c.label;
  },
};
