// src/app/api/protected/kegiatan-rapat/[id]/export-pdf/route.ts

import { auth } from "@/lib/auth";
import { handlePrismaError } from "@/lib/handlePrismaError";
import { handleResponse } from "@/lib/handleResponse";
import { kegiatanRapatService } from "@/services/kegiatanRapatService";
import { NextRequest } from "next/server";
import { Role } from "@/app/generated/prisma";
import { headers } from "next/headers";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// ✅ FIX: Force dynamic rendering
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Helper untuk format tanggal
const formatTanggal = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper untuk getStatusLabel
const getStatusLabel = (status: string): string => {
  switch (status) {
    case "DISETUJUI":
      return "Disetujui";
    case "DIAJUKAN":
      return "Diajukan";
    case "DRAFT":
      return "Draft";
    case "DITOLAK":
      return "Ditolak";
    default:
      return status;
  }
};

// ✅ FIX: Sanitize text to remove unsupported characters for WinAnsi encoding
const sanitizeText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n") // Normalize line endings
    .replace(/\t/g, "    ") // Replace tabs with spaces
    .replace(/[^\x20-\x7E\n]/g, ""); // Remove non-ASCII characters except newline
};

// ✅ FIX: Manual text wrapping for pdf-lib with newline support
const wrapText = (
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number,
): string[] => {
  if (!text) return [];

  // Sanitize text first
  const sanitizedText = sanitizeText(text);

  // Split by newlines to handle paragraphs
  const paragraphs = sanitizedText.split("\n");
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(" ");
    let currentLine = "";

    for (const word of words) {
      if (!word) continue;

      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const allowedRoles: Role[] = ["ADMIN", "LURAH", "PERANGKAT_DESA"];
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return handleResponse({
      success: false,
      message: "User belum login",
      status: 403,
    });
  }

  if (!allowedRoles.includes(session.user.role as Role)) {
    return handleResponse({
      success: false,
      message: "Akses ditolak",
      status: 403,
    });
  }

  try {
    // ✅ FIX: Await params untuk Next.js 15+
    const { id } = await params;

    // Fetch data kegiatan
    const kegiatanRapat = await kegiatanRapatService.getById(id);

    // Create PDF Document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();

    // Embed font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold,
    );

    let yPosition = height - 50;
    const margin = 50;
    const maxWidth = width - margin * 2;

    // ✅ FIX: Updated addText with manual text wrapping
    const addText = (
      text: string,
      fontSize: number,
      font: any,
      color = rgb(0, 0, 0),
      isBold = false,
    ) => {
      const textLines = wrapText(text, font, fontSize, maxWidth);
      textLines.forEach((line: string) => {
        if (yPosition < 50) {
          page = pdfDoc.addPage([595.28, 841.89]);
          yPosition = height - 50;
        }
        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: isBold ? helveticaBoldFont : helveticaFont,
          color: color,
        });
        yPosition -= fontSize + 2;
      });
      return textLines.length * (fontSize + 2);
    };

    const addLine = () => {
      if (yPosition < 50) {
        page = pdfDoc.addPage([595.28, 841.89]);
        yPosition = height - 50;
      }
      page.drawLine({
        start: { x: margin, y: yPosition },
        end: { x: width - margin, y: yPosition },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
      });
      yPosition -= 10;
    };

    const moveDown = (space: number = 10) => {
      yPosition -= space;
    };

    // ========================
    // HEADER
    // ========================
    yPosition = height - 50;
    addText(
      "KELURAHAN PANGGUNGJATI",
      20,
      helveticaBoldFont,
      rgb(0.12, 0.25, 0.68),
      true,
    );
    moveDown(5);
    addText("Detail Kegiatan Rapat", 16, helveticaBoldFont, rgb(0, 0, 0), true);
    moveDown(10);
    addText(
      `Dicetak oleh: ${sanitizeText(session.user.name || "")}`,
      10,
      helveticaFont,
      rgb(0.4, 0.4, 0.4),
    );
    moveDown(5);
    addText(
      `Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`,
      10,
      helveticaFont,
      rgb(0.4, 0.4, 0.4),
    );
    moveDown(15);

    addLine();
    moveDown(15);

    // ========================
    // INFORMASI KEGIATAN
    // ========================
    addText(
      "INFORMASI KEGIATAN",
      14,
      helveticaBoldFont,
      rgb(0.12, 0.25, 0.68),
      true,
    );
    moveDown(10);

    addText(
      `Judul: ${sanitizeText(kegiatanRapat.judul || "")}`,
      11,
      helveticaFont,
    );
    moveDown(8);
    addText(
      `Tanggal: ${formatTanggal(kegiatanRapat.tanggal)}`,
      11,
      helveticaFont,
    );
    moveDown(8);
    addText(
      `Lokasi: ${sanitizeText(kegiatanRapat.lokasi || "Belum ditentukan")}`,
      11,
      helveticaFont,
    );
    moveDown(8);

    if (kegiatanRapat.domainIsu) {
      addText(
        `Domain Isu: ${sanitizeText(kegiatanRapat.domainIsu.nama || "")}`,
        11,
        helveticaFont,
      );
      moveDown(8);
    }

    addText(
      `Dibuat Oleh: ${sanitizeText(kegiatanRapat.dibuatOleh.name || "")}${kegiatanRapat.dibuatOleh.jabatan ? ` - ${sanitizeText(kegiatanRapat.dibuatOleh.jabatan)}` : ""}`,
      11,
      helveticaFont,
    );
    moveDown(15);

    addText("Deskripsi:", 11, helveticaBoldFont, rgb(0, 0, 0), true);
    moveDown(5);
    addText(sanitizeText(kegiatanRapat.deskripsi || ""), 10, helveticaFont);
    moveDown(15);

    addLine();
    moveDown(15);

    // ========================
    // REKOMENDASI AI
    // ========================
    addText(
      "REKOMENDASI AI",
      14,
      helveticaBoldFont,
      rgb(0.12, 0.25, 0.68),
      true,
    );
    moveDown(10);

    if (kegiatanRapat.rekomendasi && kegiatanRapat.rekomendasi.length > 0) {
      kegiatanRapat.rekomendasi.forEach((rec, index) => {
        addText(
          `${index + 1}. ${sanitizeText(rec.judul || "")}`,
          12,
          helveticaBoldFont,
          rgb(0, 0, 0),
          true,
        );
        moveDown(8);
        addText(
          `Status: ${getStatusLabel(rec.status)} | Skor Prioritas: ${rec.skorPrioritas}`,
          10,
          helveticaFont,
        );
        moveDown(5);
        addText(
          `Ringkasan: ${sanitizeText(rec.ringkasan || "")}`,
          10,
          helveticaFont,
        );
        moveDown(5);
        addText(
          `Deskripsi: ${sanitizeText(rec.deskripsi || "")}`,
          10,
          helveticaFont,
        );
        moveDown(10);

        // Masukan Warga Terkait
        if (rec.masukanLinks && rec.masukanLinks.length > 0) {
          addText(
            "Masukan Warga Terkait:",
            10,
            helveticaBoldFont,
            rgb(0, 0, 0),
            true,
          );
          moveDown(5);
          rec.masukanLinks.forEach((ml, idx) => {
            addText(
              `  ${idx + 1}. ${sanitizeText(ml.masukan.judul || "")} - ${sanitizeText(ml.masukan.namaPengirim || "Anonim")} (RT ${ml.masukan.lokasiRt}/RW ${ml.masukan.lokasiRw})`,
              9,
              helveticaFont,
            );
            moveDown(5);
          });
          moveDown(10);
        }

        // Line separator antar rekomendasi
        if (index < kegiatanRapat.rekomendasi.length - 1) {
          addLine();
          moveDown(10);
        }
      });
    } else {
      addText(
        "Belum ada rekomendasi AI untuk kegiatan ini.",
        10,
        helveticaFont,
        rgb(0.4, 0.4, 0.4),
      );
      moveDown(15);
    }

    addLine();
    moveDown(15);

    // ========================
    // FOOTER
    // ========================
    const footerText1 =
      "Dokumen ini dihasilkan secara otomatis oleh Sistem Kelola Kegiatan Kelurahan Panggungjati";
    const footerText2 = `ID Kegiatan: ${kegiatanRapat.id}`;
    const footerText3 = "Dokumen ini sah dan dapat dipertanggungjawabkan";

    const footerY = 40;

    // ✅ FIX: pdf-lib does not support 'align' option. Calculate X manually for centering.
    const drawCenteredText = (
      text: string,
      y: number,
      fontSize: number,
      font: any,
      color: any,
    ) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const x = (width - textWidth) / 2;
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color,
      });
    };

    drawCenteredText(
      footerText1,
      footerY,
      8,
      helveticaFont,
      rgb(0.4, 0.4, 0.4),
    );
    drawCenteredText(
      footerText2,
      footerY - 12,
      8,
      helveticaFont,
      rgb(0.4, 0.4, 0.4),
    );
    drawCenteredText(
      footerText3,
      footerY - 24,
      8,
      helveticaFont,
      rgb(0.4, 0.4, 0.4),
    );

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // ✅ FIX: Convert Uint8Array to ArrayBuffer for Response compatibility
    const arrayBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    ) as ArrayBuffer;

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Kegiatan_${sanitizeText(kegiatanRapat.judul || "").replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF Export Error:", err);

    const prismaResponse = handlePrismaError(err);
    if (prismaResponse) {
      return handleResponse({
        success: false,
        message: prismaResponse.message,
        status: prismaResponse.status,
      });
    }

    return handleResponse({
      success: false,
      message: "Terjadi error pada server",
      status: 500,
    });
  }
};
