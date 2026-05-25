/* CamStay — main.js */

// ─── Navbar scroll effect ───────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ─── Mobile drawer menu ──────────────────────────
(function () {
  const hamburger = document.getElementById('hamburger');
  if (!hamburger) return;

  // Inject drawer + backdrop if not present
  if (!document.getElementById('navDrawer')) {
    // Detect active page
    const path = location.pathname.split('/').pop() || 'index.html';
    const links = [
      { href: 'accueil.html',      label: '<i class ="fa-solid fa-house"></i> Accueil' },
      { href: 'hotels.html',       label: '<i class ="fa-solid fa-hotel"></i> Hôtels' },
      { href: 'offres.html',       label: '<i class ="fa-solid fa-fire"></i> Offres' },
      { href: 'destinations.html', label: '<i class ="fa-solid fa-earth-africa"></i> Destinations' },
      { href: 'carte.html',        label: '<i class ="fa-solid fa-map"></i> Carte' },
      { href: 'apropos.html',      label: '<i class ="fa-solid fa-circle-info"></i> À propos' },
      { href: 'aide.html',         label: '<i class ="fa-solid fa-headphones"></i> Aide' },
    ];

    const linksHTML = links.map(l =>
      `<a href="${l.href}" class="${path === l.href ? 'active' : ''}">${l.label}</a>`
    ).join('');

    document.body.insertAdjacentHTML('beforeend', `
      <div class="nav-backdrop" id="navBackdrop"></div>
      <div class="nav-drawer" id="navDrawer">
        <div class="drawer-header">
          <span style="font-family:'Sora',sans-serif;font-weight:800;font-size:1.4rem;">
            <span style="color:#1a56db;">CamStay</span>
          </span>
         
        </div>
        <div class="drawer-links">${linksHTML}</div>
        <div class="drawer-actions">
          <a href="login.html" class="btn-link">Connexion</a>
          <a href="login.html" class="btn-primary">S'inscrire</a>
        </div>
      </div>
    `);
  }

  const drawer   = document.getElementById('navDrawer');
  const backdrop = document.getElementById('navBackdrop');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    closeBtn.classList.add('activate');
    openBtn.classList.add('act');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    closeBtn.classList.remove('activate');
    openBtn.classList.remove('act');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeDrawer();
  });

  // Close on drawer link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });
})();

// ─── Search tabs ────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ─── Destination nav ────────────────────────────
function goToHotels(city) {
  const dest = document.getElementById('destination');
  if (dest) dest.value = city;
  window.location.href = 'hotels.html';
}

// ─── Price range ────────────────────────────────
function updatePrice(val) {
  const el = document.getElementById('priceVal');
  if (el) el.textContent = parseInt(val).toLocaleString('fr-FR') + ' FCFA';
}

// ─── Favorite toggle ────────────────────────────
document.querySelectorAll('.fav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '❤' : '♡';
    btn.style.color = btn.classList.contains('active') ? 'red' : '';
  });
});

// ─── Booking Modal ──────────────────────────────
const modalOverlay = document.getElementById('modalOverlay');

function openBooking(roomType, price) {
  if (!modalOverlay) return;
  const titleEl = document.getElementById('modalRoomTitle');
  const priceEl = document.getElementById('modalRoomPrice');
  if (titleEl) titleEl.textContent = roomType;
  if (priceEl) priceEl.textContent = price.toLocaleString('fr-FR') + ' FCFA';
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showBookingModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === modalOverlay) closeBooking();
}

// ─── Animate cards on scroll ────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.hotel-card, .dest-card, .hotel-list-card, .room-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.08}s ease, transform 0.5s ${i * 0.08}s ease`;
  observer.observe(el);
});

// ─── Date validation ────────────────────────────
const checkin = document.getElementById('checkin') || document.getElementById('bookCheckin');
const checkout = document.getElementById('checkout') || document.getElementById('bookCheckout');

if (checkin && checkout) {
  const today = new Date().toISOString().split('T')[0];
  checkin.min = today;
  checkin.addEventListener('change', () => {
    checkout.min = checkin.value;
    if (checkout.value && checkout.value <= checkin.value) {
      const next = new Date(checkin.value);
      next.setDate(next.getDate() + 1);
      checkout.value = next.toISOString().split('T')[0];
    }
  });
}

// ─── Filter apply button ────────────────────────
const filterBtn = document.querySelector('.btn-filter-apply');
if (filterBtn) {
  filterBtn.addEventListener('click', () => {
    filterBtn.textContent = '✓ Filtres appliqués';
    filterBtn.style.background = '#16a34a';
    setTimeout(() => {
      filterBtn.textContent = 'Appliquer les filtres';
      filterBtn.style.background = '';
    }, 2000);
  });
}

// ─── Sort select ────────────────────────────────
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    const list = document.querySelector('.hotel-list');
    if (!list) return;
    list.style.opacity = '0.5';
    setTimeout(() => { list.style.opacity = '1'; }, 400);
  });
}

// ─── Pagination ─────────────────────────────────
document.querySelectorAll('.page-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('next')) return;
    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
