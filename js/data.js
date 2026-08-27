/* ============================================================
   Nile Textile — shared data layer
   Products and clients are static content defined below.
   ============================================================ */

const NT_CATEGORIES = [
  { id: 'clothes', label: 'ملابس جاهزة', label_en: 'Ready-made Clothing' },
  { id: 'towels', label: 'فوط', label_en: 'Towels' },
  { id: 'robes', label: 'برنس', label_en: 'Bathrobes' },
  { id: 'fabrics', label: 'أقمشة', label_en: 'Fabrics' },
];

const NT_PRODUCTS = [
  { id: 'p1', category: 'clothes', name: 'طقم بيجامة قطن مشط', name_en: 'Combed Cotton Pyjama Set', desc: 'قصة مريحة من قطن مشط 100%، متاح بعدة مقاسات وألوان.', desc_en: 'Comfortable fit in 100% combed cotton, available in multiple sizes and colours.', tag: 'الأكثر طلبًا', tag_en: 'Best seller', image: 'Combed Cotton Pyjama Set.jpg' },
  { id: 'p2', category: 'clothes', name: 'تيشيرت تريكو أساسي', name_en: 'Basic Knit T-Shirt', desc: 'نسيج تريكو خفيف مناسب للطباعة والتطريز بالجملة.', desc_en: 'Lightweight knit fabric suited to bulk printing and embroidery.', tag: 'جاهز للتصدير', tag_en: 'Export ready', image: 'Basic Knit T-Shirt.jpg' },
  { id: 'p3', category: 'clothes', name: 'هودي فليس شتوي', name_en: 'Winter Fleece Hoodie', desc: 'نسيج وبرة كثيف بتشطيب داخلي ناعم، مثالي لمواسم الشتاء.', desc_en: 'Dense fleece knit with a soft inner finish, ideal for winter seasons.', tag: '', tag_en: '', image: 'Winter Fleece Hoodie.jpg' },
  { id: 'p4', category: 'towels', name: 'فوطة حمام قطنية فاخرة', name_en: 'Premium Cotton Bath Towel', desc: 'امتصاص عالي ونعومة تدوم بعد الغسيل المتكرر.', desc_en: 'High absorbency and softness that lasts through repeated washing.', tag: 'الأعلى مبيعًا', tag_en: 'Top seller', image: 'Premium Cotton Bath Towel.jpg' },
  { id: 'p5', category: 'towels', name: 'طقم فوط مطبخ', desc: 'نسيج مزدوج الكثافة يتحمل الاستخدام اليومي المكثف.', name_en: 'Kitchen Towel Set', desc_en: 'Double-density weave built for heavy daily use.', tag: '', tag_en: '', image: 'Kitchen Towel Set.jpg' },
  { id: 'p6', category: 'robes', name: 'برنس تيري كلاسيك', name_en: 'Classic Terry Bathrobe', desc: 'برانص فندقية بخامة تيري ثقيلة وياقة قبعة.', desc_en: 'Hotel-grade robes in heavy terry fabric with a hood collar.', tag: 'فنادق ومنتجعات', tag_en: 'Hotels & resorts', image: 'Classic Terry Bathrobe.jpg' },
  { id: 'p7', category: 'robes', name: 'برنس أطفال مقلم', name_en: 'Striped Kids Bathrobe', desc: 'مقاسات أطفال بألوان وطبعات قابلة للتخصيص.', desc_en: 'Kids sizing with customisable colours and prints.', tag: '', tag_en: '', image: 'Striped Kids Bathrobe.jpg' },
  { id: 'p8', category: 'fabrics', name: 'قماش تريكو بيما', name_en: 'Pima Knit Fabric', desc: 'خامة تصدير بعرض قياسي وثبات ألوان عالي.', desc_en: 'Export-grade fabric in a standard width with high colour fastness.', tag: 'بالجملة', tag_en: 'Wholesale', image: 'Pima Knit Fabric.jpg' },
  { id: 'p9', category: 'fabrics', name: 'قماش وبرة فرنسية', name_en: 'French Terry Fabric', desc: 'مناسب لصناعة الهوديز والجاكيتات الرياضية.', desc_en: 'Suited to manufacturing hoodies and athletic jackets.', tag: '', tag_en: '', image: 'French Terry Fabric.jpg' },
];

const NT_CLIENTS = [
  { id: 'c1', name: 'Bed Bath & Beyond', logo: 'assets/Bed%20Bath%20%26%20Beyond.png' },
  { id: 'c2', name: 'COSTCO', logo: 'assets/COSTCO.png' },
  { id: 'c3', name: 'El Corte Inglés', logo: 'assets/El%20Corte%20Ingles.png' },
  { id: 'c4', name: "FILI D'ORO by Gastaldi", logo: "assets/FILI%20D'ORO%20by%20Gastaldi.png" },
  { id: 'c5', name: 'GROUP TOLEDO', logo: 'assets/GROUP%20TOLEDO.png' },
  { id: 'c6', name: 'La Vie en Rose', logo: 'assets/La%20Vie%20en%20Rose.png' },
  { id: 'c7', name: 'Laura Ashley', logo: 'assets/Laura%20Ashley.png' },
  { id: 'c8', name: 'Perpetuum – Mere Treaba!', logo: 'assets/Perpetuum%20-%20Mere%20Treaba!.png' },
  { id: 'c9', name: 'Primark', logo: 'assets/Primark.png' },
  { id: 'c10', name: 'ZARA HOME', logo: 'assets/Zara%20Home.png' },
];

function ntLang() {
  return document.documentElement.classList.contains('lang-en') ? 'en' : 'ar';
}

const NileTextileData = {
  getProducts() { return NT_PRODUCTS; },
  getProductsByCategory(cat) { return NT_PRODUCTS.filter(p => p.category === cat); },
  getClients() { return NT_CLIENTS; },
  categoryLabel(id) {
    const c = NT_CATEGORIES.find(c => c.id === id);
    if (!c) return id;
    return ntLang() === 'en' ? c.label_en : c.label;
  },
};
