// app/api/protected/kegiatan-rapat/[id]/export-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "@/app/generated/prisma";

export const runtime = "nodejs";

// ==================== Tipe Data ====================
interface RekomendasiItem {
  prioritasKe: number;
  deskripsi: string;
  skorPrioritas: number;
  alasanAnalisis: string;
  domainIsuId: string;
  lokasiRt?: string;
  lokasiRw?: string;
  fingerprint: string;
  evidence?: {
    masukanWargaCount?: number;
    dataMasterCount?: number;
    kritikalitas?: string;
  };
}

interface RekomendasiMetadata {
  generatedAt: string;
  aiModel: string;
  modeRekomendasi: string;
  domainIsuCode: string;
  totalMasukanDianalisis: number;
  totalDataMasterDianalisis: number;
}

interface RekomendasiSnapshot {
  metadata: RekomendasiMetadata;
  prioritas: RekomendasiItem[];
}

// ==================== Konstanta ====================
const MARGIN = 50;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const FOOTER_HEIGHT = 40;
const HEADER_HEIGHT = 60;
const CONTENT_TOP = PAGE_HEIGHT - MARGIN - HEADER_HEIGHT;
const CONTENT_BOTTOM = MARGIN + FOOTER_HEIGHT;
const MAX_CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;

const COLORS = {
  primary: rgb(0.2, 0.4, 0.8),
  accent: rgb(0.3, 0.6, 0.9),
  lightGray: rgb(0.95, 0.95, 0.95),
  border: rgb(0.85, 0.85, 0.85),
  text: rgb(0.2, 0.2, 0.2),
  textSecondary: rgb(0.4, 0.4, 0.4),
  white: rgb(1, 1, 1),
};

// ==================== Utilities ====================
const sanitizeText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const formatTanggalIndonesia = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ==================== PDF Helper Functions ====================
const drawHeader = (page: any, helvetica: any, helveticaBold: any) => {
  const headerY = PAGE_HEIGHT - MARGIN + 15;
  page.drawText("KELURAHAN PANGGUNGJATI", {
    x: MARGIN,
    y: headerY,
    size: 14,
    font: helveticaBold,
    color: COLORS.primary,
  });
  page.drawText(
    "Jl. Raya Panggungjati No. 1, Kota Cimahi – Telp. (022) 123456",
    {
      x: MARGIN,
      y: headerY - 15,
      size: 8,
      font: helvetica,
      color: COLORS.textSecondary,
    },
  );
  page.drawLine({
    start: { x: MARGIN, y: headerY - 25 },
    end: { x: PAGE_WIDTH - MARGIN, y: headerY - 25 },
    thickness: 1.5,
    color: COLORS.primary,
  });
};

const drawFooter = (
  page: any,
  helvetica: any,
  pageNumber: number,
  totalPages: number,
) => {
  const footerY = MARGIN - 10;
  page.drawLine({
    start: { x: MARGIN, y: footerY },
    end: { x: PAGE_WIDTH - MARGIN, y: footerY },
    thickness: 0.5,
    color: COLORS.border,
  });
  const now = formatTanggalIndonesia(new Date());
  page.drawText(`Dicetak pada: ${now}`, {
    x: MARGIN,
    y: footerY - 10,
    size: 7,
    font: helvetica,
    color: COLORS.textSecondary,
  });
  page.drawText(`Halaman ${pageNumber} dari ${totalPages}`, {
    x: PAGE_WIDTH - MARGIN - 80,
    y: footerY - 10,
    size: 7,
    font: helvetica,
    color: COLORS.textSecondary,
  });
};

const measureTextLines = (
  text: string,
  font: any,
  size: number,
  maxWidth: number,
): string[] => {
  const cleanText = sanitizeText(text);
  const words = cleanText.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, size);
    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  if (lines.length === 0) lines.push("");
  return lines;
};

const measureTextHeight = (
  text: string,
  font: any,
  size: number,
  maxWidth: number,
  lineHeight: number = 1.4,
): number => {
  const lines = measureTextLines(text, font, size, maxWidth);
  return lines.length * size * lineHeight;
};

