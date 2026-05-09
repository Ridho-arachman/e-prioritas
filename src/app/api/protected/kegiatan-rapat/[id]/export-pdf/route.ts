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
      // Baris "Mode" dihapus karena field mode sudah tidak ada
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
        // Tampilkan mode selalu "Fusi Data"
        const metaText = sanitizeText(
          `Dihasilkan: ${formatTanggalIndonesia(meta.generatedAt)} | Model: ${meta.aiModel} | Mode: Fusi Data | Domain: ${meta.domainIsuCode} | Masukan: ${meta.totalMasukanDianalisis} | Data Master: ${meta.totalDataMasterDianalisis}`,
        );
        const result = drawWrappedText(currentPage, metaText, MARGIN, y, {
          size: 8,
          font: helvetica,
          color: COLORS.textSecondary,
          maxWidth: MAX_CONTENT_WIDTH,
        });
        y = result.newY - 10;
      }

      // Loop setiap prioritas (tanpa perubahan lainnya)
      for (const item of rekomendasi.prioritas) {
        // ... kode selanjutnya persis seperti sebelumnya ...
        // (tidak ada perubahan di bagian ini, jadi saya hilangkan agar tidak terlalu panjang)
        // Di kode asli Anda, lanjutkan dengan perhitungan tinggi, gambar kartu, dll.
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
    const rightX = PAGE_WIDTH - MARGIN - 160;

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
      start: { x: rightX, y: pengesahanYStart - 50 },
      end: { x: rightX + 150, y: pengesahanYStart - 50 },
      thickness: 1,
      color: COLORS.text,
    });

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
