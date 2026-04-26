// app/api/protected/kegiatan-rapat/[id]/export-pdf/route.ts
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

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
  usedMasukanIds?: string[];
  usedDataMasterIds?: string[];
  warning?: string | null;
}

interface RekomendasiMetadata {
  generatedAt: string;
  aiModel: string;
  modeRekomendasi: string;
  domainIsuCode: string;
  totalMasukanDianalisis: number;
  totalDataMasterDianalisis: number;
}

interface InputDataItem {
  id: string;
  judul: string;
  deskripsi: string;
  lokasiRt: string;
  lokasiRw: string;
}

interface InputDataMaster {
  id: string;
  namaAtribut: string;
  kritikalitas: string;
  jumlah: number | null;
}

interface InputData {
  masukan: InputDataItem[];
  dataMaster: InputDataMaster[];
}

interface RekomendasiSnapshot {
  metadata: RekomendasiMetadata;
  prioritas: RekomendasiItem[];
  inputData?: InputData;
}

// ==================== Konstanta ====================
const MARGIN = 50;
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const FOOTER_HEIGHT = 50;
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
  warningBg: rgb(1, 0.95, 0.7),
  warningText: rgb(0.6, 0.3, 0),
};

// ==================== Utilities ====================
/**
 * Hapus SEMUA karakter di luar Latin‑1 (WinAnsi)
 * dan spasi berlebih.
 */