const drawWrappedText = (
  page: any,
  text: string,
  x: number,
  y: number,
  options: {
    size: number;
    font: any;
    color?: any;
    maxWidth: number;
    lineHeight?: number;
  },
): { newY: number; linesDrawn: number } => {
  const {
    size,
    font,
    color = COLORS.text,
    maxWidth,
    lineHeight = 1.4,
  } = options;
  const actualLineHeight = size * lineHeight;
  const lines = measureTextLines(text, font, size, maxWidth);
  let currentY = y;
  for (const line of lines) {
    page.drawText(line, { x, y: currentY, size, font, color });
    currentY -= actualLineHeight;
  }
  return { newY: currentY, linesDrawn: lines.length };
};

// ==================== Handler GET ====================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Autentikasi
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json(
        { success: false, message: "User belum login" },
        { status: 403 },
      );
    }
    const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
    if (!allowedRoles.includes(session.user.role as Role)) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID tidak ditemukan" },
        { status: 400 },
      );
    }

    const kegiatan = await kegiatanRapatService.getById(id);
    if (!kegiatan) {
      return NextResponse.json(
        { success: false, message: "Kegiatan tidak ditemukan" },
        { status: 404 },
      );
    }

    // Parsing rekomendasiItems
    let rekomendasi: RekomendasiSnapshot | null = null;
    if (kegiatan.rekomendasiItems) {
      try {
        const raw =
          typeof kegiatan.rekomendasiItems === "string"
            ? JSON.parse(kegiatan.rekomendasiItems)
            : kegiatan.rekomendasiItems;
        if (raw?.metadata && Array.isArray(raw?.prioritas)) {
          rekomendasi = raw as RekomendasiSnapshot;
        }
      } catch (e) {
        console.error("Gagal parse rekomendasiItems:", e);
      }
    }

    // === CREATE PDF DOCUMENT ===
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = CONTENT_TOP;

    drawHeader(currentPage, helvetica, helveticaBold);

    // === TITLE ===
    currentPage.drawText("LAPORAN KEGIATAN RAPAT", {
      x: MARGIN,
      y,
      size: 16,
      font: helveticaBold,
      color: COLORS.primary,
    });
    y -= 24;

    // === SECTION: INFORMASI KEGIATAN ===
    currentPage.drawText("INFORMASI KEGIATAN", {
      x: MARGIN,
      y,
      size: 12,
      font: helveticaBold,
      color: COLORS.primary,
    });
    y -= 20;

    const infoKiri = [
      { label: "Judul", value: kegiatan.judul || "-" },
      { label: "Deskripsi", value: kegiatan.deskripsi || "-" },
      { label: "Tanggal", value: formatTanggalIndonesia(kegiatan.tanggal) },
      { label: "Lokasi", value: kegiatan.lokasi || "-" },
    ];

    const infoKanan = [
      {
        label: "Domain Isu",
        value: `${kegiatan.domainIsu?.nama || "-"} (${kegiatan.domainIsu?.code || ""})`,
      },
      {
        label: "Dibuat Oleh",
        value: `${kegiatan.dibuatOleh?.name || "-"} (${kegiatan.dibuatOleh?.jabatan || "-"})`,
      },
      { label: "Status", value: kegiatan.statusRekomendasi || "-" },
      {
        label: "Mode",
        value: kegiatan.mode === "FUSI_DATA" ? "Fusi Data" : "Data Master Saja",
      },
    ];
    if (kegiatan.aiModel)
      infoKanan.push({ label: "Model AI", value: kegiatan.aiModel });
    if (kegiatan.aiProcessedAt) {
      infoKanan.push({
        label: "Diproses AI",
        value: formatTanggalIndonesia(kegiatan.aiProcessedAt),
      });
    }

    const colWidth = (MAX_CONTENT_WIDTH - 30) / 2;
    const maxRows = Math.max(infoKiri.length, infoKanan.length);
    const rowHeight = 16;

    for (let i = 0; i < maxRows; i++) {
      if (y - rowHeight * 2 < CONTENT_BOTTOM) {
        drawFooter(
          currentPage,
          helvetica,
          pdfDoc.getPageCount(),
          pdfDoc.getPageCount() + 1,
        );
        currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        drawHeader(currentPage, helvetica, helveticaBold);
        y = CONTENT_TOP;
      }

      if (i < infoKiri.length) {
        const item = infoKiri[i];
        currentPage.drawText(`${item.label}:`, {
          x: MARGIN,
          y,
          size: 9,
          font: helveticaBold,
        });
        const result = drawWrappedText(
          currentPage,
          item.value,
          MARGIN + 75,
          y,
          {
            size: 9,
            font: helvetica,
            maxWidth: colWidth - 75,
          },
        );
        y = Math.min(y - rowHeight, result.newY - 5);
      }
      if (i < infoKanan.length) {
        const item = infoKanan[i];
        currentPage.drawText(`${item.label}:`, {
          x: MARGIN + colWidth + 30,
          y,
          size: 9,
          font: helveticaBold,
        });
        const result = drawWrappedText(
          currentPage,
          item.value,
          MARGIN + colWidth + 30 + 75,
          y,
          { size: 9, font: helvetica, maxWidth: colWidth - 75 },
        );
        y = Math.min(y - rowHeight, result.newY - 5);
      }
    }
    y -= 15;

    // Separator line
    currentPage.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_WIDTH - MARGIN, y },
      thickness: 1,
      color: COLORS.border,
    });
    y -= 20;

    // === SECTION: REKOMENDASI PRIORITAS ===
    if (rekomendasi && rekomendasi.prioritas.length > 0) {
      if (y - 40 < CONTENT_BOTTOM) {
        drawFooter(
          currentPage,
          helvetica,
          pdfDoc.getPageCount(),
          pdfDoc.getPageCount() + 1,
        );
        currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        drawHeader(currentPage, helvetica, helveticaBold);
        y = CONTENT_TOP;
      }

      currentPage.drawText("REKOMENDASI PRIORITAS", {
        x: MARGIN,
        y,
        size: 14,
        font: helveticaBold,
        color: COLORS.primary,
      });
      y -= 20;

      const meta = rekomendasi.metadata;
      if (meta) {
        const metaText = `Dihasilkan: ${formatTanggalIndonesia(meta.generatedAt)} | Model: ${meta.aiModel} | Mode: ${
          meta.modeRekomendasi === "FUSI_DATA" ? "Fusi Data" : "Data Master"
        } | Domain: ${meta.domainIsuCode} | Masukan: ${meta.totalMasukanDianalisis} | Data Master: ${meta.totalDataMasterDianalisis}`;
        const result = drawWrappedText(currentPage, metaText, MARGIN, y, {
          size: 8,
          font: helvetica,
          color: COLORS.textSecondary,
          maxWidth: MAX_CONTENT_WIDTH,
        });
        y = result.newY - 10;
      }

      // Loop setiap prioritas dengan pengukuran dinamis
      for (const item of rekomendasi.prioritas) {
        // Hitung tinggi yang dibutuhkan
        const descHeight = measureTextHeight(
          sanitizeText(item.deskripsi),
          helveticaBold,
          11,
          MAX_CONTENT_WIDTH - 35,
        );
        const alasanHeight = measureTextHeight(
          item.alasanAnalisis,
          helvetica,
          9,
          MAX_CONTENT_WIDTH - 35,
        );

        let requiredHeight = 25 + descHeight + 14 + 12 + alasanHeight + 8; // badge + deskripsi + skor + label alasan + alasan + margin
        if (item.evidence) {
          requiredHeight += 12 + 18 + 18 + 8; // label + header + data + margin
        }
        if (item.lokasiRt || item.lokasiRw) {
          requiredHeight += 15;
        }
        requiredHeight += 10; // spasi akhir

        // Cek page break
        if (y - requiredHeight < CONTENT_BOTTOM) {
          drawFooter(
            currentPage,
            helvetica,
            pdfDoc.getPageCount(),
            pdfDoc.getPageCount() + 1,
          );
          currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
          drawHeader(currentPage, helvetica, helveticaBold);
          y = CONTENT_TOP;
        }

        // Gambar background dengan tinggi tepat
        const cardHeight = requiredHeight + 10; // padding
        currentPage.drawRectangle({
          x: MARGIN - 5,
          y: y - cardHeight + 5,
          width: MAX_CONTENT_WIDTH + 10,
          height: cardHeight,
          color: COLORS.lightGray,
        });
        currentPage.drawRectangle({
          x: MARGIN - 5,
          y: y - cardHeight + 5,
          width: MAX_CONTENT_WIDTH + 10,
          height: cardHeight,
          borderColor: COLORS.border,
          borderWidth: 1,
        });

        y -= 5; // padding atas

        // Priority badge
        currentPage.drawCircle({
          x: MARGIN + 15,
          y: y - 7,
          size: 12,
          color: COLORS.primary,
        });
        currentPage.drawText(item.prioritasKe.toString(), {
          x: MARGIN + 11,
          y: y - 11,
          size: 10,
          font: helveticaBold,
          color: COLORS.white,
        });

        // Deskripsi
        const descResult = drawWrappedText(
          currentPage,
          sanitizeText(item.deskripsi),
          MARGIN + 35,
          y - 5,
          {
            size: 11,
            font: helveticaBold,
            color: COLORS.primary,
            maxWidth: MAX_CONTENT_WIDTH - 35,
          },
        );
        y = descResult.newY - 8;

        // Skor
        currentPage.drawText(
          `Skor Prioritas: ${item.skorPrioritas.toFixed(2)}`,
          {
            x: MARGIN + 35,
            y,
            size: 9,
            font: helvetica,
            color: COLORS.textSecondary,
          },
        );
        y -= 14;

        // Alasan analisis label
        currentPage.drawText("Alasan Analisis:", {
          x: MARGIN + 35,
          y,
          size: 9,
          font: helveticaBold,
        });
        y -= 12;

        // Alasan analisis konten
        const alasanResult = drawWrappedText(
          currentPage,
          item.alasanAnalisis,
          MARGIN + 35,
          y,
          { size: 9, font: helvetica, maxWidth: MAX_CONTENT_WIDTH - 35 },
        );
        y = alasanResult.newY - 8;

        // Evidence table
        if (item.evidence) {
          currentPage.drawText("Data Pendukung:", {
            x: MARGIN + 35,
            y,
            size: 9,
            font: helveticaBold,
          });
          y -= 12;

          const tableX = MARGIN + 35;
          const colW = 80;
          const rowH = 18;

          // Header
          currentPage.drawRectangle({
            x: tableX,
            y: y - rowH + 2,
            width: colW * 3,
            height: rowH,
            color: COLORS.primary,
          });

          const headers = ["Masukan Warga", "Data Master", "Kritikalitas"];
          headers.forEach((header, i) => {
            const textWidth = helveticaBold.widthOfTextAtSize(header, 8);
            const textX = tableX + i * colW + (colW - textWidth) / 2;
            const textY = y - (rowH - 8) / 2 - 2;
            currentPage.drawText(header, {
              x: textX,
              y: textY,
              size: 8,
              font: helveticaBold,
              color: COLORS.white,
            });
          });
          y -= rowH;

          // Data row
          currentPage.drawRectangle({
            x: tableX,
            y: y - rowH + 2,
            width: colW * 3,
            height: rowH,
            borderColor: COLORS.border,
            borderWidth: 0.5,
          });

          const values = [
            (item.evidence.masukanWargaCount || 0).toString(),
            (item.evidence.dataMasterCount || 0).toString(),
            item.evidence.kritikalitas || "-",
          ];
          values.forEach((val, i) => {
            const textWidth = helvetica.widthOfTextAtSize(val, 8);
            const textX = tableX + i * colW + (colW - textWidth) / 2;
            const textY = y - (rowH - 8) / 2 - 2;
            currentPage.drawText(val, {
              x: textX,
              y: textY,
              size: 8,
              font: helvetica,
            });
          });
          y -= rowH + 8;
        }

        // Lokasi
        if (item.lokasiRt || item.lokasiRw) {
          currentPage.drawText(
            sanitizeText(
              `Lokasi: RT ${item.lokasiRt || "-"} / RW ${item.lokasiRw || "-"}`,
            ),
            {
              x: MARGIN + 35,
              y,
              size: 8,
              font: helvetica,
              color: COLORS.textSecondary,
            },
          );
          y -= 15;
        }

        y -= 10; // spasi setelah kartu
      }
    } else {
      if (y - 30 < CONTENT_BOTTOM) {
        drawFooter(
          currentPage,
          helvetica,
          pdfDoc.getPageCount(),
          pdfDoc.getPageCount() + 1,
        );
        currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        drawHeader(currentPage, helvetica, helveticaBold);
        y = CONTENT_TOP;
      }
      currentPage.drawText("Belum ada rekomendasi prioritas.", {
        x: MARGIN,
        y,
        size: 12,
        font: helvetica,
        color: COLORS.textSecondary,
      });
    }

    // ========== BAGIAN PENGESAHAN ==========
    const pengesahanHeight = 120; // perkiraan tinggi total bagian pengesahan

    // Cek apakah perlu halaman baru untuk pengesahan
    if (y - pengesahanHeight < CONTENT_BOTTOM) {
      drawFooter(
        currentPage,
        helvetica,
        pdfDoc.getPageCount(),
        pdfDoc.getPageCount() + 1,
      );
      currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      drawHeader(currentPage, helvetica, helveticaBold);
      y = CONTENT_TOP;
    }

    // Garis pemisah sebelum pengesahan
    currentPage.drawLine({
      start: { x: MARGIN, y: y + 5 },
      end: { x: PAGE_WIDTH - MARGIN, y: y + 5 },
      thickness: 1,
      color: COLORS.border,
    });
    y -= 15;

    // Judul pengesahan
    currentPage.drawText("PENGESAHAN", {
      x: MARGIN,
      y,
      size: 12,
      font: helveticaBold,
      color: COLORS.primary,
    });
    y -= 25;

    // Simpan posisi awal pengesahan
    const pengesahanYStart = y;

    // Kolom kiri (Mengetahui)
    const leftX = MARGIN;
    const rightX = MARGIN + (MAX_CONTENT_WIDTH - 50) / 2 + 50; // perkiraan

    // Kolom kiri
    currentPage.drawText("Mengetahui,", {
      x: leftX,
      y: pengesahanYStart,
      size: 10,
      font: helveticaBold,
    });
    currentPage.drawText("Ketua Tim Pelaksana", {
      x: leftX,
      y: pengesahanYStart - 15,
      size: 10,
      font: helvetica,
    });
    currentPage.drawLine({
      start: { x: leftX, y: pengesahanYStart - 30 },
      end: { x: leftX + 150, y: pengesahanYStart - 30 },
      thickness: 1,
      color: COLORS.text,
    });
    currentPage.drawText("( ____________________ )", {
      x: leftX,
      y: pengesahanYStart - 45,
      size: 10,
      font: helvetica,
    });
    currentPage.drawText("Nama Lengkap", {
      x: leftX,
      y: pengesahanYStart - 60,
      size: 10,
      font: helvetica,
    });
    currentPage.drawText("NIP. 1234567890", {
      x: leftX,
      y: pengesahanYStart - 75,
      size: 10,
      font: helvetica,
    });

    // Kolom kanan (Menyetujui)
    currentPage.drawText("Menyetujui,", {
      x: rightX,
      y: pengesahanYStart,
      size: 10,
      font: helveticaBold,
    });
    currentPage.drawText("Lurah Panggungjati", {
      x: rightX,
      y: pengesahanYStart - 15,
      size: 10,
      font: helvetica,
    });
    currentPage.drawLine({
      start: { x: rightX, y: pengesahanYStart - 30 },
      end: { x: rightX + 150, y: pengesahanYStart - 30 },
      thickness: 1,
      color: COLORS.text,
    });
    currentPage.drawText("( ____________________ )", {
      x: rightX,
      y: pengesahanYStart - 45,
      size: 10,
      font: helvetica,
    });
    currentPage.drawText("Nama Lurah", {
      x: rightX,
      y: pengesahanYStart - 60,
      size: 10,
      font: helvetica,
    });
    currentPage.drawText("NIP. 0987654321", {
      x: rightX,
      y: pengesahanYStart - 75,
      size: 10,
      font: helvetica,
    });

    // Update y setelah pengesahan
    y = pengesahanYStart - 120;

    // ========== AKHIR PENGESAHAN ==========

    // === DRAW FOOTERS PADA SEMUA HALAMAN ===
    const totalPages = pdfDoc.getPageCount();
    for (let i = 0; i < totalPages; i++) {
      const page = pdfDoc.getPage(i);
      drawFooter(page, helvetica, i + 1, totalPages);
    }

    // Simpan dan kembalikan PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
    const filename = `kegiatan-${kegiatan.judul?.replace(/[^a-zA-Z0-9_-]/g, "_") || id}.pdf`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghasilkan PDF",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
