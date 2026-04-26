import prisma from "@/lib/prisma";

export const dashboardService = {
  getDashboardStats: async () => {
    const [
      totalUsers,
      masukanWaiting,
      masukanAccepted,
      masukanRejected,
      masukanOnProcess,
      masukanCompleted,
      dataMasterCount,
      kegiatanCount,
      totalWarga, // total seluruh warga
      wargaTerverifikasi, // warga dengan status no hp terverifikasi
    ] = await Promise.all([
      prisma.user.count({
        where: { role: { not: "ADMIN" } },
      }),

      prisma.masukanWarga.count({ where: { status: "MENUNGGU" } }),
      prisma.masukanWarga.count({ where: { status: "DIVERIFIKASI" } }),
      prisma.masukanWarga.count({ where: { status: "DITOLAK" } }),
      prisma.masukanWarga.count({ where: { status: "DIPROSES" } }),
      prisma.masukanWarga.count({ where: { status: "DISELESAIKAN" } }),

      prisma.dataMaster.count(),
      prisma.kegiatanRapat.count(),

      // Total warga di database
      prisma.warga.count(),

      // Warga dengan status no hp TERVERIFIKASI
      prisma.warga.count({
        where: { statusNoHp: "TERVERIFIKASI" },
      }),
    ]);

    return {
      totalUsers,
      masukanWaiting,
      masukanAccepted,
      masukanRejected,
      masukanOnProcess,
      masukanCompleted,
      dataMasterCount,
      kegiatanCount,
      totalWarga, // tambahan
      wargaTerverifikasi, // tambahan
    };
  },

  getRecentActivities: async () => {
    const [verifikasi, kegiatanRapat, dataMaster, penggunaBaru] =
      await Promise.all([
        prisma.masukanWarga.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          where: { diverifikasiOlehId: { not: null } },
          select: {
            id: true,
            updatedAt: true,
            diverifikasiOleh: {
              select: {
                name: true,
                jabatan: true, // ⬅️ tambah jabatan
              },
            },
          },
        }),
        prisma.kegiatanRapat.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            diprosesOleh: {
              select: {
                name: true,
                jabatan: true, // ⬅️ tambah
              },
            },
          },
        }),
        prisma.dataMaster.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          select: {
            id: true,
            namaAtribut: true,
            updatedAt: true,
            diprosesOleh: {
              select: {
                name: true,
                jabatan: true, // ⬅️ tambah
              },
            },
          },
        }),
        prisma.user.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            jabatan: true, // ⬅️ tambah
            createdAt: true,
          },
        }),
      ]);

    const activities = [
      ...verifikasi.map((v) => ({
        title: `Verifikasi masukan warga oleh ${
          v.diverifikasiOleh
            ? `${v.diverifikasiOleh.name}${v.diverifikasiOleh.jabatan ? ` (${v.diverifikasiOleh.jabatan})` : ""}`
            : "Anonim"
        }`,
        time: v.updatedAt,
      })),
      ...kegiatanRapat.map((r) => ({
        title: `Kegiatan rapat baru diproses oleh ${
          r.diprosesOleh
            ? `${r.diprosesOleh.name}${r.diprosesOleh.jabatan ? ` (${r.diprosesOleh.jabatan})` : ""}`
            : "Admin"
        }`,
        time: r.createdAt,
      })),
      ...dataMaster.map((d) => ({
        title: `Data master "${d.namaAtribut}" diperbarui oleh ${
          d.diprosesOleh
            ? `${d.diprosesOleh.name}${d.diprosesOleh.jabatan ? ` (${d.diprosesOleh.jabatan})` : ""}`
            : "Admin"
        }`,
        time: d.updatedAt,
      })),
      ...penggunaBaru.map((u) => ({
        title: `Pengguna baru "${u.name}"${u.jabatan ? ` (${u.jabatan})` : ""} mendaftar akun perangkat desa`,
        time: u.createdAt,
      })),
    ];

    return activities
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 6);
  },

  getActivityStats: async () => {
    const [
      masukanAccepted,
      masukanRejected,
      masukanWaiting,
      masukanDiproses,
      masukanDiselesaikan,
    ] = await Promise.all([
      prisma.masukanWarga.count({ where: { status: "DIVERIFIKASI" } }),
      prisma.masukanWarga.count({ where: { status: "DITOLAK" } }),
      prisma.masukanWarga.count({ where: { status: "MENUNGGU" } }),
      prisma.masukanWarga.count({ where: { status: "DIPROSES" } }),
      prisma.masukanWarga.count({ where: { status: "DISELESAIKAN" } }),
    ]);

    return {
      masukanAccepted,
      masukanRejected,
      masukanWaiting,
      masukanDiproses,
      masukanDiselesaikan,
    };
  },

  getMonthlyMasukanStats: async () => {
    // Ambil semua masukan warga dari 12 bulan terakhir
    const now = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(now.getMonth() - 11);

    const masukan = await prisma.masukanWarga.findMany({
      where: { createdAt: { gte: twelveMonthsAgo } },
      select: { createdAt: true, status: true },
    });

    // Buat array 12 bulan
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(twelveMonthsAgo);
      d.setMonth(d.getMonth() + i);
      return {
        month: d.toLocaleString("id-ID", { month: "short" }),
        waiting: 0,
        accepted: 0,
        rejected: 0,
        onProcess: 0,
        completed: 0,
      };
    });

    masukan.forEach((m) => {
      const monthName = m.createdAt.toLocaleString("id-ID", { month: "short" });
      const monthData = months.find((x) => x.month === monthName);
      if (!monthData) return;

      if (m.status === "MENUNGGU") monthData.waiting++;
      if (m.status === "DIVERIFIKASI") monthData.accepted++;
      if (m.status === "DITOLAK") monthData.rejected++;
      if (m.status === "DIPROSES") monthData.onProcess++;
      if (m.status === "DISELESAIKAN") monthData.completed++;
    });

    return months;
  },

  getDataMasterStats: async () => {
    // 1. Hitung jumlah data per domainIsuId
    const stats = await prisma.dataMaster.groupBy({
      by: ["domainIsuId"],
      _count: { id: true },
    });

    // 2. Ambil semua domain yang muncul di hasil statistik
    const domainIds = stats.map((s) => s.domainIsuId);
    const domains = await prisma.domainIsu.findMany({
      where: { id: { in: domainIds } },
      select: { id: true, nama: true }, // atau gunakan 'code' jika lebih cocok
    });

    // 3. Buat mapping dari id ke nama
    const domainMap = Object.fromEntries(domains.map((d) => [d.id, d.nama]));

    // 4. Gabungkan hasilnya
    return stats.map((s) => ({
      name: domainMap[s.domainIsuId] || s.domainIsuId, // fallback ke ID jika nama tidak ditemukan (seharusnya tidak terjadi)
      value: s._count.id,
    }));
  },

  getMasukanPerDomain: async () => {
    // Hitung jumlah masukan per domain isu
    const stats = await prisma.masukanWarga.groupBy({
      by: ["domainIsuId"],
      _count: { id: true },
    });

    // Ambil semua domain yang muncul
    const domainIds = stats.map((s) => s.domainIsuId);
    const domains = await prisma.domainIsu.findMany({
      where: { id: { in: domainIds } },
      select: { id: true, nama: true },
    });

    const domainMap = Object.fromEntries(domains.map((d) => [d.id, d.nama]));

    return stats.map((s) => ({
      name: domainMap[s.domainIsuId] || "Domain Tidak Diketahui",
      value: s._count.id,
    }));
  },

  getDataMasterKritikalitas: async () => {
    // Hitung jumlah data master per kritikalitas
    const stats = await prisma.dataMaster.groupBy({
      by: ["kritikalitas"],
      _count: { id: true },
    });

    // Mapping enum ke label yang lebih ramah
    const labelMap: Record<string, string> = {
      KRITIS: "Kritis",
      TINGGI: "Tinggi",
      SEDANG: "Sedang",
      RENDAH: "Rendah",
    };

    return stats.map((s) => ({
      name: labelMap[s.kritikalitas] || s.kritikalitas,
      value: s._count.id,
    }));
  },

  getRekomendasiStatus: async () => {
    // Hitung jumlah rekomendasi (kegiatan rapat) per status
    const stats = await prisma.kegiatanRapat.groupBy({
      by: ["statusRekomendasi"],
      _count: { id: true },
    });

    const labelMap: Record<string, string> = {
      DRAFT: "Draft",
      DIAJUKAN: "Diajukan",
      DISETUJUI: "Disetujui",
      DITOLAK: "Ditolak",
    };

    return stats.map((s) => ({
      name: labelMap[s.statusRekomendasi] || s.statusRekomendasi,
      value: s._count.id,
    }));
  },
};
