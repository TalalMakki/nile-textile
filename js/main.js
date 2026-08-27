// ============================================================
// Nile Textile — site behaviour
// ============================================================

// mobile nav toggle
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav-toggle');
  if (toggle) {
    document.querySelector('.nav-links')?.classList.toggle('open');
    return;
  }
  if (e.target.closest('.nav-links a')) {
    document.querySelector('.nav-links')?.classList.remove('open');
  }
});

// scroll reveal — with a safety net so content is never stuck invisible
// (e.g. if IntersectionObserver never fires in an embedded preview/iframe)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  revealEls.forEach(el => io.observe(el));
  // failsafe: force-reveal anything still hidden after 1.5s
  setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 1500);
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- bilingual toggle (Arabic default / English) ----------
(function () {
  const STORAGE_KEY = 'nt_lang';
  function applyLang(lang) {
    const html = document.documentElement;
    if (lang === 'en') {
      html.classList.add('lang-en');
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
    } else {
      html.classList.remove('lang-en');
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
    }
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = lang === 'en' ? 'العربية' : 'English';
    });
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const enTitle = titleEl.getAttribute('data-title-en');
      const arTitle = titleEl.getAttribute('data-title-ar');
      if (enTitle && arTitle) titleEl.textContent = lang === 'en' ? enTitle : arTitle;
    }
  }
  const saved = localStorage.getItem(STORAGE_KEY) || 'ar';
  applyLang(saved);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-toggle');
    if (!btn) return;
    const current = document.documentElement.classList.contains('lang-en') ? 'en' : 'ar';
    const next = current === 'en' ? 'ar' : 'en';
    localStorage.setItem(STORAGE_KEY, next);
    applyLang(next);
  });
})();

// contact form -> mailto (no backend wired up yet)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('#cf-name').value.trim();
    const email = contactForm.querySelector('#cf-email').value.trim();
    const message = contactForm.querySelector('#cf-message').value.trim();
    const subject = encodeURIComponent('طلب تواصل من الموقع — ' + name);
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\n${message}`);
    window.location.href = `mailto:Info@niletexind.com?subject=${subject}&body=${body}`;
  });
}

// year in footer
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

// ---------- YouTube facade: load the iframe only after a click ----------
(function () {
  const facade = document.getElementById('video-facade');
  const frame = document.getElementById('video-frame');
  if (!facade || !frame) return;
  facade.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/WcMPBDiUGKQ?autoplay=1&rel=0';
    iframe.title = 'Nile Textile — Company Video';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    frame.innerHTML = '';
    frame.appendChild(iframe);
  }, { once: true });
})();
