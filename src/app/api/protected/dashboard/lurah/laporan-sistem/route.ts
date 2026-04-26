// src/app/api/protected/lurah/laporan-sistem/route.ts
import { Role, StatusRekomendasi } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// ---------- Helper Functions ----------
const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const addHeader = (
  page: any,
  helvetica: any,
  helveticaBold: any,
  pageNumber?: number,
  totalPages?: number,
) => {
  const { width, height } = page.getSize();
  const margin = 50;
  page.drawLine({
    start: { x: margin, y: height - margin + 10 },
    end: { x: width - margin, y: height - margin + 10 },
    thickness: 1.5,
    color: rgb(0.2, 0.4, 0.8),
  });
  page.drawText("KELURAHAN PANGGUNGJATI", {
    x: margin,
    y: height - margin,
    size: 14,
    font: helveticaBold,
    color: rgb(0.2, 0.4, 0.8),
  });
  if (pageNumber && totalPages) {
    page.drawText(`Halaman ${pageNumber} dari ${totalPages}`, {
      x: width - margin - 80,
      y: height - margin - 80,
      size: 9,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5),
    });
  }
};

const addFooter = (page: any, helvetica: any, date: Date) => {
  const { width, height } = page.getSize();
  const margin = 50;
  const y = margin - 10;
  page.drawLine({
    start: { x: margin, y: y + 5 },
    end: { x: width - margin, y: y + 5 },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });
  page.drawText(`Dicetak: ${date.toLocaleDateString("id-ID")}`, {
    x: margin,
    y,
    size: 8,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });
  page.drawText("© Kelurahan Panggungjati - Sistem Prioritas Pembangunan", {
    x: width - margin - 200,
    y,
    size: 8,
    font: helvetica,
    color: rgb(0.5, 0.5, 0.5),
  });
};

const wrapText = (
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number,
): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);
    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length === 0) lines.push(text);
  return lines;
};

const drawTable = (
  page: any,
  helvetica: any,
  helveticaBold: any,
  x: number,
  y: number,
  headers: string[],
  rows: any[],
  colWidths: number[],
  startY: number,
) => {
  let currentY = y;
  const headerHeight = 24;
  const baseFontSize = 8;
  const lineHeight = 1.4;
  const rowHeightBase = baseFontSize * lineHeight;

  const getRowHeight = (row: any[]) => {
    let maxLines = 1;
    for (let i = 0; i < row.length; i++) {
      const cellText = String(row[i] ?? "");
      const maxWidth = colWidths[i] - 10;
      const wrapped = wrapText(cellText, helvetica, baseFontSize, maxWidth);
      maxLines = Math.max(maxLines, wrapped.length);
    }
    return maxLines * rowHeightBase;
  };

  if (currentY - headerHeight < 60) {
    return { newY: currentY, pageBreak: true, drawnRows: 0 };
  }

  page.drawRectangle({
    x,
    y: currentY - headerHeight,
    width: colWidths.reduce((a, b) => a + b, 0),
    height: headerHeight,
    color: rgb(0.2, 0.4, 0.8),
  });

  let headerX = x;
  headers.forEach((header, i) => {
    page.drawText(header, {
      x: headerX + 5,
      y: currentY - headerHeight + 6,
      size: 9,
      font: helveticaBold,
      color: rgb(1, 1, 1),
    });
    headerX += colWidths[i];
  });

  currentY -= headerHeight;
  let drawn = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowHeight = getRowHeight(row);
    if (currentY - rowHeight < 60) {
      return { newY: currentY, pageBreak: true, drawnRows: i };
    }
    page.drawLine({
      start: { x, y: currentY },
      end: { x: x + colWidths.reduce((a, b) => a + b, 0), y: currentY },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });
    let rowX = x;
    for (let j = 0; j < row.length; j++) {
      const cellText = String(row[j] ?? "");
      const maxWidth = colWidths[j] - 10;
      const lines = wrapText(cellText, helvetica, baseFontSize, maxWidth);
      let lineY = currentY - 6;
      for (let k = lines.length - 1; k >= 0; k--) {
        page.drawText(lines[k], {
          x: rowX + 5,
          y: lineY,
          size: baseFontSize,
          font: helvetica,
          color: rgb(0, 0, 0),
        });
        lineY -= rowHeightBase;
      }
      rowX += colWidths[j];
    }
    currentY -= rowHeight;
    drawn++;
  }

  page.drawLine({
    start: { x, y: currentY },
    end: { x: x + colWidths.reduce((a, b) => a + b, 0), y: currentY },
    thickness: 0.5,
    color: rgb(0.8, 0.8, 0.8),
  });

  return { newY: currentY, pageBreak: false, drawnRows: drawn };
};

