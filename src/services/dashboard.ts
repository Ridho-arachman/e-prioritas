import prisma from "@/lib/prisma";

export const dashboardService = {
  getDashboardStats: async () => {
    const [
      totalUsers,
      masukanWaiting,
      masukanAccepted,
      masukanRejected,
      dataMasterCount,
      rekomendasiCount,
    ] = await Promise.all([
      prisma.user.count({
        where: { role: { not: "ADMIN" } },
      }),

      prisma.masukanWarga.count({
        where: { status: "MENUNGGU" },
      }),

      prisma.masukanWarga.count({
        where: { status: "DIVERIFIKASI" },
      }),

      prisma.masukanWarga.count({
        where: { status: "DITOLAK" },
      }),

      prisma.dataMaster.count(),

      prisma.rekomendasi.count(),
    ]);

    return {
      totalUsers,
      masukanWaiting,
      masukanAccepted,
      masukanRejected,
      dataMasterCount,
      rekomendasiCount,
    };
  },

  getRecentActivities: async () => {
    const [verifikasi, rekomendasi, dataMaster, penggunaBaru] =
      await Promise.all([
        prisma.masukanWarga.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          where: { diverifikasiOlehId: { not: null } },
          select: {
            id: true,
            updatedAt: true,
            diverifikasiOleh: { select: { name: true } },
          },
        }),
        prisma.rekomendasi.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            diprosesOleh: { select: { name: true } },
          },
        }),
        prisma.dataMaster.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          select: {
            id: true,
            namaAtribut: true,
            diprosesOleh: { select: { name: true } },
            updatedAt: true,
          },
        }),
        prisma.user.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, createdAt: true },
        }),
      ]);

    console.log(dataMaster);

    const activities = [
      ...verifikasi.map((v) => ({
        title: `Verifikasi masukan warga oleh ${v.diverifikasiOleh?.name || "Anonim"}`,
        time: v.updatedAt,
      })),
      ...rekomendasi.map((r) => ({
        title: `Rekomendasi baru diproses oleh ${r.diprosesOleh?.name || "Admin"}`,
        time: r.createdAt,
      })),
      ...dataMaster.map((d) => ({
        title: `Data master "${d.namaAtribut}" diperbarui oleh ${d.diprosesOleh?.name}`,
        time: d.updatedAt,
      })),
      ...penggunaBaru.map((u) => ({
        title: `Pengguna baru "${u.name}" mendaftar akun perangkat desa`,
        time: u.createdAt,
      })),
    ];

    // urutkan dari terbaru
    return activities
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 6);
  },

  getActivityStats: async () => {
    const [masukanAccepted, masukanRejected, masukanWaiting] =
      await Promise.all([
        prisma.masukanWarga.count({ where: { status: "DIVERIFIKASI" } }),
        prisma.masukanWarga.count({ where: { status: "DITOLAK" } }),
        prisma.masukanWarga.count({ where: { status: "MENUNGGU" } }),
      ]);

    return {
      masukanAccepted,
      masukanRejected,
      masukanWaiting,
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
      };
    });

    masukan.forEach((m) => {
      const monthName = m.createdAt.toLocaleString("id-ID", { month: "short" });
      const monthData = months.find((x) => x.month === monthName);
      if (!monthData) return;

      if (m.status === "MENUNGGU") monthData.waiting++;
      if (m.status === "DIVERIFIKASI") monthData.accepted++;
      if (m.status === "DITOLAK") monthData.rejected++;
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
};
