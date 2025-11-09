import { prisma } from "@/lib/prisma";

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
      prisma.user.count(),

      prisma.masukanWarga.count({
        where: { status: "MENUNGGU_VERIFIKASI" },
      }),

      prisma.masukanWarga.count({
        where: { status: "DITERIMA" },
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
          where: { verifiedByUserId: { not: null } },
          select: {
            id: true,
            updatedAt: true,
            verifiedBy: { select: { name: true } },
          },
        }),
        prisma.rekomendasi.findMany({
          take: 3,
          orderBy: { tanggalProses: "desc" },
          select: {
            id: true,
            tanggalProses: true,
            processedBy: { select: { name: true } },
          },
        }),
        prisma.dataMaster.findMany({
          take: 3,
          orderBy: { updatedAt: "desc" },
          select: {
            id: true,
            namaAtribut: true,
            updatedBy: { select: { name: true } },
            updatedAt: true,
          },
        }),
        prisma.user.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, createdAt: true },
        }),
      ]);

    const activities = [
      ...verifikasi.map((v) => ({
        title: `Verifikasi masukan warga oleh ${v.verifiedBy?.name || "Anonim"}`,
        time: v.updatedAt,
      })),
      ...rekomendasi.map((r) => ({
        title: `Rekomendasi baru diproses oleh ${r.processedBy?.name || "Admin"}`,
        time: r.tanggalProses,
      })),
      ...dataMaster.map((d) => ({
        title: `Data master "${d.namaAtribut}" diperbarui oleh ${d.updatedBy?.name}`,
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
        prisma.masukanWarga.count({ where: { status: "DITERIMA" } }),
        prisma.masukanWarga.count({ where: { status: "DITOLAK" } }),
        prisma.masukanWarga.count({ where: { status: "MENUNGGU_VERIFIKASI" } }),
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

      if (m.status === "MENUNGGU_VERIFIKASI") monthData.waiting++;
      if (m.status === "DITERIMA") monthData.accepted++;
      if (m.status === "DITOLAK") monthData.rejected++;
    });

    return months;
  },

  getDataMasterStats: async () => {
    const masterCategory = await prisma.dataMaster.groupBy({
      by: ["jenisData"], // hanya field yang ada di model
      _count: { id: true },
    });

    return masterCategory.map((c) => ({
      name: c.jenisData,
      value: c._count?.id ?? 0, // fallback 0 kalau undefined
    }));
  },
  //   getDashboardCharts: async () => {
  //     // Ambil semua data masukan
  //     const masukan = await prisma.masukanWarga.findMany({
  //       select: { createdAt: true, status: true },
  //     });

  //     // Buat array bulan kosong
  //     const months = [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ];

  //     const monthlyData = months.map((month) => ({
  //       month,
  //       waiting: 0,
  //       accepted: 0,
  //       rejected: 0,
  //     }));

  //     // Kelompokkan per bulan
  //     masukan.forEach((m) => {
  //       const date = new Date(m.createdAt);
  //       const idx = date.getMonth();
  //       if (m.status === "MENUNGGU_VERIFIKASI") monthlyData[idx].waiting++;
  //       if (m.status === "DITERIMA") monthlyData[idx].accepted++;
  //       if (m.status === "DITOLAK") monthlyData[idx].rejected++;
  //     });

  //     // Kategorisasi Data Master
  //     const masterCategory = await prisma.dataMaster.groupBy({
  //       by: ["kategori"],
  //       _count: { id: true },
  //     });

  //     const dataMasterCategory = masterCategory.map((c) => ({
  //       name: c.kategori,
  //       value: c._count.id,
  //     }));

  //     return {
  //       monthlyData,
  //       dataMasterCategory,
  //     };
  //   },
};
