// app/api/protected/kegiatan-rapat/[id]/export-pdf/route.ts
import { Role } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFPage } from "pdf-lib";

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

interface KegiatanRapat {
  id: string;
  judul: string | null;
  deskripsi: string | null;
  tanggal: Date;
  lokasi: string | null;
  domainIsu: { nama: string; code: string } | null;
  dibuatOleh: { name: string; jabatan: string } | null;
  statusRekomendasi: string | null;
  aiModel: string | null;
  aiProcessedAt: Date | null;
  rekomendasiItems: any;
}

interface Fonts {
  helvetica: any;
  helveticaBold: any;
}

interface PDFState {
  pdfDoc: PDFDocument;
  currentPage: PDFPage;
  y: number;
  fonts: Fonts;
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
const sanitizeText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "")
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
const drawHeader = (page: PDFPage, { helvetica, helveticaBold }: Fonts) => {
  const headerY = PAGE_HEIGHT - MARGIN + 15;
  
  page.drawText("KELURAHAN PANGGUNGJATI", {
    x: MARGIN,
    y: headerY,
    size: 14,
    font: helveticaBold,
    color: COLORS.primary,
  });

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

  page.drawText("panggungjatikelurahan@gmail.com", {
    x: MARGIN,
    y: headerY - 27,
    size: 8,
    font: helvetica,
    color: COLORS.textSecondary,
  });

  page.drawLine({
    start: { x: MARGIN, y: headerY - 38 },
    end: { x: PAGE_WIDTH - MARGIN, y: headerY - 38 },
    thickness: 1.5,
    color: COLORS.primary,
  });
};

const drawFooter = (
  page: PDFPage,
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
  page: PDFPage,
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
  const safeText = sanitizeText(text);
  const lines = measureTextLines(safeText, font, size, maxWidth);
  let currentY = y;

  for (const line of lines) {
    page.drawText(line, { x, y: currentY, size, font, color });
    currentY -= actualLineHeight;
  }

  return { newY: currentY, linesDrawn: lines.length };
};

// ==================== PDF State Management ====================
const createNewPage = (state: PDFState): PDFState => {
  const { pdfDoc, fonts } = state;
  const newPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  drawHeader(newPage, fonts);
  return {
    ...state,
    currentPage: newPage,
    y: CONTENT_TOP,
  };
};

const checkAndAddNewPage = (state: PDFState, requiredHeight: number): PDFState => {
  if (state.y - requiredHeight < CONTENT_BOTTOM) {
    return createNewPage(state);
  }
  return state;
};

// ==================== Authentication & Data Retrieval ====================
const authenticateAndGetUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("User belum login");
  }

  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
  if (!allowedRoles.includes(session.user.role as Role)) {
    throw new Error("Akses ditolak");
  }

  return session;
};

const getKegiatan = async (id: string) => {
  const kegiatan = await kegiatanRapatService.getById(id);
  if (!kegiatan) {
    throw new Error("Kegiatan tidak ditemukan");
  }
  return kegiatan as unknown as KegiatanRapat;
};

const parseRekomendasi = (kegiatan: KegiatanRapat): RekomendasiSnapshot | null => {
  if (!kegiatan.rekomendasiItems) return null;

  try {
    const raw =
      typeof kegiatan.rekomendasiItems === "string"
        ? JSON.parse(kegiatan.rekomendasiItems)
        : kegiatan.rekomendasiItems;

    if (raw?.metadata && Array.isArray(raw?.prioritas)) {
      return raw as RekomendasiSnapshot;
    }
  } catch (e) {
    console.error("Gagal parse rekomendasiItems:", e);
  }

  return null;
};

// ==================== PDF Content Drawers ====================
const drawTitle = (state: PDFState): PDFState => {
  const { currentPage, y, fonts: { helveticaBold } } = state;
  
  currentPage.drawText("LAPORAN KEGIATAN RAPAT", {
    x: MARGIN,
    y,
    size: 16,
    font: helveticaBold,
    color: COLORS.primary,
  });

  return { ...state, y: y - 24 };
};

