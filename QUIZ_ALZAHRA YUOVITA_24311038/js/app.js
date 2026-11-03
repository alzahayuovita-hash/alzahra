/**
 * SIMPAD - Sistem Informasi Monitoring & Optimalisasi Pendapatan Asli Daerah
 * Kabupaten Tulang Bawang, Provinsi Lampung
 * 
 * Main Application Logic & Interactivity
 */

document.addEventListener("DOMContentLoaded", function() {
  // Global App State
  window.CURRENT_YEAR = "2026";
  window.CURRENT_ROLE = "VERIFIKATOR"; // Default role: Verifikator BPKAD
  window.CURRENT_USER = SIMPAD_DATA.users[1]; // Rina Suryani
  window.CURRENT_TAB = "dashboard";

  // Inisialisasi Aplikasi
  initNavigation();
  initRoleSwitcher();
  initYearFilter();
  renderApp();
  initModalListeners();
  initFormListeners();
});

// 1. Inisialisasi Navigasi Sidebar & Tab
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      const targetTab = this.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });

  // Mobile sidebar toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("mobile-sidebar-overlay");

  if (mobileToggle && sidebar && overlay) {
    mobileToggle.addEventListener("click", function() {
      sidebar.classList.toggle("-translate-x-full");
      overlay.classList.toggle("hidden");
    });

    overlay.addEventListener("click", function() {
      sidebar.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    });
  }
}

// Berpindah Tab Antarmuka
function switchTab(tabId) {
  window.CURRENT_TAB = tabId;

  // Update nav UI
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-tab") === tabId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Hide all sections
  document.querySelectorAll(".tab-content-section").forEach(sec => {
    sec.classList.add("hidden");
  });

  // Show target section
  const activeSection = document.getElementById(`section-${tabId}`);
  if (activeSection) {
    activeSection.classList.remove("hidden");
  }

  // Update breadcrumb
  const breadcrumbCurrent = document.getElementById("breadcrumb-current");
  const titles = {
    "dashboard": "Dashboard Capaian PAD",
    "kesenjangan": "Kesenjangan & Proyeksi Akhir Tahun",
    "verifikasi": "Antrean Verifikasi & Input Realisasi",
    "anomali": "Deteksi Anomali Data PAD",
    "laporan": "Laporan & Rekapitulasi Eksekutif",
    "master-data": "Master Data & Rekening PAD",
    "audit": "Jejak Audit Keuangan",
    "simulasi": "Simulasi Target APBD-P"
  };
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = titles[tabId] || "Dashboard";
  }

  // Render chart if necessary
  if (tabId === "dashboard") {
    setTimeout(() => {
      SIMPAD_CHARTS.renderTrenBulanan(window.CURRENT_YEAR);
      SIMPAD_CHARTS.renderKomposisi(window.CURRENT_YEAR);
    }, 50);
  } else if (tabId === "kesenjangan") {
    setTimeout(() => {
      SIMPAD_CHARTS.renderProyeksiKesenjangan();
      SIMPAD_CHARTS.renderMultiTahun();
    }, 50);
  }
}

// 2. Role Switcher (Simulasi Peran Pengguna)
function initRoleSwitcher() {
  const selectRole = document.getElementById("role-selector");
  if (!selectRole) return;

  selectRole.addEventListener("change", function() {
    const roleId = this.value;
    window.CURRENT_ROLE = roleId;

    // Temukan user representatif
    const matchedUser = SIMPAD_DATA.users.find(u => u.role === roleId) || SIMPAD_DATA.users[0];
    window.CURRENT_USER = matchedUser;

    // Update avatar & info di top bar
    const userNameEl = document.getElementById("top-user-name");
    const userRoleEl = document.getElementById("top-user-role");
    const userAvatarEl = document.getElementById("top-user-avatar");

    if (userNameEl) userNameEl.textContent = matchedUser.nama;
    if (userRoleEl) userRoleEl.textContent = `${matchedUser.jabatan} (${matchedUser.instansi})`;
    if (userAvatarEl) userAvatarEl.textContent = matchedUser.avatar;

    applyRolePermissions();
    SIMPAD_UTILS.showToast("Beralih Peran", `Sistem kini berjalan sebagai mode: ${matchedUser.nama} (${roleId})`, "info");
  });
}

function applyRolePermissions() {
  const role = window.CURRENT_ROLE;
  const isOperator = (role === "OPERATOR");
  const isVerifikator = (role === "VERIFIKATOR");
  const isAdmin = (role === "ADMIN");

  // Kontrol tombol Input Realisasi
  const btnInputRealisasi = document.getElementById("btn-open-input-modal");
  if (btnInputRealisasi) {
    if (isOperator || isVerifikator || isAdmin) {
      btnInputRealisasi.classList.remove("hidden");
    } else {
      btnInputRealisasi.classList.add("hidden");
    }
  }

  // Kontrol tombol Impor Berkas
  const btnImpor = document.getElementById("btn-open-import-modal");
  if (btnImpor) {
    if (isVerifikator || isAdmin) {
      btnImpor.classList.remove("hidden");
    } else {
      btnImpor.classList.add("hidden");
    }
  }

  // Re-render antrean tabel verifikasi untuk mengupdate tombol aksi
  renderAntreanVerifikasi();
}

