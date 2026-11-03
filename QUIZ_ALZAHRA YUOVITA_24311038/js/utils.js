/**
 * SIMPAD - Sistem Informasi Monitoring & Optimalisasi Pendapatan Asli Daerah
 * Kabupaten Tulang Bawang, Provinsi Lampung
 * 
 * Utility Functions & Helpers
 */

const SIMPAD_UTILS = {
  // Format angka ke format mata uang Rupiah standar
  formatRupiah: function(number, withPrefix = true) {
    if (number === null || number === undefined || isNaN(number)) return withPrefix ? "Rp 0" : "0";
    const rounded = Math.round(number);
    const formatted = new Intl.NumberFormat("id-ID").format(rounded);
    return withPrefix ? `Rp ${formatted}` : formatted;
  },

  // Format angka besar ke singkatan yang mudah dipindai (Miliar / Juta)
  formatRupiahSingkat: function(number, withPrefix = true) {
    if (number === null || number === undefined || isNaN(number)) return withPrefix ? "Rp 0" : "0";
    const abs = Math.abs(number);
    let str = "";
    if (abs >= 1_000_000_000_000) {
      str = (number / 1_000_000_000_000).toFixed(2).replace(".", ",") + " T";
    } else if (abs >= 1_000_000_000) {
      str = (number / 1_000_000_000).toFixed(2).replace(".", ",") + " M";
    } else if (abs >= 1_000_000) {
      str = (number / 1_000_000).toFixed(2).replace(".", ",") + " Jt";
    } else {
      str = new Intl.NumberFormat("id-ID").format(number);
    }
    return withPrefix ? `Rp ${str}` : str;
  },

  // Format persentase
  formatPersen: function(number, decimals = 2) {
    if (number === null || number === undefined || isNaN(number)) return "0,00%";
    return number.toFixed(decimals).replace(".", ",") + "%";
  },

  // Format tanggal Indonesia
  formatTanggal: function(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  },

  // Toast Notification System
  showToast: function(title, message, type = "success") {
    let container = document.getElementById("simpad-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "simpad-toast-container";
      container.className = "fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `pointer-events-auto flex items-start p-4 rounded-xl shadow-lg border transition-all duration-300 transform translate-y-2 opacity-0 max-w-md ${
      type === "success"
        ? "bg-white border-emerald-500 text-slate-800"
        : type === "error"
        ? "bg-white border-red-500 text-slate-800"
        : "bg-white border-amber-500 text-slate-800"
    }`;

    const icon = type === "success"
      ? '<span class="material-symbols-outlined text-emerald-600 mr-3 text-2xl">check_circle</span>'
      : type === "error"
      ? '<span class="material-symbols-outlined text-red-600 mr-3 text-2xl">error</span>'
      : '<span class="material-symbols-outlined text-amber-600 mr-3 text-2xl">warning</span>';

    toast.innerHTML = `
      ${icon}
      <div class="flex-1">
        <h4 class="font-bold text-sm text-slate-900">${title}</h4>
        <p class="text-xs text-slate-600 mt-0.5">${message}</p>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-700 ml-2">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
    }, 10);

    // Auto remove after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  },

  // Ekspor Tabel ke CSV
  exportToCSV: function(filename, rows) {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // with UTF-8 BOM
    rows.forEach(row => {
      const formattedRow = row.map(cell => {
        let text = (cell === null || cell === undefined) ? "" : String(cell);
        text = text.replace(/"/g, '""');
        return `"${text}"`;
      }).join(";"); // Indonesian Excel commonly uses semicolon
      csvContent += formattedRow + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Catat Audit Trail
  catatAudit: function(aksi, entitas, nilaiLama, nilaiBaru) {
    const user = window.CURRENT_USER || SIMPAD_DATA.users[1]; // default verifikator
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    const newLog = {
      id: "AUD-" + Math.floor(1000 + Math.random() * 9000),
      waktu: timeStr,
      pengguna: user.nama,
      role: user.role,
      opd: user.instansi,
      aksi: aksi,
      entitas: entitas,
      nilaiLama: nilaiLama,
      nilaiBaru: nilaiBaru,
      ipAddress: "192.168.10." + Math.floor(10 + Math.random() * 80)
    };

    SIMPAD_DATA.jejakAudit.unshift(newLog);
    if (window.renderAuditTable) {
      window.renderAuditTable();
    }
  }
};

window.SIMPAD_UTILS = SIMPAD_UTILS;