const sanitizeText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "") // hanya Latin‑1
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
  // Nama Kelurahan
  page.drawText("KELURAHAN PANGGUNGJATI", {
    x: MARGIN,
    y: headerY,
    size: 14,
    font: helveticaBold,
    color: COLORS.primary,
  });
  // Alamat (tanpa nomor telepon)
  page.drawText(
    "Jl. Kibuyut Kanjeng Dalem No. 36 B, RT/RW 001/005, Kelurahan Panggungjati, Kecamatan Taktakan, Kota Serang, Banten.",
    {
      x: MARGIN,
      y: headerY - 15,
      size: 8,
      font: helvetica,
      color: COLORS.textSecondary,
    },
  );
  // Email
  page.drawText("panggungjatikelurahan@gmail.com", {
    x: MARGIN,
    y: headerY - 27,
    size: 8,
    font: helvetica,
    color: COLORS.textSecondary,
  });
  // Garis pembatas
  page.drawLine({
    start: { x: MARGIN, y: headerY - 38 },
    end: { x: PAGE_WIDTH - MARGIN, y: headerY - 38 },
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

  const currentYear = new Date().getFullYear();
  page.drawText(`© ${currentYear} Kelurahan Panggungjati - Dokumen Resmi`, {
    x: MARGIN,
    y: footerY - 20,
    size: 6,
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
  // Asumsi teks sudah disanitasi
  const words = text.split(" ");
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
  // Sanitasi di sini agar aman
  const safeText = sanitizeText(text);
  const lines = measureTextLines(safeText, font, size, maxWidth);
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
      { label: "Judul", value: sanitizeText(kegiatan.judul || "-") },
      { label: "Deskripsi", value: sanitizeText(kegiatan.deskripsi || "-") },
      {
        label: "Tanggal",
        value: sanitizeText(formatTanggalIndonesia(kegiatan.tanggal)),
      },
      { label: "Lokasi", value: sanitizeText(kegiatan.lokasi || "-") },
    ];

    const infoKanan = [
      {
        label: "Domain Isu",
        value: sanitizeText(
          `${kegiatan.domainIsu?.nama || "-"} (${kegiatan.domainIsu?.code || ""})`,
        ),
      },
      {
        label: "Dibuat Oleh",
        value: sanitizeText(
          `${kegiatan.dibuatOleh?.name || "-"} (${kegiatan.dibuatOleh?.jabatan || "-"})`,
        ),
      },
      {
        label: "Status",
        value: sanitizeText(kegiatan.statusRekomendasi || "-"),
      },
      {
        label: "Mode",
        value: sanitizeText(
          kegiatan.mode === "FUSI_DATA" ? "Fusi Data" : "Data Master Saja",
        ),
      },
    ];
    if (kegiatan.aiModel)
      infoKanan.push({
        label: "Model AI",
        value: sanitizeText(kegiatan.aiModel),
      });
    if (kegiatan.aiProcessedAt) {
      infoKanan.push({
        label: "Diproses AI",
        value: sanitizeText(formatTanggalIndonesia(kegiatan.aiProcessedAt)),
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
        const metaText = sanitizeText(
          `Dihasilkan: ${formatTanggalIndonesia(meta.generatedAt)} | Model: ${meta.aiModel} | Mode: ${
            meta.modeRekomendasi === "FUSI_DATA" ? "Fusi Data" : "Data Master"
          } | Domain: ${meta.domainIsuCode} | Masukan: ${meta.totalMasukanDianalisis} | Data Master: ${meta.totalDataMasterDianalisis}`,
        );
        const result = drawWrappedText(currentPage, metaText, MARGIN, y, {
          size: 8,
          font: helvetica,
          color: COLORS.textSecondary,
          maxWidth: MAX_CONTENT_WIDTH,
        });
        y = result.newY - 10;
      }

      // Loop setiap prioritas
      for (const item of rekomendasi.prioritas) {
        // Perhitungan tinggi yang dibutuhkan
        const descHeight = measureTextHeight(
          sanitizeText(item.deskripsi),
          helveticaBold,
          11,
          MAX_CONTENT_WIDTH - 35,
        );
        const alasanHeight = measureTextHeight(
          sanitizeText(item.alasanAnalisis),
          helvetica,
          9,
          MAX_CONTENT_WIDTH - 35,
        );

        // Tambahan tinggi untuk warning (jika ada)
        let warningHeight = 0;
        if (item.warning) {
          const warningText = sanitizeText(`Peringatan: ${item.warning}`);
          const warningLines = measureTextLines(
            warningText,
            helvetica,
            8,
            MAX_CONTENT_WIDTH - 35 - 16,
          );
          warningHeight = warningLines.length * 8 * 1.4 + 12;
        }

        let requiredHeight = 25 + descHeight + 14 + 12 + alasanHeight + 8;
        if (item.warning) {
          requiredHeight += warningHeight + 6;
        }

        if (item.evidence) {
          requiredHeight += 12 + 18 + 18 + 8;
        }

        const usedMasukan =
          rekomendasi.inputData?.masukan.filter((m) =>
            item.usedMasukanIds?.includes(m.id),
          ) || [];
        const usedDataMaster =
          rekomendasi.inputData?.dataMaster.filter((d) =>
            item.usedDataMasterIds?.includes(d.id),
          ) || [];
        const totalInputItems = usedMasukan.length + usedDataMaster.length;
        if (totalInputItems > 0) {
          requiredHeight += 15;
          const itemHeight = 12;
          requiredHeight += totalInputItems * itemHeight;
        }

        if (item.lokasiRt || item.lokasiRw) {
          requiredHeight += 15;
        }
        requiredHeight += 10;

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

        // Gambar background kartu
        const cardHeight = requiredHeight + 10;
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

        y -= 5;

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
          sanitizeText(`Skor Prioritas: ${item.skorPrioritas.toFixed(2)}`),
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
          sanitizeText(item.alasanAnalisis),
          MARGIN + 35,
          y,
          { size: 9, font: helvetica, maxWidth: MAX_CONTENT_WIDTH - 35 },
        );
        y = alasanResult.newY - 8;

        // ========== PERINGATAN (WARNING) ==========
        if (item.warning) {
          const warningText = sanitizeText(`Peringatan: ${item.warning}`);
          const warningBoxWidth = MAX_CONTENT_WIDTH - 35;
          const warningLines = measureTextLines(
            warningText,
            helvetica,
            8,
            warningBoxWidth - 16,
          );
          const warningTotalHeight = warningLines.length * 8 * 1.4 + 12;

          currentPage.drawRectangle({
            x: MARGIN + 35,
            y: y - warningTotalHeight,
            width: warningBoxWidth,
            height: warningTotalHeight,
            color: COLORS.warningBg,
            borderColor: rgb(0.9, 0.7, 0.2),
            borderWidth: 1,
          });

          let warningY = y - 12;
          for (const line of warningLines) {
            currentPage.drawText(line, {
              x: MARGIN + 35 + 8,
              y: warningY,
              size: 8,
              font: helvetica,
              color: COLORS.warningText,
            });
            warningY -= 8 * 1.4;
          }

          y -= warningTotalHeight + 6;
        }

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

          currentPage.drawRectangle({
            x: tableX,
            y: y - rowH + 2,
            width: colW * 3,
            height: rowH,
            borderColor: COLORS.border,
            borderWidth: 0.5,
          });

          const values = [
            sanitizeText((item.evidence.masukanWargaCount || 0).toString()),
            sanitizeText((item.evidence.dataMasterCount || 0).toString()),
            sanitizeText(item.evidence.kritikalitas || "-"),
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

        // Data Input Terkait (masukan & data master)
        if (usedMasukan.length > 0 || usedDataMaster.length > 0) {
          currentPage.drawText("Data Input Terkait:", {
            x: MARGIN + 35,
            y,
            size: 9,
            font: helveticaBold,
          });
          y -= 12;

          for (const m of usedMasukan) {
            const text = sanitizeText(
              `[Masukan] ${m.judul} (RT ${m.lokasiRt}/RW ${m.lokasiRw})`,
            );
            const result = drawWrappedText(currentPage, text, MARGIN + 45, y, {
              size: 8,
              font: helvetica,
              maxWidth: MAX_CONTENT_WIDTH - 45,
            });
            y = result.newY - 8;
          }

          for (const d of usedDataMaster) {
            const text = sanitizeText(
              `[Data Master] ${d.namaAtribut} (${d.kritikalitas})${d.jumlah ? ` - Jml: ${d.jumlah}` : ""}`,
            );
            const result = drawWrappedText(currentPage, text, MARGIN + 45, y, {
              size: 8,
              font: helvetica,
              maxWidth: MAX_CONTENT_WIDTH - 45,
            });
            y = result.newY - 8;
          }

          y -= 4;
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
    const pengesahanHeight = 120;

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

    currentPage.drawLine({
      start: { x: MARGIN, y: y + 5 },
      end: { x: PAGE_WIDTH - MARGIN, y: y + 5 },
      thickness: 1,
      color: COLORS.border,
    });
    y -= 15;

    currentPage.drawText("PENGESAHAN", {
      x: MARGIN,
      y,
      size: 12,
      font: helveticaBold,
      color: COLORS.primary,
    });
    y -= 25;

    const pengesahanYStart = y;

    // Hanya satu kolom, letakkan di kanan bawah
    const rightX = PAGE_WIDTH - MARGIN - 160; // posisi kolom kanan

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

    // Garis tanda tangan
    currentPage.drawLine({
      start: { x: rightX, y: pengesahanYStart - 50 }, // lebih jarak
      end: { x: rightX + 150, y: pengesahanYStart - 50 },
      thickness: 1,
      color: COLORS.text,
    });

    // Nama di bawah garis
    currentPage.drawText("HERUJI,S.Pd.I.M.Si", {
      x: rightX,
      y: pengesahanYStart - 65,
      size: 10,
      font: helvetica,
    });

    y = pengesahanYStart - 100;

    // === TAMBAHKAN FOOTER DI SEMUA HALAMAN ===
    const totalPages = pdfDoc.getPageCount();
    for (let i = 0; i < totalPages; i++) {
      const page = pdfDoc.getPage(i);
      drawFooter(page, helvetica, i + 1, totalPages);
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);
    const filename = `kegiatan-${sanitizeText(kegiatan.judul?.replace(/[^a-zA-Z0-9_-]/g, "_") || id)}.pdf`;

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
