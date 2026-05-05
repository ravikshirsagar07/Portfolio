/* === APP.JS — Arqos-style Portfolio === */

// ---- ORANGE CURSOR ----
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- FULLSCREEN MENU ----
const menuOverlay = document.getElementById('menu-overlay');
const menuBtn     = document.getElementById('nav-menu-btn');
const menuClose   = document.getElementById('menu-close');

menuBtn.addEventListener('click', () => menuOverlay.classList.add('open'));
menuClose.addEventListener('click', () => menuOverlay.classList.remove('open'));

document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    menuOverlay.classList.remove('open');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') menuOverlay.classList.remove('open');
});

// ---- SCROLL REVEAL ----
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObs.observe(el);
});

// Stagger skill rows
document.querySelectorAll('.skill-row').forEach((row, i) => {
  row.style.transitionDelay = (i * 0.1) + 's';
});

// ---- STAT COUNTERS ----
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    let count    = 0;
    const step   = Math.ceil(target / 50);
    const timer  = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count >= target) clearInterval(timer);
    }, 30);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

// ---- CONTACT FORM ----
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btnSpan = submitBtn.querySelector('span');
    submitBtn.disabled     = true;
    btnSpan.textContent    = 'Sending...';
    formStatus.className   = 'form-status';
    formStatus.textContent = '';

    try {
      const res  = await fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });
      const data = await res.json();
      if (res.ok) {
        formStatus.className   = 'form-status success';
        formStatus.textContent = 'Message sent! Ravi will reply within 24 hours.';
        form.reset();
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch {
      formStatus.className   = 'form-status error';
      formStatus.textContent = 'Failed to send. Email: raviksh7607@gmail.com';
    }

    submitBtn.disabled  = false;
    btnSpan.textContent = 'Send Message';
    setTimeout(() => { formStatus.className = 'form-status'; }, 6000);
  });
}

// ---- HERO PARALLAX BG TEXT ----
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText && window.scrollY < window.innerHeight) {
    heroBgText.style.transform =
      `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px))`;
  }
});

// ---- QR CODE MODAL ----
(function () {
  const fab         = document.getElementById('qr-fab');
  const overlay     = document.getElementById('qr-overlay');
  const closeBtn    = document.getElementById('qr-close');
  const dlBtn       = document.getElementById('qr-download');
  const copyBtn     = document.getElementById('qr-copy-url');
  const urlLabel    = document.getElementById('qr-url-label');
  const copyStatus  = document.getElementById('qr-copy-status');
  const qrContainer = document.getElementById('qr-code');

  if (!fab) return;
  let qrInstance = null;

  function getURL() { return 'https://ravi-kshirsagar.netlify.app'; }

  function buildQR() {
    qrContainer.innerHTML = '';
    const url = getURL();
    urlLabel.textContent = url;
    qrInstance = new QRCode(qrContainer, {
      text: url, width: 200, height: 200,
      colorDark: '#080808', colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  function open()  { if (!qrInstance) buildQR(); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; copyStatus.textContent = ''; }

  fab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  dlBtn.addEventListener('click', () => {
    const canvas = qrContainer.querySelector('canvas');
    if (!canvas) return;
    const out = document.createElement('canvas');
    const pad = 20;
    out.width  = canvas.width  + pad * 2;
    out.height = canvas.height + pad * 2;
    const ctx  = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(canvas, pad, pad);
    const link    = document.createElement('a');
    link.download = 'ravi-portfolio-qr.png';
    link.href     = out.toDataURL('image/png');
    link.click();
  });

  copyBtn.addEventListener('click', () => {
    const url = getURL();
    navigator.clipboard.writeText(url).then(() => {
      copyStatus.textContent = 'URL copied!';
      setTimeout(() => { copyStatus.textContent = ''; }, 3000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = url; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      copyStatus.textContent = 'URL copied!';
      setTimeout(() => { copyStatus.textContent = ''; }, 3000);
    });
  });
})();

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