const drawInfoKegiatan = (state: PDFState, kegiatan: KegiatanRapat): PDFState => {
  let currentState = state;
  const { helvetica, helveticaBold } = currentState.fonts;

  // Draw section title
  currentState.currentPage.drawText("INFORMASI KEGIATAN", {
    x: MARGIN,
    y: currentState.y,
    size: 12,
    font: helveticaBold,
    color: COLORS.primary,
  });
  currentState = { ...currentState, y: currentState.y - 20 };

  const infoKiri = [
    { label: "Judul", value: sanitizeText(kegiatan.judul || "-") },
    { label: "Deskripsi", value: sanitizeText(kegiatan.deskripsi || "-") },
    { label: "Tanggal", value: sanitizeText(formatTanggalIndonesia(kegiatan.tanggal)) },
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
    { label: "Status", value: sanitizeText(kegiatan.statusRekomendasi || "-") },
  ];

  if (kegiatan.aiModel) {
    infoKanan.push({ label: "Model AI", value: sanitizeText(kegiatan.aiModel) });
  }

  if (kegiatan.aiProcessedAt) {
    infoKanan.push({
      label: "Diproses AI",
      value: sanitizeText(formatTanggalIndonesia(kegiatan.aiProcessedAt)),
    });
  }

  const colWidth = (MAX_CONTENT_WIDTH - 30) / 2;
  const labelWidth = 75;
  const allInfoItems = [];

  for (let i = 0; i < Math.max(infoKiri.length, infoKanan.length); i++) {
    allInfoItems.push({
      kiri: infoKiri[i],
      kanan: infoKanan[i],
    });
  }

  let currentY = currentState.y;

  for (const row of allInfoItems) {
    let maxRowHeight = 0;
    let tempY = currentY;

    // Draw left column item
    if (row.kiri) {
      currentState.currentPage.drawText(`${row.kiri.label}:`, {
        x: MARGIN,
        y: tempY,
        size: 9,
        font: helveticaBold,
      });
      
      const { newY: textNewY } = drawWrappedText(
        currentState.currentPage,
        row.kiri.value,
        MARGIN + labelWidth,
        tempY,
        {
          size: 9,
          font: helvetica,
          maxWidth: colWidth - labelWidth,
        },
      );
      
      maxRowHeight = Math.max(maxRowHeight, (tempY - textNewY) + 5);
    }

    // Draw right column item
    if (row.kanan) {
      currentState.currentPage.drawText(`${row.kanan.label}:`, {
        x: MARGIN + colWidth + 30,
        y: tempY,
        size: 9,
        font: helveticaBold,
      });
      
      const { newY: textNewY } = drawWrappedText(
        currentState.currentPage,
        row.kanan.value,
        MARGIN + colWidth + 30 + labelWidth,
        tempY,
        { size: 9, font: helvetica, maxWidth: colWidth - labelWidth },
      );
      
      maxRowHeight = Math.max(maxRowHeight, (tempY - textNewY) + 5);
    }

    currentY -= maxRowHeight;

    // Check if we need a new page after this row
    if (currentY < CONTENT_BOTTOM) {
      currentState = createNewPage({ ...currentState, y: currentY });
      currentY = currentState.y;
    }
  }

  currentState = { ...currentState, y: currentY - 15 };

  // Draw separator line
  currentState.currentPage.drawLine({
    start: { x: MARGIN, y: currentState.y },
    end: { x: PAGE_WIDTH - MARGIN, y: currentState.y },
    thickness: 1,
    color: COLORS.border,
  });
  currentState = { ...currentState, y: currentState.y - 20 };

  return currentState;
};

const drawDetail = (
  page: PDFPage,
  label: string,
  value: string,
  currentYPos: number,
  { helvetica, helveticaBold }: Fonts,
) => {
  page.drawText(`${label}:`, {
    x: MARGIN + 10,
    y: currentYPos,
    size: 9,
    font: helveticaBold,
  });
  
  const { newY: textNewY } = drawWrappedText(
    page,
    sanitizeText(value),
    MARGIN + 10 + 70,
    currentYPos,
    {
      size: 9,
      font: helvetica,
      maxWidth: MAX_CONTENT_WIDTH - 80,
    },
  );
  
  return Math.min(currentYPos - 12, textNewY);
};

