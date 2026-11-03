/**
 * SIMPAD - Sistem Informasi Monitoring & Optimalisasi Pendapatan Asli Daerah
 * Kabupaten Tulang Bawang, Provinsi Lampung
 * 
 * Chart.js Visualizations Module
 */

const SIMPAD_CHARTS = {
  instances: {},

  // Inisialisasi atau update grafik tren bulanan
  renderTrenBulanan: function(tahunKey = "2026") {
    const ctx = document.getElementById("chart-tren-bulanan");
    if (!ctx) return;

    if (this.instances["trenBulanan"]) {
      this.instances["trenBulanan"].destroy();
    }

    const dataTahun = SIMPAD_DATA.tahunan[tahunKey];
    if (!dataTahun || !dataTahun.bulanan) return;

    const labels = dataTahun.bulanan.map(b => b.bulan);
    const dataKumulatif = dataTahun.bulanan.map(b => b.kumulatif ? b.kumulatif / 1_000_000_000 : null);
    const dataBulanan = dataTahun.bulanan.map(b => b.realisasiBulanan ? b.realisasiBulanan / 1_000_000_000 : null);
    
    // Proyeksi jika 2026
    let datasetProyeksi = null;
    let datasetKebutuhan = null;
    if (tahunKey === "2026") {
      datasetProyeksi = dataTahun.bulanan.map((b, i) => {
        if (i === 7) return b.kumulatif / 1_000_000_000; // bridge from August
        return b.proyeksiRataRata ? b.proyeksiRataRata / 1_000_000_000 : null;
      });

      datasetKebutuhan = dataTahun.bulanan.map((b, i) => {
        if (i === 7) return b.kumulatif / 1_000_000_000;
        return b.kebutuhanTarget ? b.kebutuhanTarget / 1_000_000_000 : null;
      });
    }

    const datasets = [
      {
        type: "bar",
        label: "Realisasi Bulanan (Miliar Rp)",
        data: dataBulanan,
        backgroundColor: "rgba(15, 37, 87, 0.75)",
        borderColor: "#0F2557",
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: "yBulanan",
        order: 2
      },
      {
        type: "line",
        label: "Realisasi Kumulatif Aktual (Miliar Rp)",
        data: dataKumulatif,
        borderColor: "#006D30",
        backgroundColor: "rgba(0, 109, 48, 0.08)",
        borderWidth: 3,
        pointBackgroundColor: "#006D30",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.25,
        yAxisID: "yKumulatif",
        order: 1
      }
    ];

    if (datasetProyeksi) {
      datasets.push({
        type: "line",
        label: "Proyeksi Laju Berjalan (Sep-Des)",
        data: datasetProyeksi,
        borderColor: "#D97706",
        borderDash: [5, 5],
        borderWidth: 2.5,
        pointBackgroundColor: "#D97706",
        pointRadius: 4,
        fill: false,
        tension: 0.2,
        yAxisID: "yKumulatif",
        order: 3
      });

      datasets.push({
        type: "line",
        label: "Trayektori Capai Target Rp 200,35 M",
        data: datasetKebutuhan,
        borderColor: "#BA1A1A",
        borderDash: [3, 3],
        borderWidth: 2,
        pointBackgroundColor: "#BA1A1A",
        pointRadius: 3,
        fill: false,
        tension: 0.1,
        yAxisID: "yKumulatif",
        order: 4
      });
    }

    this.instances["trenBulanan"] = new Chart(ctx, {
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 14,
              font: { family: "Plus Jakarta Sans", size: 12, weight: 600 },
              color: "#0B1C30"
            }
          },
          tooltip: {
            backgroundColor: "#001038",
            titleFont: { family: "Plus Jakarta Sans", size: 13, weight: 700 },
            bodyFont: { family: "JetBrains Mono", size: 12 },
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: function(context) {
                const val = context.raw;
                if (val === null || val === undefined) return null;
                return `${context.dataset.label}: Rp ${val.toFixed(2).replace(".", ",")} Miliar`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 },
              color: "#44464F"
            }
          },
          yKumulatif: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Kumulatif (Miliar Rp)",
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 },
              color: "#006D30"
            },
            ticks: {
              font: { family: "JetBrains Mono", size: 11 },
              callback: function(v) { return v + " M"; }
            },
            grid: { color: "#EFF4FF" }
          },
          yBulanan: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Bulanan (Miliar Rp)",
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 },
              color: "#0F2557"
            },
            grid: { display: false },
            ticks: {
              font: { family: "JetBrains Mono", size: 11 },
              callback: function(v) { return v + " M"; }
            }
          }
        }
      }
    });
  },

  // Inisialisasi atau update grafik donat komposisi PAD
  renderKomposisi: function(tahunKey = "2026") {
    const ctx = document.getElementById("chart-komposisi-pad");
    if (!ctx) return;

    if (this.instances["komposisi"]) {
      this.instances["komposisi"].destroy();
    }

    const dataTahun = SIMPAD_DATA.tahunan[tahunKey];
    if (!dataTahun || !dataTahun.komponen) return;

    const labels = dataTahun.komponen.map(k => k.nama);
    const dataValues = dataTahun.komponen.map(k => k.realisasi / 1_000_000_000);
    const colors = [
      "#0F2557", // Lain-lain PAD yang Sah / Navy Sekunder
      "#006D30", // Pajak Daerah / Emerald
      "#D97706", // Retribusi Daerah / Amber
      "#757680"  // Hasil Kekayaan Dipisahkan / Slate
    ];

    this.instances["komposisi"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: colors,
          borderColor: "#FFFFFF",
          borderWidth: 2,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 12,
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 },
              color: "#0B1C30"
            }
          },
          tooltip: {
            backgroundColor: "#001038",
            titleFont: { family: "Plus Jakarta Sans", size: 12, weight: 700 },
            bodyFont: { family: "JetBrains Mono", size: 12 },
            callbacks: {
              label: function(context) {
                const val = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = total > 0 ? ((val / total) * 100).toFixed(1).replace(".", ",") + "%" : "0%";
                return ` ${context.label}: Rp ${val.toFixed(2).replace(".", ",")} M (${percent})`;
              }
            }
          }
        },
        cutout: "68%"
      }
    });
  },

  // Inisialisasi Grafik Multi-Tahun (2024 - 2026)
  renderMultiTahun: function() {
    const ctx = document.getElementById("chart-multi-tahun");
    if (!ctx) return;

    if (this.instances["multiTahun"]) {
      this.instances["multiTahun"].destroy();
    }

    const labels = ["TA 2024 (Final)", "TA 2025 (Sementara)", "TA 2026 (s.d. Agt)"];
    const targetValues = [
      SIMPAD_DATA.tahunan["2024"].targetPAD / 1_000_000_000,
      SIMPAD_DATA.tahunan["2025"].targetPAD / 1_000_000_000,
      SIMPAD_DATA.tahunan["2026"].targetPAD / 1_000_000_000
    ];
    const realisasiValues = [
      SIMPAD_DATA.tahunan["2024"].realisasiPAD / 1_000_000_000,
      SIMPAD_DATA.tahunan["2025"].realisasiPAD / 1_000_000_000,
      SIMPAD_DATA.tahunan["2026"].realisasiPAD / 1_000_000_000
    ];
    const persenCapaian = [74.56, 45.36, 32.81];

    this.instances["multiTahun"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Target APBD (Miliar Rp)",
            data: targetValues,
            backgroundColor: "#0F2557",
            borderRadius: 6,
            barPercentage: 0.65
          },
          {
            label: "Realisasi PAD (Miliar Rp)",
            data: realisasiValues,
            backgroundColor: "#006D30",
            borderRadius: 6,
            barPercentage: 0.65
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 12,
              font: { family: "Plus Jakarta Sans", size: 12, weight: 600 }
            }
          },
          tooltip: {
            backgroundColor: "#001038",
            bodyFont: { family: "JetBrains Mono", size: 12 },
            callbacks: {
              afterLabel: function(context) {
                if (context.datasetIndex === 1) {
                  return `Capaian: ${persenCapaian[context.dataIndex]}%`;
                }
                return "";
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Miliar Rupiah",
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 }
            },
            ticks: {
              font: { family: "JetBrains Mono", size: 11 },
              callback: function(v) { return "Rp " + v + " M"; }
            },
            grid: { color: "#EFF4FF" }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: "Plus Jakarta Sans", size: 11, weight: 600 } }
          }
        }
      }
    });
  },

  // Inisialisasi Grafik Simulasi Proyeksi & Kesenjangan 2026
  renderProyeksiKesenjangan: function() {
    const ctx = document.getElementById("chart-simulasi-proyeksi");
    if (!ctx) return;

    if (this.instances["proyeksiKesenjangan"]) {
      this.instances["proyeksiKesenjangan"].destroy();
    }

    const labels = ["Target APBD 2026", "Realisasi Jan-Agt", "Proyeksi Rata-rata Berjalan", "Proyeksi Optimis Musiman", "Kebutuhan Sisa (Sep-Des)"];
    const values = [200.35, 65.73, 98.60, 118.50, 134.62];
    const bgColors = ["#001038", "#006D30", "#D97706", "#2563EB", "#BA1A1A"];

    this.instances["proyeksiKesenjangan"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: bgColors,
          borderRadius: 6,
          barThickness: 38
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#001038",
            bodyFont: { family: "JetBrains Mono", size: 12 },
            callbacks: {
              label: function(ctx) {
                return ` Nilai: Rp ${ctx.raw.toFixed(2).replace(".", ",")} Miliar`;
              }
            }
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Miliar Rupiah (Rp)",
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 }
            },
            ticks: {
              font: { family: "JetBrains Mono", size: 11 },
              callback: function(v) { return v + " M"; }
            },
            grid: { color: "#EFF4FF" }
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "Plus Jakarta Sans", size: 11, weight: 600 },
              autoSkip: false,
              maxRotation: 20
            }
          }
        }
      }
    });
  }
};

window.SIMPAD_CHARTS = SIMPAD_CHARTS;