// 3. Filter Tahun
function initYearFilter() {
  const yearButtons = document.querySelectorAll(".year-filter-btn");
  yearButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      yearButtons.forEach(b => {
        b.classList.remove("bg-primary", "text-white");
        b.classList.add("bg-white", "text-slate-700");
      });
      this.classList.remove("bg-white", "text-slate-700");
      this.classList.add("bg-primary", "text-white");

      window.CURRENT_YEAR = this.getAttribute("data-year");
      renderApp();
      SIMPAD_UTILS.showToast("Tahun Anggaran", `Memuat data Anggaran & Realisasi TA ${window.CURRENT_YEAR}`, "info");
    });
  });
}

// 4. Render Master Application
function renderApp() {
  renderKpiCards();
  renderKomponenCards();
  renderTableRealisasi();
  renderAntreanVerifikasi();
  renderKasusAnomali();
  renderMasterData();
  renderAuditTable();
  renderLaporanEksekutif();
  renderKesenjanganAnalysis();

  // Charts
  setTimeout(() => {
    SIMPAD_CHARTS.renderTrenBulanan(window.CURRENT_YEAR);
    SIMPAD_CHARTS.renderKomposisi(window.CURRENT_YEAR);
  }, 100);
}

// Render 4 KPI Cards Utama
function renderKpiCards() {
  const d = SIMPAD_DATA.tahunan[window.CURRENT_YEAR];
  if (!d) return;

  const targetEl = document.getElementById("kpi-target-pad");
  const realisasiEl = document.getElementById("kpi-realisasi-pad");
  const persenEl = document.getElementById("kpi-persen-pad");
  const sisaEl = document.getElementById("kpi-sisa-pad");
  const statusLaporanEl = document.getElementById("kpi-status-laporan");

  const persenCapaian = (d.realisasiPAD / d.targetPAD) * 100;

  if (targetEl) targetEl.textContent = SIMPAD_UTILS.formatRupiah(d.targetPAD);
  if (realisasiEl) realisasiEl.textContent = SIMPAD_UTILS.formatRupiah(d.realisasiPAD);
  if (persenEl) persenEl.textContent = SIMPAD_UTILS.formatPersen(persenCapaian);
  if (sisaEl) sisaEl.textContent = SIMPAD_UTILS.formatRupiah(d.sisaTarget);
  if (statusLaporanEl) statusLaporanEl.textContent = d.statusLaporan;

  // Subtitle konteks
  const kpiSubRealisasi = document.getElementById("kpi-sub-realisasi");
  if (kpiSubRealisasi) {
    if (window.CURRENT_YEAR === "2026") {
      kpiSubRealisasi.innerHTML = `<span class="text-amber-600 font-medium">Bulan ke-8 (Agustus)</span> • Laju rata-rata: <span class="font-mono-numbers font-bold">Rp 8,22 M/bln</span>`;
    } else if (window.CURRENT_YEAR === "2025") {
      kpiSubRealisasi.innerHTML = `<span class="text-slate-600">Posisi SIKD 20 Des 2025 (Sementara)</span>`;
    } else {
      kpiSubRealisasi.innerHTML = `<span class="text-emerald-700">Realisasi Akhir Tahun Teruji (RLPPD)</span>`;
    }
  }

  // Update Rasio Ketergantungan Transfer
  const rasioPadEl = document.getElementById("kpi-rasio-pad");
  const subRasioEl = document.getElementById("kpi-sub-rasio");
  if (rasioPadEl) {
    if (window.CURRENT_YEAR === "2026") {
      rasioPadEl.textContent = "16,18%";
      if (subRasioEl) subRasioEl.textContent = "Porsi target PAD terhadap anggaran pendapatan daerah 2026";
    } else if (window.CURRENT_YEAR === "2025") {
      rasioPadEl.textContent = "8,07%";
      if (subRasioEl) subRasioEl.textContent = "PAD hanya Rp 83,28 M dari total pendapatan Rp 1.032,57 M (91,93% Transfer)";
    } else {
      rasioPadEl.textContent = "11,09%";
      if (subRasioEl) subRasioEl.textContent = "PAD Rp 139,36 M dari total realisasi Rp 1.256,69 M (88,91% Transfer)";
    }
  }

  // Progress bar
  const progressBar = document.getElementById("kpi-progress-bar");
  if (progressBar) {
    progressBar.style.width = `${Math.min(100, persenCapaian)}%`;
  }
}