const drawRekomendasiPrioritas = (
  state: PDFState,
  rekomendasi: RekomendasiSnapshot | null,
): PDFState => {
  const { fonts } = state;
  const { helvetica, helveticaBold } = fonts;
  let currentState = state;

  if (!rekomendasi || rekomendasi.prioritas.length === 0) {
    currentState = checkAndAddNewPage(currentState, 30);
    currentState.currentPage.drawText("Belum ada rekomendasi prioritas.", {
      x: MARGIN,
      y: currentState.y,
      size: 12,
      font: helvetica,
      color: COLORS.textSecondary,
    });
    return { ...currentState, y: currentState.y - 15 };
  }

  // Draw section title
  currentState = checkAndAddNewPage(currentState, 40);
  currentState.currentPage.drawText("REKOMENDASI PRIORITAS", {
    x: MARGIN,
    y: currentState.y,
    size: 14,
    font: helveticaBold,
    color: COLORS.primary,
  });
  currentState = { ...currentState, y: currentState.y - 20 };

  // Draw metadata
  const meta = rekomendasi.metadata;
  if (meta) {
    const metaText = sanitizeText(
      `Dihasilkan: ${formatTanggalIndonesia(meta.generatedAt)} | Model: ${meta.aiModel} | Mode: Fusi Data | Domain: ${meta.domainIsuCode} | Masukan: ${meta.totalMasukanDianalisis} | Data Master: ${meta.totalDataMasterDianalisis}`,
    );
    
    const result = drawWrappedText(currentState.currentPage, metaText, MARGIN, currentState.y, {
      size: 8,
      font: helvetica,
      color: COLORS.textSecondary,
      maxWidth: MAX_CONTENT_WIDTH,
    });
    currentState = { ...currentState, y: result.newY - 10 };
  }

  // Process each priority item
  for (const item of rekomendasi.prioritas) {
    // Draw the item title (wrapped)
    const itemTitle = `Prioritas ke-${item.prioritasKe}: ${sanitizeText(item.deskripsi)}`;
    const itemTitleHeight = measureTextHeight(itemTitle, helveticaBold, 11, MAX_CONTENT_WIDTH);
    
    // Check if title fits
    currentState = checkAndAddNewPage(currentState, itemTitleHeight + 5);
    
    // Draw wrapped title
    const { newY: titleNewY } = drawWrappedText(
      currentState.currentPage,
      itemTitle,
      MARGIN,
      currentState.y,
      {
        size: 11,
        font: helveticaBold,
        color: COLORS.primary,
        maxWidth: MAX_CONTENT_WIDTH,
      }
    );
    currentState = { ...currentState, y: titleNewY - 5 };

    // Draw Skor Prioritas
    const skorText = `Skor Prioritas: ${item.skorPrioritas}`;
    const skorHeight = measureTextHeight(skorText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
    currentState = checkAndAddNewPage(currentState, skorHeight + 12);
    currentState = {
      ...currentState,
      y: drawDetail(currentState.currentPage, "Skor Prioritas", item.skorPrioritas.toString(), currentState.y, fonts)
    };

    // Draw Alasan Analisis
    const alasanText = `Alasan Analisis: ${item.alasanAnalisis}`;
    const alasanHeight = measureTextHeight(alasanText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
    currentState = checkAndAddNewPage(currentState, alasanHeight + 12);
    currentState = {
      ...currentState,
      y: drawDetail(currentState.currentPage, "Alasan Analisis", item.alasanAnalisis, currentState.y, fonts)
    };

    // Draw Domain Isu
    const domainText = `Domain Isu: ${item.domainIsuId}`;
    const domainHeight = measureTextHeight(domainText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
    currentState = checkAndAddNewPage(currentState, domainHeight + 12);
    currentState = {
      ...currentState,
      y: drawDetail(currentState.currentPage, "Domain Isu", item.domainIsuId, currentState.y, fonts)
    };

    // Draw Lokasi if exists
    if (item.lokasiRt || item.lokasiRw) {
      const lokasiText = `Lokasi: RT ${item.lokasiRt || '-'} / RW ${item.lokasiRw || '-'}`;
      const lokasiHeight = measureTextHeight(lokasiText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
      currentState = checkAndAddNewPage(currentState, lokasiHeight + 12);
      currentState = {
        ...currentState,
        y: drawDetail(currentState.currentPage, "Lokasi", lokasiText, currentState.y, fonts)
      };
    }

    // Draw Evidence
    if (item.evidence) {
      currentState = checkAndAddNewPage(currentState, 20); // Space for "Evidence:" label
      currentState.currentPage.drawText("Evidence:", {
        x: MARGIN + 10,
        y: currentState.y,
        size: 9,
        font: helveticaBold,
      });
      currentState = { ...currentState, y: currentState.y - 12 };
      
      if (item.evidence.masukanWargaCount) {
        const masukanText = `  Masukan Warga: ${item.evidence.masukanWargaCount}`;
        const masukanHeight = measureTextHeight(masukanText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
        currentState = checkAndAddNewPage(currentState, masukanHeight + 12);
        currentState = {
          ...currentState,
          y: drawDetail(currentState.currentPage, "  Masukan Warga", item.evidence.masukanWargaCount.toString(), currentState.y, fonts)
        };
      }
      
      if (item.evidence.dataMasterCount) {
        const dataMasterText = `  Data Master: ${item.evidence.dataMasterCount}`;
        const dataMasterHeight = measureTextHeight(dataMasterText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
        currentState = checkAndAddNewPage(currentState, dataMasterHeight + 12);
        currentState = {
          ...currentState,
          y: drawDetail(currentState.currentPage, "  Data Master", item.evidence.dataMasterCount.toString(), currentState.y, fonts)
        };
      }
      
      if (item.evidence.kritikalitas) {
        const kritikalitasText = `  Kritikalitas: ${item.evidence.kritikalitas}`;
        const kritikalitasHeight = measureTextHeight(kritikalitasText, helvetica, 9, MAX_CONTENT_WIDTH - 80);
        currentState = checkAndAddNewPage(currentState, kritikalitasHeight + 12);
        currentState = {
          ...currentState,
          y: drawDetail(currentState.currentPage, "  Kritikalitas", item.evidence.kritikalitas, currentState.y, fonts)
        };
      }
    }

    // Draw Warning
    if (item.warning) {
      const warningText = `Peringatan: ${sanitizeText(item.warning)}`;
      const warningHeight = measureTextHeight(warningText, helvetica, 9, MAX_CONTENT_WIDTH - 20);
      
      // Check if warning box fits
      currentState = checkAndAddNewPage(currentState, warningHeight + 30);
      
      currentState.currentPage.drawRectangle({
        x: MARGIN + 5,
        y: currentState.y - warningHeight - 5,
        width: MAX_CONTENT_WIDTH - 10,
        height: warningHeight + 10,
        color: COLORS.warningBg,
        borderColor: COLORS.warningText,
        borderWidth: 1,
      });
      
      const { newY: warningNewY } = drawWrappedText(
        currentState.currentPage,
        warningText,
        MARGIN + 10,
        currentState.y - 5,
        {
          size: 9,
          font: helvetica,
          color: COLORS.warningText,
          maxWidth: MAX_CONTENT_WIDTH - 20,
        },
      );
      
      currentState = { ...currentState, y: warningNewY - 5 };
    }

    // Add spacing after item
    currentState = { ...currentState, y: currentState.y - 15 };
  }

  return currentState;
};

const drawPengesahan = (state: PDFState): PDFState => {
  const pengesahanHeight = 120;
  let newState = checkAndAddNewPage(state, pengesahanHeight);
  let { currentPage, y, fonts: { helvetica, helveticaBold } } = newState;

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

  return { ...newState, currentPage, y };
};

// ==================== Finalization ====================
const addFootersToAllPages = (pdfDoc: PDFDocument, helvetica: any) => {
  const totalPages = pdfDoc.getPageCount();
  for (let i = 0; i < totalPages; i++) {
    const page = pdfDoc.getPage(i);
    drawFooter(page, helvetica, i + 1, totalPages);
  }
};

// ==================== Handler GET ====================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await authenticateAndGetUser();
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID tidak ditemukan" },
        { status: 400 },
      );
    }

    const kegiatan = await getKegiatan(id);
    const rekomendasi = parseRekomendasi(kegiatan);

    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fonts: Fonts = { helvetica, helveticaBold };

    let currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(currentPage, fonts);

    let state: PDFState = {
      pdfDoc,
      currentPage,
      y: CONTENT_TOP,
      fonts,
    };

    state = drawTitle(state);
    state = drawInfoKegiatan(state, kegiatan);
    state = drawRekomendasiPrioritas(state, rekomendasi);
    state = drawPengesahan(state);

    addFootersToAllPages(pdfDoc, helvetica);

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
    
    const statusMap: Record<string, number> = {
      "User belum login": 403,
      "Akses ditolak": 403,
      "Kegiatan tidak ditemukan": 404,
    };

    const message = error instanceof Error ? error.message : String(error);
    const status = statusMap[message] || 500;

    return NextResponse.json(
      {
        success: false,
        message: status === 500 ? "Gagal menghasilkan PDF" : message,
        error: status === 500 ? message : undefined,
      },
      { status },
    );
  }
}
