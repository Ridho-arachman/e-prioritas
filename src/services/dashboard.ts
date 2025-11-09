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
};
