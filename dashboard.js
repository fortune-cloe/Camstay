/* =========================================
   CAMSTAY — Dashboard JavaScript
   ========================================= */

// ── Revenue Chart (Chart.js) ──────────────────────
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
  new Chart(revenueCtx, {
    type: 'bar',
    data: {
      labels: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
      datasets: [
        {
          label: 'Revenus 2026 (FCFA)',
          data: [280000, 320000, 410000, 375000, 450000, 490000, 530000, 510000, 460000, 420000, 380000, 350000],
          backgroundColor: 'rgba(26,86,219,0.85)',
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: 'Revenus 2025 (FCFA)',
          data: [210000, 260000, 340000, 290000, 370000, 410000, 440000, 430000, 380000, 340000, 300000, 280000],
          backgroundColor: 'rgba(26,86,219,0.15)',
          borderRadius: 8,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: { family: 'DM Sans', size: 12 },
            usePointStyle: true,
            pointStyleWidth: 8,
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y.toLocaleString('fr-FR')} FCFA`,
          },
          backgroundColor: '#0f172a',
          titleFont: { family: 'Sora', weight: '700' },
          bodyFont: { family: 'DM Sans' },
          padding: 12,
          cornerRadius: 10,
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'DM Sans', size: 11 }, color: '#94a3b8' }
        },
        y: {
          grid: { color: '#f1f5f9' },
          ticks: {
            font: { family: 'DM Sans', size: 11 },
            color: '#94a3b8',
            callback: v => (v / 1000) + 'k',
          },
          border: { display: false }
        }
      }
    }
  });
}

// ── Star rating (rapport form) ────────────────────
const stars = document.querySelectorAll('.star-r');
stars.forEach((star, i) => {
  star.addEventListener('mouseenter', () => {
    stars.forEach((s, j) => s.classList.toggle('active', j <= i));
  });
  star.addEventListener('mouseleave', () => {
    const selected = [...stars].findIndex(s => s.dataset.selected);
    stars.forEach((s, j) => s.classList.toggle('active', j <= selected));
  });
  star.addEventListener('click', () => {
    stars.forEach(s => delete s.dataset.selected);
    star.dataset.selected = true;
    stars.forEach((s, j) => s.classList.toggle('active', j <= i));
  });
});

// ── Submit rapport ────────────────────────────────
const submitBtn = document.querySelector('.btn-submit-rapport');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const orig = submitBtn.textContent;
    submitBtn.textContent = '✅ Rapport envoyé !';
    submitBtn.style.background = '#16a34a';
    setTimeout(() => {
      submitBtn.textContent = orig;
      submitBtn.style.background = '';
    }, 2500);
  });
}

// ── Add mission ───────────────────────────────────
const addMissionBtn = document.querySelector('.btn-add-mission');
if (addMissionBtn) {
  addMissionBtn.addEventListener('click', () => {
    const name = prompt('Nom de la mission :');
    if (!name) return;
    const list = document.querySelector('.missions-list');
    const item = document.createElement('div');
    item.className = 'mission-item';
    item.innerHTML = `
      <div class="mission-status-dot gray"></div>
      <div class="mission-body">
        <div class="mission-name">${name}</div>
        <div class="mission-time">⏰ Nouveau</div>
        <div class="mission-tags"><span class="m-tag">Nouveau</span></div>
      </div>
      <span class="status" style="background:#f3f4f6;color:#6b7280;flex-shrink:0;">À faire</span>`;
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    list.appendChild(item);
    requestAnimationFrame(() => {
      item.style.transition = 'all 0.3s';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    });
  });
}

// ── Animate perf bars on load ─────────────────────
const perfBars = document.querySelectorAll('.perf-bar');
if (perfBars.length) {
  const targets = [...perfBars].map(b => b.style.width);
  perfBars.forEach(b => b.style.width = '0');
  setTimeout(() => {
    perfBars.forEach((b, i) => b.style.width = targets[i]);
  }, 300);
}

// ── Table row actions ─────────────────────────────
document.querySelectorAll('.btn-action').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Détail de la réservation — fonctionnalité à connecter au backend.');
  });
});

// ── KPI hover effect ──────────────────────────────
document.querySelectorAll('.kpi-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-3px)';
    card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    card.style.transition = 'all 0.25s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// ── Active nav link highlight ─────────────────────
document.querySelectorAll('.dash-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.href && !this.href.includes('#') && !this.href.includes('index.html')) return;
    e.preventDefault();
    document.querySelectorAll('.dash-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── Real-time clock in topbar ─────────────────────
function updateClock() {
  const dateEl = document.querySelector('.dash-date');
  if (!dateEl) return;
  const now = new Date();
  const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const dateStr = now.toLocaleDateString('fr-FR', options);
  const timeStr = now.toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' });
  dateEl.textContent = `${dateStr} · ${timeStr}`;
}
updateClock();
setInterval(updateClock, 60000);