const getYearRange = (
  startDate?: string,
  endDate?: string,
): { startYear?: number; endYear?: number } => {
  const startYear = startDate ? new Date(startDate).getFullYear() : undefined;
  const endYear = endDate ? new Date(endDate).getFullYear() : undefined;
  return { startYear, endYear };
};

// ---------- MAIN GET HANDLER ----------
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
  const allowedRoles: Role[] = ["LURAH", "ADMIN"];
  if (!allowedRoles.includes(session.user.role as Role)) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 },
    );
  }

  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const where: any = {};
  if (startDate) where.createdAt = { gte: new Date(startDate) };
  if (endDate) where.createdAt = { ...where.createdAt, lte: new Date(endDate) };

  const { startYear, endYear } = getYearRange(
    startDate ?? undefined,
    endDate ?? undefined,
  );

  const dataMasterWhere: any = { isActive: true };
  if (startYear !== undefined && endYear !== undefined) {
    dataMasterWhere.tahunData = { gte: startYear, lte: endYear };
  } else if (startYear !== undefined) {
    dataMasterWhere.tahunData = { gte: startYear };
  } else if (endYear !== undefined) {
    dataMasterWhere.tahunData = { lte: endYear };
  }

  try {
    // Ambil 5 masukan terbaru dengan judul
    const masukanTerbaru = await prisma.masukanWarga.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        judul: true,
        status: true,
        createdAt: true,
      },
    });

    const [
      masukanStats,
      kegiatanStats,
      dataMasterList,
      masukanPerDomainRaw,
      kegiatanTerbaru,
      kegiatanDisetujui,
    ] = await Promise.all([
      prisma.masukanWarga.groupBy({ by: ["status"], where, _count: true }),
      prisma.kegiatanRapat.groupBy({
        by: ["statusRekomendasi"],
        where,
        _count: true,
      }),
      prisma.dataMaster.findMany({
        where: dataMasterWhere,
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          namaAtribut: true,
          kritikalitas: true,
          jumlah: true,
          tahunData: true,
        },
      }),
      prisma.masukanWarga.groupBy({
        by: ["domainIsuId"],
        where,
        _count: true,
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),
      prisma.kegiatanRapat.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          judul: true,
          tanggal: true,
          statusRekomendasi: true,
          domainIsu: { select: { nama: true } },
        },
      }),
      prisma.kegiatanRapat.findMany({
        where: { ...where, statusRekomendasi: StatusRekomendasi.DISETUJUI },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { domainIsu: { select: { nama: true } } },
      }),
    ]);

    // --- Data Warga ---
    const totalWarga = await prisma.warga.count();
    const wargaTerverifikasi = await prisma.warga.count({
      where: { statusNoHp: "TERVERIFIKASI" },
    });
    const wargaBelumTerverifikasi = totalWarga - wargaTerverifikasi;

    const domainIds = masukanPerDomainRaw.map((m) => m.domainIsuId);
    const domains = await prisma.domainIsu.findMany({
      where: { id: { in: domainIds } },
      select: { id: true, nama: true },
    });
    const masukanPerDomain = masukanPerDomainRaw.map((m) => ({
      nama:
        domains.find((d) => d.id === m.domainIsuId)?.nama || "Tidak diketahui",
      jumlah: m._count,
    }));

    const prioritasList: any[] = [];
    for (const k of kegiatanDisetujui) {
      if (k.rekomendasiItems) {
        try {
          const parsed = k.rekomendasiItems as any;
          if (parsed.prioritas) {
            for (const p of parsed.prioritas) {
              prioritasList.push({
                kegiatan: k.judul,
                deskripsi: p.deskripsi,
                skor: p.skorPrioritas,
                domain: k.domainIsu?.nama,
              });
            }
          }
        } catch {}
      }
    }

    // ===================== PDF GENERATION =====================
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const margin = 50;
    let y = height - margin - 60;
    const currentDate = new Date();

    // Cover
    const coverY = height - margin - 20;
    const title =
      "LAPORAN SISTEM PRIORITAS PEMBANTU KEPUTUSAN KEGIATAN KELURAHAN";
    const maxWidth = width - 2 * margin;
    const titleLines = wrapText(title, helveticaBold, 18, maxWidth);
    let currentY = coverY;
    for (let i = 0; i < titleLines.length; i++) {
      page.drawText(titleLines[i], {
        x: margin,
        y: currentY - i * 24,
        size: 18,
        font: helveticaBold,
        color: rgb(0.2, 0.4, 0.8),
      });
    }
    currentY = coverY - titleLines.length * 24;
    page.drawText(
      `Periode: ${startDate || "Awal"} - ${endDate || "Sekarang"}`,
      {
        x: margin,
        y: coverY - 48,
        size: 10,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3),
      },
    );
    page.drawText(`Tanggal Cetak: ${formatDate(currentDate)}`, {
      x: margin,
      y: coverY - 63,
      size: 10,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    });
    y = coverY - 90;

    const addSectionHeader = (title: string, startY: number) => {
      const headerHeight = 25;
      if (startY - headerHeight < 100) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        startY = y;
      }
      page.drawText(title, {
        x: margin,
        y: startY,
        size: 14,
        font: helveticaBold,
        color: rgb(0.2, 0.4, 0.8),
      });
      page.drawLine({
        start: { x: margin, y: startY - 5 },
        end: { x: width - margin, y: startY - 5 },
        thickness: 1,
        color: rgb(0.2, 0.4, 0.8),
      });
      return startY - 20;
    };

    // --- Statistik Umum ---
    const totalMasukan = masukanStats.reduce((a, b) => a + b._count, 0);
    const totalKegiatan = kegiatanStats.reduce((a, b) => a + b._count, 0);

    y = addSectionHeader("Statistik Umum", y);
    page.drawText(`Total Masukan Warga: ${totalMasukan}`, {
      x: margin + 10,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 15;

    const masukanRows = masukanStats.map((s) => [s.status, s._count]);
    if (masukanRows.length) {
      const colWidths = [150, 80];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin + 10,
        y,
        ["Status", "Jumlah"],
        masukanRows,
        colWidths,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader("Statistik Umum (lanjutan)", y);
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin + 10,
          y,
          ["Status", "Jumlah"],
          masukanRows.slice(result.drawnRows),
          colWidths,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
      y -= 15;
    }

    page.drawText(`Total Kegiatan Rapat: ${totalKegiatan}`, {
      x: margin + 10,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 15;

    const kegiatanRows = kegiatanStats.map((s) => [
      s.statusRekomendasi,
      s._count,
    ]);
    if (kegiatanRows.length) {
      const colWidths = [150, 80];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin + 10,
        y,
        ["Status", "Jumlah"],
        kegiatanRows,
        colWidths,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader("Statistik Umum (lanjutan)", y);
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin + 10,
          y,
          ["Status", "Jumlah"],
          kegiatanRows.slice(result.drawnRows),
          colWidths,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
      y -= 15;
    }

    y -= 15; // jarak setelah statistik

    // --- Data Warga (tambahan baru) ---
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin - 60;
    }
    y = addSectionHeader("Data Warga", y);
    page.drawText(`Total Warga Terdaftar: ${totalWarga}`, {
      x: margin + 10,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 15;
    page.drawText(`Nomor HP Terverifikasi: ${wargaTerverifikasi}`, {
      x: margin + 10,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 15;
    page.drawText(`Nomor HP Belum Terverifikasi: ${wargaBelumTerverifikasi}`, {
      x: margin + 10,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 20;

    // --- Masukan Warga Terbaru (5) ---
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin - 60;
    }
    y = addSectionHeader("Masukan Warga Terbaru (5)", y);
    const masukanRowsLatest = masukanTerbaru.map((m) => [
      m.judul,
      m.status,
      m.createdAt.toLocaleDateString("id-ID"),
    ]);
    if (masukanRowsLatest.length) {
      const colWidths = [200, 90, 80];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin,
        y,
        ["Judul Masukan", "Status", "Tanggal"],
        masukanRowsLatest,
        colWidths,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader("Masukan Warga Terbaru (5) - lanjutan", y);
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin,
          y,
          ["Judul Masukan", "Status", "Tanggal"],
          masukanRowsLatest.slice(result.drawnRows),
          colWidths,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
    } else {
      page.drawText("Belum ada masukan warga pada periode ini.", {
        x: margin + 10,
        y,
        size: 10,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= 20;
    }
    y -= 20;

    // --- Data Master ---
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin - 60;
    }
    y = addSectionHeader("Data Master (10 Terbaru)", y);
    const dmRows = dataMasterList.map((d) => [
      d.namaAtribut,
      d.kritikalitas,
      d.jumlah ?? "-",
      d.tahunData ?? "-",
    ]);
    if (dmRows.length) {
      const colWidths = [180, 70, 60, 70];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin,
        y,
        ["Nama Atribut", "Kritikalitas", "Jumlah", "Tahun"],
        dmRows,
        colWidths,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader("Data Master (10 Terbaru) - lanjutan", y);
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin,
          y,
          ["Nama Atribut", "Kritikalitas", "Jumlah", "Tahun"],
          dmRows.slice(result.drawnRows),
          colWidths,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
    } else {
      page.drawText("Tidak ada data master yang tersedia pada periode ini.", {
        x: margin + 10,
        y,
        size: 10,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= 20;
    }
    y -= 20;

    // --- Masukan per Domain ---
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin - 60;
    }
    y = addSectionHeader("Masukan per Domain (5 Terbanyak)", y);
    const domainRows = masukanPerDomain.map((d) => [d.nama, d.jumlah]);
    if (domainRows.length) {
      const colWidths = [200, 80];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin,
        y,
        ["Domain Isu", "Jumlah"],
        domainRows,
        colWidths,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader("Masukan per Domain (5 Terbanyak) - lanjutan", y);
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin,
          y,
          ["Domain Isu", "Jumlah"],
          domainRows.slice(result.drawnRows),
          colWidths,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
    } else {
      page.drawText("Tidak ada data masukan per domain pada periode ini.", {
        x: margin + 10,
        y,
        size: 10,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= 20;
    }
    y -= 20;

    // --- Kegiatan Terbaru ---
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin - 60;
    }
    y = addSectionHeader("Kegiatan Rapat Terbaru (5)", y);
    const kegiatanRows2 = kegiatanTerbaru.map((k) => [
      k.judul,
      new Date(k.tanggal).toLocaleDateString("id-ID"),
      k.statusRekomendasi,
      k.domainIsu?.nama || "-",
    ]);
    if (kegiatanRows2.length) {
      const colWidths2 = [160, 80, 90, 100];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin,
        y,
        ["Judul", "Tanggal", "Status", "Domain"],
        kegiatanRows2,
        colWidths2,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader("Kegiatan Rapat Terbaru (5) - lanjutan", y);
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin,
          y,
          ["Judul", "Tanggal", "Status", "Domain"],
          kegiatanRows2.slice(result.drawnRows),
          colWidths2,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
    } else {
      page.drawText("Tidak ada kegiatan rapat pada periode ini.", {
        x: margin + 10,
        y,
        size: 10,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= 20;
    }
    y -= 20;

    // --- Prioritas ---
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin - 60;
    }
    y = addSectionHeader("Prioritas Terbaru (20 yang Disetujui)", y);
    const priorityRows = prioritasList
      .slice(0, 20)
      .map((p) => [p.deskripsi, p.kegiatan, p.skor.toFixed(2), p.domain]);
    if (priorityRows.length) {
      const colWidths3 = [180, 140, 60, 80];
      let result = drawTable(
        page,
        helvetica,
        helveticaBold,
        margin,
        y,
        ["Deskripsi", "Kegiatan", "Skor", "Domain"],
        priorityRows,
        colWidths3,
        y,
      );
      if (result.pageBreak) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - margin - 60;
        y = addSectionHeader(
          "Prioritas Terbaru (20 yang Disetujui) - lanjutan",
          y,
        );
        result = drawTable(
          page,
          helvetica,
          helveticaBold,
          margin,
          y,
          ["Deskripsi", "Kegiatan", "Skor", "Domain"],
          priorityRows.slice(result.drawnRows),
          colWidths3,
          y,
        );
        y = result.newY;
      } else {
        y = result.newY;
      }
    } else {
      page.drawText("Belum ada prioritas yang disetujui pada periode ini.", {
        x: margin + 10,
        y,
        size: 10,
        font: helvetica,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= 20;
    }

    // Tambahkan footer ke semua halaman (header tidak ditambahkan)
    const pages = pdfDoc.getPages();
    const totalPages = pages.length;

    for (let i = 0; i < totalPages; i++) {
      const p = pages[i];
      addFooter(p, helvetica, currentDate);
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
    const filename = `laporan-sistem-${new Date().toISOString().slice(0, 10)}.pdf`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating laporan sistem:", error);
    return NextResponse.json(
      { success: false, message: "Gagal generate laporan" },
      { status: 500 },
    );
  }
}