// Render Komponen PAD Cards
function renderKomponenCards() {
  const container = document.getElementById("komponen-cards-grid");
  if (!container) return;

  const d = SIMPAD_DATA.tahunan[window.CURRENT_YEAR];
  if (!d || !d.komponen) return;

  let html = "";
  d.komponen.forEach((k, idx) => {
    const isAnomali = (k.persen > 120 || (window.CURRENT_YEAR === "2025" && k.persen < 10));
    const badgeColor = isAnomali ? "badge-anomali" : (k.persen >= 70 ? "badge-terverifikasi" : "badge-menunggu");
    const icon = idx === 0 ? "payments" : (idx === 1 ? "receipt_long" : (idx === 2 ? "account_balance" : "domain"));

    html += `
      <div class="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm kpi-card">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg bg-surface-low text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-xl">${icon}</span>
            </div>
            <div>
              <h4 class="font-bold text-sm text-slate-900">${k.nama}</h4>
              <p class="text-xs text-slate-500">Porsi realisasi: <span class="font-bold font-mono-numbers text-primary">${k.porsiRealisasi ? k.porsiRealisasi.toFixed(1) + '%' : '-'}</span></p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}">
            ${k.persen.toFixed(1)}%
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span class="text-slate-400 block">Target APBD:</span>
            <span class="font-mono-numbers font-semibold text-slate-700">${SIMPAD_UTILS.formatRupiahSingkat(k.target)}</span>
          </div>
          <div class="text-right">
            <span class="text-slate-400 block">Realisasi:</span>
            <span class="font-mono-numbers font-bold text-emerald-700">${SIMPAD_UTILS.formatRupiahSingkat(k.realisasi)}</span>
          </div>
        </div>

        ${k.catatan ? `
          <div class="mt-3 p-2 bg-amber-50/70 border border-amber-200 rounded text-[11px] text-amber-800 flex items-start space-x-1.5">
            <span class="material-symbols-outlined text-sm text-amber-600 mt-0.5">info</span>
            <span>${k.catatan}</span>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render Tabel Rincian Rekening Pendapatan
function renderTableRealisasi() {
  const tbody = document.getElementById("table-realisasi-tbody");
  if (!tbody) return;

  let html = "";
  SIMPAD_DATA.akunHierarki.forEach(group => {
    // Header kelompok
    html += `
      <tr class="bg-surface-low/80 font-bold text-xs text-primary border-t border-b border-slate-200">
        <td colspan="6" class="px-4 py-2.5">
          <div class="flex items-center space-x-2">
            <span class="font-mono-numbers bg-primary text-white px-2 py-0.5 rounded text-[11px]">${group.kode}</span>
            <span>${group.komponen}</span>
            <span class="font-normal text-slate-500 text-[11px]">(${group.deskripsi})</span>
          </div>
        </td>
      </tr>
    `;

    group.subAkun.forEach(sub => {
      const targetVal = sub.target2026;
      const realisasiVal = (window.CURRENT_YEAR === "2026") ? sub.realisasi2026 : (sub.target2026 * (window.CURRENT_YEAR === "2024" ? 0.74 : 0.45));
      const persen = targetVal > 0 ? (realisasiVal / targetVal) * 100 : 0;
      const opdObj = SIMPAD_DATA.opdList.find(o => o.id === sub.opdId) || { nama: "Multi-OPD" };

      const badgeColor = persen >= 70 ? "badge-terverifikasi" : (persen >= 40 ? "badge-menunggu" : "badge-anomali");

      html += `
        <tr class="hover:bg-slate-50 border-b border-slate-100 text-xs">
          <td class="px-4 py-3 font-mono-numbers font-medium text-slate-600">${sub.kode}</td>
          <td class="px-4 py-3 font-semibold text-slate-800">
            ${sub.nama}
            <div class="text-[11px] text-slate-400 font-normal md:hidden">${opdObj.nama}</div>
          </td>
          <td class="px-4 py-3 text-slate-600 hidden md:table-cell">${opdObj.nama}</td>
          <td class="px-4 py-3 text-right font-mono-numbers text-slate-700">${SIMPAD_UTILS.formatRupiah(targetVal)}</td>
          <td class="px-4 py-3 text-right font-mono-numbers font-bold text-slate-900">${SIMPAD_UTILS.formatRupiah(realisasiVal)}</td>
          <td class="px-4 py-3 text-center">
            <span class="inline-block px-2 py-0.5 rounded-full font-semibold font-mono-numbers text-[11px] ${badgeColor}">
              ${persen.toFixed(1)}%
            </span>
          </td>
        </tr>
      `;
    });
  });

  tbody.innerHTML = html;
}

// Render Antrean Verifikasi Dokumen OPD
function renderAntreanVerifikasi() {
  const tbody = document.getElementById("table-verifikasi-tbody");
  if (!tbody) return;

  const countBadge = document.getElementById("badge-count-verifikasi");
  const pendingCount = SIMPAD_DATA.antreanPengajuan.filter(i => i.status === "Menunggu Verifikasi").length;
  if (countBadge) countBadge.textContent = pendingCount;

  let html = "";
  SIMPAD_DATA.antreanPengajuan.forEach(item => {
    let badgeClass = "badge-menunggu";
    if (item.status === "Terverifikasi") badgeClass = "badge-terverifikasi";
    if (item.status === "Ditolak") badgeClass = "badge-ditolak";

    const isVerifikatorOrAdmin = (window.CURRENT_ROLE === "VERIFIKATOR" || window.CURRENT_ROLE === "ADMIN");

    html += `
      <tr class="hover:bg-slate-50/80 border-b border-slate-100 text-xs transition-colors">
        <td class="px-4 py-3 font-mono-numbers font-semibold text-primary">${item.noBukti}</td>
        <td class="px-4 py-3 text-slate-600">${SIMPAD_UTILS.formatTanggal(item.tanggalPengajuan)}</td>
        <td class="px-4 py-3 font-medium text-slate-800">${item.opdNama}</td>
        <td class="px-4 py-3">
          <div class="font-semibold text-slate-800">${item.akunNama}</div>
          <div class="text-[11px] text-slate-400 font-mono-numbers">${item.akunKode} • ${item.sumber}</div>
        </td>
        <td class="px-4 py-3 text-right font-mono-numbers font-bold text-slate-900">${SIMPAD_UTILS.formatRupiah(item.nominal)}</td>
        <td class="px-4 py-3 text-center">
          <span class="px-2.5 py-0.5 rounded-full font-medium text-[11px] ${badgeClass}">
            ${item.status}
          </span>
        </td>
        <td class="px-4 py-3 text-center">
          <div class="flex items-center justify-center space-x-1.5">
            <button onclick="lihatDetailVerifikasi('${item.id}')" title="Lihat Detail" class="p-1 rounded hover:bg-slate-200 text-slate-600">
              <span class="material-symbols-outlined text-lg">visibility</span>
            </button>
            ${item.status === "Menunggu Verifikasi" && isVerifikatorOrAdmin ? `
              <button onclick="openModalVerifikasi('${item.id}', true)" title="Verifikasi / Setujui" class="p-1 rounded hover:bg-emerald-100 text-emerald-700">
                <span class="material-symbols-outlined text-lg">check_circle</span>
              </button>
              <button onclick="openModalVerifikasi('${item.id}', false)" title="Kembalikan / Tolak" class="p-1 rounded hover:bg-red-100 text-red-600">
                <span class="material-symbols-outlined text-lg">cancel</span>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Render Daftar Kasus Anomali (Deteksi Otomatis FR-6.5)
function renderKasusAnomali() {
  const container = document.getElementById("anomali-cards-container");
  if (!container) return;

  const countBadge = document.getElementById("badge-count-anomali");
  const openCount = SIMPAD_DATA.daftarKasusAnomali.filter(a => a.status.includes("Terbuka")).length;
  if (countBadge) countBadge.textContent = openCount;

  let html = "";
  SIMPAD_DATA.daftarKasusAnomali.forEach(item => {
    const isSelesai = item.status.includes("Selesai");
    const borderClass = isSelesai ? "border-emerald-200 bg-white" : "border-red-200 bg-red-50/20";
    const badgeUrgensi = item.urgensi.includes("Tinggi") ? "bg-red-100 text-red-800 border-red-300" : "bg-amber-100 text-amber-800 border-amber-300";

    html += `
      <div class="p-5 rounded-xl border ${borderClass} shadow-sm transition-all hover:shadow-md">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-0.5 bg-primary text-white font-mono-numbers rounded text-xs font-bold">${item.kodeAturan}</span>
            <span class="font-bold text-slate-900 text-sm">${item.id}: ${item.komponen}</span>
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeUrgensi}">${item.urgensi}</span>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${isSelesai ? 'badge-terverifikasi' : 'badge-anomali'}">
            ${item.status}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-white rounded-lg border border-slate-100 text-xs mb-3 font-mono-numbers">
          <div><span class="text-slate-400 block font-sans">Akun Rekening:</span> <span class="font-semibold text-slate-800">${item.akun}</span></div>
          <div><span class="text-slate-400 block font-sans">Target vs Realisasi:</span> <span class="text-slate-700">${SIMPAD_UTILS.formatRupiahSingkat(item.target)}</span> vs <span class="text-emerald-700 font-bold">${SIMPAD_UTILS.formatRupiahSingkat(item.realisasi)}</span> (${item.capaianPersen.toFixed(1)}%)</div>
          <div><span class="text-slate-400 block font-sans">OPD Terkait:</span> <span class="font-semibold text-primary">${item.opd}</span></div>
        </div>

        <div class="space-y-2 text-xs">
          <div class="flex items-start space-x-2">
            <span class="font-bold text-slate-700 w-32 shrink-0">Temuan Anomali:</span>
            <p class="text-slate-600">${item.penyebabDugaan}</p>
          </div>
          <div class="flex items-start space-x-2">
            <span class="font-bold text-slate-700 w-32 shrink-0">Rekomendasi Tindak:</span>
            <p class="text-slate-600">${item.rekomendasi}</p>
          </div>
          ${item.tindakLanjut ? `
            <div class="flex items-start space-x-2 mt-2 p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-900">
              <span class="material-symbols-outlined text-sm text-emerald-600 mt-0.5">check_circle</span>
              <div><strong class="font-semibold">Catatan Tindak Lanjut:</strong> ${item.tindakLanjut}</div>
            </div>
          ` : `
            <div class="flex justify-end pt-2">
              <button onclick="bukaModalTindakLanjutAnomali('${item.id}')" class="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-container flex items-center space-x-1">
                <span class="material-symbols-outlined text-sm">edit_note</span>
                <span>Tindak Lanjuti & Rekonsiliasi</span>
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render Master Data & Rekening
function renderMasterData() {
  const container = document.getElementById("master-data-table-container");
  if (!container) return;

  let html = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-surface-low text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
          <tr>
            <th class="px-4 py-3">Kode Rekening</th>
            <th class="px-4 py-3">Nama Akun Pendapatan</th>
            <th class="px-4 py-3">OPD Pemungut</th>
            <th class="px-4 py-3">Target APBD 2026</th>
            <th class="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
  `;

  SIMPAD_DATA.akunHierarki.forEach(group => {
    html += `
      <tr class="bg-slate-100 font-bold text-primary">
        <td class="px-4 py-2 font-mono-numbers">${group.kode}</td>
        <td class="px-4 py-2" colspan="4">${group.komponen} (${group.deskripsi})</td>
      </tr>
    `;

    group.subAkun.forEach(sub => {
      const opdObj = SIMPAD_DATA.opdList.find(o => o.id === sub.opdId) || { nama: "Multi-OPD" };
      html += `
        <tr class="hover:bg-slate-50">
          <td class="px-4 py-2.5 font-mono-numbers text-slate-600 font-medium">${sub.kode}</td>
          <td class="px-4 py-2.5 font-medium text-slate-800">${sub.nama}</td>
          <td class="px-4 py-2.5 text-slate-600">${opdObj.nama}</td>
          <td class="px-4 py-2.5 font-mono-numbers text-right">${SIMPAD_UTILS.formatRupiah(sub.target2026)}</td>
          <td class="px-4 py-2.5">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">Aktif</span>
          </td>
        </tr>
      `;
    });
  });

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

// Render Audit Log Table
function renderAuditTable() {
  const tbody = document.getElementById("table-audit-tbody");
  if (!tbody) return;

  let html = "";
  SIMPAD_DATA.jejakAudit.forEach(log => {
    html += `
      <tr class="hover:bg-slate-50 border-b border-slate-100 text-xs">
        <td class="px-4 py-3 font-mono-numbers text-slate-500">${log.waktu}</td>
        <td class="px-4 py-3">
          <div class="font-bold text-slate-800">${log.pengguna}</div>
          <div class="text-[11px] text-slate-500">${log.opd} • <span class="font-semibold text-primary">${log.role}</span></div>
        </td>
        <td class="px-4 py-3">
          <span class="px-2 py-0.5 rounded font-mono-numbers text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            ${log.aksi}
          </span>
        </td>
        <td class="px-4 py-3 font-medium text-slate-800">${log.entitas}</td>
        <td class="px-4 py-3 text-slate-600">
          <div class="text-red-700 line-through text-[11px]">${log.nilaiLama || '-'}</div>
          <div class="text-emerald-700 font-semibold">${log.nilaiBaru}</div>
        </td>
        <td class="px-4 py-3 font-mono-numbers text-slate-400 text-[11px]">${log.ipAddress}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Render Halaman Laporan Eksekutif (Siap Cetak / Print Ready)
function renderLaporanEksekutif() {
  const d = SIMPAD_DATA.tahunan["2026"];
  const targetEl = document.getElementById("rep-target-2026");
  const realisasiEl = document.getElementById("rep-realisasi-2026");
  const persenEl = document.getElementById("rep-persen-2026");
  const gapEl = document.getElementById("rep-gap-2026");

  if (targetEl) targetEl.textContent = SIMPAD_UTILS.formatRupiah(d.targetPAD);
  if (realisasiEl) realisasiEl.textContent = SIMPAD_UTILS.formatRupiah(d.realisasiPAD);
  if (persenEl) persenEl.textContent = SIMPAD_UTILS.formatPersen((d.realisasiPAD / d.targetPAD) * 100);
  if (gapEl) gapEl.textContent = SIMPAD_UTILS.formatRupiah(d.sisaTarget);

  // Rekapitulasi Komponen di Laporan
  const tableContainer = document.getElementById("rep-komponen-table");
  if (tableContainer) {
    let html = `
      <table class="w-full text-xs text-left border border-slate-300">
        <thead class="bg-slate-100 font-bold border-b border-slate-300">
          <tr>
            <th class="p-2 border-r border-slate-300">Komponen Pendapatan Asli Daerah</th>
            <th class="p-2 text-right border-r border-slate-300">Target APBD (Rp)</th>
            <th class="p-2 text-right border-r border-slate-300">Realisasi (Rp)</th>
            <th class="p-2 text-center border-r border-slate-300">Capaian (%)</th>
            <th class="p-2 text-center">Porsi (%)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
    `;

    d.komponen.forEach(k => {
      html += `
        <tr>
          <td class="p-2 font-medium border-r border-slate-300">${k.nama}</td>
          <td class="p-2 text-right font-mono-numbers border-r border-slate-300">${SIMPAD_UTILS.formatRupiah(k.target)}</td>
          <td class="p-2 text-right font-mono-numbers font-bold border-r border-slate-300">${SIMPAD_UTILS.formatRupiah(k.realisasi)}</td>
          <td class="p-2 text-center font-mono-numbers border-r border-slate-300">${k.persen.toFixed(2)}%</td>
          <td class="p-2 text-center font-mono-numbers">${k.porsiRealisasi.toFixed(2)}%</td>
        </tr>
      `;
    });

    html += `
        <tr class="bg-slate-100 font-bold border-t-2 border-slate-400">
          <td class="p-2 border-r border-slate-300">TOTAL PAD KAB. TULANG BAWANG</td>
          <td class="p-2 text-right font-mono-numbers border-r border-slate-300">${SIMPAD_UTILS.formatRupiah(d.targetPAD)}</td>
          <td class="p-2 text-right font-mono-numbers border-r border-slate-300">${SIMPAD_UTILS.formatRupiah(d.realisasiPAD)}</td>
          <td class="p-2 text-center font-mono-numbers border-r border-slate-300">32,81%</td>
          <td class="p-2 text-center font-mono-numbers">100,00%</td>
        </tr>
      </tbody>
    </table>`;
    tableContainer.innerHTML = html;
  }
}

// Render Analisis Kesenjangan & Proyeksi 2026
function renderKesenjanganAnalysis() {
  const d = SIMPAD_DATA.tahunan["2026"];
  const gapKebutuhanEl = document.getElementById("gap-kebutuhan-bulanan");
  const gapLajuEl = document.getElementById("gap-laju-berjalan");
  const gapRasioEl = document.getElementById("gap-rasio-percepatan");

  if (gapKebutuhanEl) gapKebutuhanEl.textContent = SIMPAD_UTILS.formatRupiah(d.kebutuhanPerBulan) + " / bln";
  if (gapLajuEl) gapLajuEl.textContent = SIMPAD_UTILS.formatRupiah(d.rataRataRealisasiPerBulan) + " / bln";
  if (gapRasioEl) gapRasioEl.textContent = d.rasioKesenjanganLaju.toFixed(1) + "x Lipat";
}

// 5. Modal & Workflow Handlers
function initModalListeners() {
  // Buka Modal Input Realisasi
  const btnOpenInput = document.getElementById("btn-open-input-modal");
  if (btnOpenInput) {
    btnOpenInput.addEventListener("click", function() {
      const modal = document.getElementById("modal-input-realisasi");
      if (modal) modal.classList.remove("hidden");
    });
  }

  // Buka Modal Impor Berkas
  const btnOpenImport = document.getElementById("btn-open-import-modal");
  if (btnOpenImport) {
    btnOpenImport.addEventListener("click", function() {
      const modal = document.getElementById("modal-import-berkas");
      if (modal) modal.classList.remove("hidden");
    });
  }

  // Tutup Modal Generic
  document.querySelectorAll(".btn-close-modal").forEach(btn => {
    btn.addEventListener("click", function() {
      const modal = this.closest(".modal-container");
      if (modal) modal.classList.add("hidden");
    });
  });
}

// Modal Verifikasi / Tolak Pengajuan
window.openModalVerifikasi = function(id, isApprove) {
  const item = SIMPAD_DATA.antreanPengajuan.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById("modal-verifikasi-action");
  if (!modal) return;

  document.getElementById("modal-verif-id").value = id;
  document.getElementById("modal-verif-is-approve").value = isApprove ? "1" : "0";
  document.getElementById("modal-verif-title").textContent = isApprove ? "Persetujuan & Verifikasi Dokumen" : "Penolakan & Pengembalian Dokumen";
  document.getElementById("modal-verif-doc-info").textContent = `${item.noBukti} — ${item.opdNama} (${SIMPAD_UTILS.formatRupiah(item.nominal)})`;
  
  const catatanField = document.getElementById("modal-verif-catatan");
  catatanField.value = isApprove ? "Dokumen setoran STS telah dicocokkan dengan rekening koran Kas Daerah Bank Lampung dan dinyatakan sah." : "";
  catatanField.placeholder = isApprove ? "Catatan verifikasi (opsional)..." : "Wajib mengisikan alasan penolakan dokumen...";

  modal.classList.remove("hidden");
};

// Eksekusi Verifikasi / Penolakan
function initFormListeners() {
  const formVerif = document.getElementById("form-verifikasi-action");
  if (formVerif) {
    formVerif.addEventListener("submit", function(e) {
      e.preventDefault();
      const id = document.getElementById("modal-verif-id").value;
      const isApprove = document.getElementById("modal-verif-is-approve").value === "1";
      const catatan = document.getElementById("modal-verif-catatan").value;

      const item = SIMPAD_DATA.antreanPengajuan.find(i => i.id === id);
      if (!item) return;

      if (!isApprove && !catatan.trim()) {
        alert("Alasan penolakan wajib diisi!");
        return;
      }

      const statusLama = item.status;
      if (isApprove) {
        item.status = "Terverifikasi";
        item.diverifikasiOleh = window.CURRENT_USER.nama;
        item.tanggalVerifikasi = new Date().toISOString().slice(0, 10);
        SIMPAD_UTILS.catatAudit("VERIFIKASI_DOKUMEN", `${item.akunNama} (${item.noBukti})`, statusLama, `Terverifikasi (${SIMPAD_UTILS.formatRupiah(item.nominal)})`);
        SIMPAD_UTILS.showToast("Berhasil Diverifikasi", `Dokumen ${item.noBukti} berhasil disetujui dan angka masuk ke realisasi.`, "success");
      } else {
        item.status = "Ditolak";
        item.alasanPenolakan = catatan;
        SIMPAD_UTILS.catatAudit("TOLAK_DOKUMEN", `${item.akunNama} (${item.noBukti})`, statusLama, `Ditolak (Catatan: ${catatan})`);
        SIMPAD_UTILS.showToast("Dokumen Dikembalikan", `Dokumen ${item.noBukti} dikembalikan ke OPD dengan catatan penolakan.`, "warning");
      }

      document.getElementById("modal-verifikasi-action").classList.add("hidden");
      renderAntreanVerifikasi();
    });
  }

  // Form Input Realisasi Baru OPD
  const formInputRealisasi = document.getElementById("form-input-realisasi");
  if (formInputRealisasi) {
    formInputRealisasi.addEventListener("submit", function(e) {
      e.preventDefault();
      const opdSelect = document.getElementById("input-opd");
      const akunSelect = document.getElementById("input-akun");
      const nominalInput = document.getElementById("input-nominal");
      const keteranganInput = document.getElementById("input-keterangan");
      const stsInput = document.getElementById("input-no-sts");

      const nominal = parseFloat(nominalInput.value.replace(/[^0-9]/g, ''));
      if (isNaN(nominal) || nominal <= 0) {
        alert("Nominal realisasi harus lebih dari 0!");
        return;
      }

      const opdObj = SIMPAD_DATA.opdList.find(o => o.id === opdSelect.value) || SIMPAD_DATA.opdList[0];
      const newEntry = {
        id: "REQ-2026-" + Math.floor(1000 + Math.random() * 9000),
        noBukti: stsInput.value || `STS/${opdObj.id}/2026/09/${Math.floor(100 + Math.random()*900)}`,
        tanggalPengajuan: new Date().toISOString().slice(0, 10),
        opdId: opdObj.id,
        opdNama: opdObj.nama,
        akunKode: akunSelect.value,
        akunNama: akunSelect.options[akunSelect.selectedIndex].text,
        periodeBulan: "September 2026",
        nominal: nominal,
        sumber: "Penyetoran Kasda Bank Lampung",
        status: "Menunggu Verifikasi",
        operator: window.CURRENT_USER.nama,
        keterangan: keteranganInput.value || "Setoran penerimaan pendapatan daerah baru.",
        lampiran: "STS_Upload_New.pdf"
      };

      SIMPAD_DATA.antreanPengajuan.unshift(newEntry);
      SIMPAD_UTILS.catatAudit("INPUT_REALISASI", `${newEntry.akunNama} (${newEntry.noBukti})`, "null", SIMPAD_UTILS.formatRupiah(nominal));
      SIMPAD_UTILS.showToast("Data Berhasil Diajukan", `Setoran ${newEntry.noBukti} sebesar ${SIMPAD_UTILS.formatRupiah(nominal)} masuk antrean verifikasi BPKAD.`, "success");

      document.getElementById("modal-input-realisasi").classList.add("hidden");
      formInputRealisasi.reset();
      renderAntreanVerifikasi();
    });
  }

  // Simulasi Impor CSV
  const btnProcessImport = document.getElementById("btn-process-import");
  if (btnProcessImport) {
    btnProcessImport.addEventListener("click", function() {
      SIMPAD_UTILS.showToast("Impor Berhasil", "3 baris data berhasil divalidasi dan diimpor ke draf verifikasi.", "success");
      SIMPAD_UTILS.catatAudit("IMPOR_BERKAS", "Berkas SIKD_TulangBawang_Agt2026.csv", "0 baris", "3 baris berhasil diproses");
      document.getElementById("modal-import-berkas").classList.add("hidden");
    });
  }
}

// Lihat Detail Pengajuan
window.lihatDetailVerifikasi = function(id) {
  const item = SIMPAD_DATA.antreanPengajuan.find(i => i.id === id);
  if (!item) return;

  alert(`DETAIL PENGAJUAN:\n\nNomor Bukti: ${item.noBukti}\nOPD: ${item.opdNama}\nAkun: ${item.akunNama} (${item.akunKode})\nNominal: ${SIMPAD_UTILS.formatRupiah(item.nominal)}\nStatus: ${item.status}\nOperator: ${item.operator}\nKeterangan: ${item.keterangan}\n${item.alasanPenolakan ? 'Alasan Penolakan: ' + item.alasanPenolakan : ''}`);
};

// Buka Modal Tindak Lanjut Anomali
window.bukaModalTindakLanjutAnomali = function(anomaliId) {
  const anomali = SIMPAD_DATA.daftarKasusAnomali.find(a => a.id === anomaliId);
  if (!anomali) return;

  const catatan = prompt(`TINDAK LANJUT ANOMALI (${anomali.id})\n\nKasus: ${anomali.komponen} (${anomali.capaianPersen.toFixed(1)}%)\n\nMasukkan catatan verifikasi rekonsiliasi untuk menutup anomali ini:`, "Telah dilakukan rekonsiliasi bersama BPKAD dan OPD pengelola.");
  if (catatan && catatan.trim()) {
    anomali.status = "Selesai Diverifikasi";
    anomali.tindakLanjut = `Diverifikasi oleh ${window.CURRENT_USER.nama} pada ${new Date().toLocaleDateString('id-ID')}: ${catatan}`;
    SIMPAD_UTILS.catatAudit("RESOLVE_ANOMALI", `${anomali.id} (${anomali.akun})`, "Status: Terbuka", `Status: Selesai Diverifikasi (${catatan})`);
    SIMPAD_UTILS.showToast("Anomali Diselesaikan", `Kasus ${anomali.id} berhasil ditutup dan catatan audit telah disimpan.`, "success");
    renderKasusAnomali();
  }
};

// Cetak Laporan Eksekutif
window.cetakLaporanEksekutif = function() {
  window.print();
};

// Ekspor Tabel Aktif ke CSV
window.eksporDataCSV = function() {
  const d = SIMPAD_DATA.tahunan[window.CURRENT_YEAR];
  const rows = [
    ["SISTEM INFORMASI MONITORING PENDAPATAN ASLI DAERAH (SIMPAD)"],
    ["KABUPATEN TULANG BAWANG - PROVINSI LAMPUNG"],
    ["DATA SIMULASI MONITORING TARGET & REALISASI PAD"],
    [`Tahun Anggaran: ${window.CURRENT_YEAR}`, `Tanggal Posisi: ${SIMPAD_DATA.meta.tanggalPosisi}`],
    [],
    ["Kode Rekening", "Nama Akun / Komponen PAD", "OPD Pengelola", "Target APBD (Rp)", "Realisasi (Rp)", "Persentase Capaian (%)"]
  ];

  SIMPAD_DATA.akunHierarki.forEach(grp => {
    grp.subAkun.forEach(sub => {
      const opdObj = SIMPAD_DATA.opdList.find(o => o.id === sub.opdId) || { nama: "Multi-OPD" };
      const realisasiVal = (window.CURRENT_YEAR === "2026") ? sub.realisasi2026 : (sub.target2026 * (window.CURRENT_YEAR === "2024" ? 0.74 : 0.45));
      const persen = sub.target2026 > 0 ? ((realisasiVal / sub.target2026) * 100).toFixed(2) : "0,00";
      rows.push([sub.kode, sub.nama, opdObj.nama, sub.target2026, realisasiVal, persen + "%"]);
    });
  });

  SIMPAD_UTILS.exportToCSV(`SIMPAD_TulangBawang_${window.CURRENT_YEAR}`, rows);
  SIMPAD_UTILS.showToast("Ekspor Selesai", `Data realisasi PAD TA ${window.CURRENT_YEAR} telah diunduh dalam format CSV.`, "success");
};
