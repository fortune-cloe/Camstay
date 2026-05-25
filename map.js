/* =========================================
   CAMSTAY — Map Page JavaScript (Leaflet)
   ========================================= */

const HOTELS = [
  {
    id: 1, name: 'Hotel La Falaise Yaoundé',
    lat: 3.8847, lng: 11.5167,
    price: '25 000', rating: '4.1', stars: '★★★★',
    reviews: 138, loc: 'Bastos, Yaoundé',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80',
    cat: 'hotel'
  },
  {
    id: 2, name: 'Djeuga Palace Hotel',
    lat: 3.8680, lng: 11.5210,
    price: '35 000', rating: '4.2', stars: '★★★★',
    reviews: 95, loc: 'Mballa II, Yaoundé',
    img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80',
    cat: 'hotel'
  },
  {
    id: 3, name: 'Hôtel Mont Fébé',
    lat: 3.9050, lng: 11.4970,
    price: '20 000', rating: '4.0', stars: '★★★★',
    reviews: 78, loc: 'Mont Fébé, Yaoundé',
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80',
    cat: 'hotel'
  },
  {
    id: 4, name: 'Hotel Sawa Douala',
    lat: 4.0483, lng: 9.7043,
    price: '22 000', rating: '3.9', stars: '★★★',
    reviews: 60, loc: 'Bonanjo, Douala',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&q=80',
    cat: 'hotel'
  },
  {
    id: 5, name: 'Résidence La Vallée',
    lat: 3.8780, lng: 11.5080,
    price: '30 000', rating: '4.2', stars: '★★★★',
    reviews: 64, loc: 'Bastos, Yaoundé',
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80',
    cat: 'residence'
  },
  {
    id: 6, name: 'Hotel Akwa Palace',
    lat: 4.0612, lng: 9.6968,
    price: '28 000', rating: '4.6', stars: '★★★★★',
    reviews: 204, loc: 'Akwa, Douala',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&q=80',
    cat: 'hotel'
  },
  {
    id: 7, name: 'Auberge de la Paix',
    lat: 5.9631, lng: 10.1500,
    price: '12 000', rating: '3.8', stars: '★★★',
    reviews: 42, loc: 'Bafoussam Centre',
    img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=300&q=80',
    cat: 'auberge'
  },
  {
    id: 8, name: 'Palm Beach Résidence',
    lat: 2.9395, lng: 9.9077,
    price: '18 000', rating: '4.3', stars: '★★★★',
    reviews: 89, loc: 'Kribi Bord de mer',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80',
    cat: 'residence'
  },
  {
    id: 9, name: 'Hôtel Fako Limbé',
    lat: 4.0222, lng: 9.1951,
    price: '16 000', rating: '3.9', stars: '★★★',
    reviews: 37, loc: 'Down Beach, Limbé',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&q=80',
    cat: 'hotel'
  }
];

const CITIES = {
  yaounde:   { lat: 3.848, lng: 11.502, zoom: 13 },
  douala:    { lat: 4.061, lng: 9.742,  zoom: 13 },
  bafoussam: { lat: 5.478, lng: 10.421, zoom: 13 },
  kribi:     { lat: 2.940, lng: 9.908,  zoom: 13 },
  limbe:     { lat: 4.022, lng: 9.195,  zoom: 13 },
  garoua:    { lat: 9.301, lng: 13.397, zoom: 13 },
};

// ── Init map ──────────────────────────────────────
const map = L.map('map', {
  center: [3.848, 11.502],
  zoom: 12,
  zoomControl: false,
});

L.control.zoom({ position: 'topright' }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map);

// ── Markers ──────────────────────────────────────
const markers = {};

function makeMarker(h) {
  const icon = L.divIcon({
    className: '',
    html: `<div class="price-marker" id="marker-${h.id}">${h.price} FCFA</div>`,
    iconAnchor: [40, 15],
  });

  const marker = L.marker([h.lat, h.lng], { icon }).addTo(map);

  const popupHtml = `
    <div class="map-popup">
      <img src="${h.img}" alt="${h.name}">
      <h4>${h.name}</h4>
      <div class="pop-rating">${h.stars} <span style="color:#374151;font-weight:600;">${h.rating}</span> <span style="color:#94a3b8;">(${h.reviews} avis)</span></div>
      <div class="pop-loc">📍 ${h.loc}</div>
      <div class="pop-price">${h.price} FCFA <span style="font-size:0.72rem;font-weight:400;color:#64748b;">/ nuit</span></div>
      <a href="hotel-detail.html">Voir les chambres →</a>
    </div>`;

  marker.bindPopup(popupHtml, { maxWidth: 220, closeButton: true });

  marker.on('click', () => activateHotel(h.id));
  markers[h.id] = marker;
}

HOTELS.forEach(makeMarker);

// ── Active hotel ──────────────────────────────────
let activeId = 1;

function activateHotel(id) {
  // Reset previous
  if (activeId) {
    const prev = document.getElementById(`marker-${activeId}`);
    if (prev) prev.classList.remove('active-marker');
    const prevCard = document.querySelector(`.map-hotel-card[data-id="${activeId}"]`);
    if (prevCard) prevCard.classList.remove('active-card');
  }
  activeId = id;

  // Activate new
  const el = document.getElementById(`marker-${id}`);
  if (el) el.classList.add('active-marker');
  const card = document.querySelector(`.map-hotel-card[data-id="${id}"]`);
  if (card) {
    card.classList.add('active-card');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const hotel = HOTELS.find(h => h.id === id);
  if (hotel) {
    map.setView([hotel.lat, hotel.lng], 14, { animate: true });
    markers[id].openPopup();
  }
}

function focusHotel(id) { activateHotel(id); }

// ── City navigation ───────────────────────────────
function goToCity(cityKey) {
  const city = CITIES[cityKey];
  if (!city) return;
  map.flyTo([city.lat, city.lng], city.zoom, { duration: 1.2 });
  document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[onclick="goToCity('${cityKey}')"]`)?.classList.add('active');
}

// ── Search filter ─────────────────────────────────
document.getElementById('mapSearch').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  const cards = document.querySelectorAll('.map-hotel-card');
  cards.forEach(card => {
    const id = parseInt(card.dataset.id);
    const hotel = HOTELS.find(h => h.id === id);
    const match = hotel && (hotel.name.toLowerCase().includes(q) || hotel.loc.toLowerCase().includes(q));
    card.style.display = match ? '' : 'none';
    if (markers[id]) {
      if (match) markers[id].addTo(map); else map.removeLayer(markers[id]);
    }
  });
  const visible = [...cards].filter(c => c.style.display !== 'none').length;
  document.getElementById('map-count').textContent = `${visible} établissement${visible > 1 ? 's' : ''} trouvé${visible > 1 ? 's' : ''}`;
});

// ── Category filter ───────────────────────────────
document.querySelectorAll('.map-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;

    const cards = document.querySelectorAll('.map-hotel-card');
    cards.forEach(card => {
      const id = parseInt(card.dataset.id);
      const hotel = HOTELS.find(h => h.id === id);
      const show = cat === 'all' || hotel.cat === cat;
      card.style.display = show ? '' : 'none';
      if (markers[id]) {
        if (show) markers[id].addTo(map); else map.removeLayer(markers[id]);
      }
    });

    const visible = [...cards].filter(c => c.style.display !== 'none').length;
    document.getElementById('map-count').textContent = `${visible} établissement${visible > 1 ? 's' : ''} trouvé${visible > 1 ? 's' : ''}`;
  });
});

// ── Navbar scroll ─────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
});
