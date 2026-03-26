import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role, StatusRekomendasi } from "@/app/generated/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

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

  try {
    const [totalMasukan, totalKegiatan] = await Promise.all([
      prisma.masukanWarga.count({ where }),
      prisma.kegiatanRapat.count({ where }),
    ]);

    const kegiatanDisetujui = await prisma.kegiatanRapat.findMany({
      where: { ...where, statusRekomendasi: StatusRekomendasi.DISETUJUI },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        domainIsu: { select: { nama: true, code: true } },
      },
    });

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

    // Buat PDF
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage([595.28, 841.89]);
    let y = 800;

    page.drawText("LAPORAN SISTEM PRIORITAS PEMBANGUNAN", {
      x: 50,
      y,
      size: 14,
      font: helveticaBold,
      color: rgb(0.2, 0.4, 0.8),
    });
    y -= 30;
    page.drawText(
      `Periode: ${startDate || "Awal"} - ${endDate || "Sekarang"}`,
      { x: 50, y, size: 10, font: helvetica },
    );
    y -= 20;
    page.drawText(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`, {
      x: 50,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 30;

    page.drawText("STATISTIK", { x: 50, y, size: 12, font: helveticaBold });
    y -= 20;
    page.drawText(`Total Masukan Warga: ${totalMasukan}`, {
      x: 60,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 15;
    page.drawText(`Total Kegiatan Rapat: ${totalKegiatan}`, {
      x: 60,
      y,
      size: 10,
      font: helvetica,
    });
    y -= 30;

    page.drawText("DAFTAR PRIORITAS (20 Terbaru yang Disetujui)", {
      x: 50,
      y,
      size: 12,
      font: helveticaBold,
    });
    y -= 20;

    for (const p of prioritasList.slice(0, 20)) {
      if (y < 50) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = 800;
      }
      page.drawText(`- ${p.deskripsi}`, { x: 60, y, size: 9, font: helvetica });
      y -= 12;
      page.drawText(
        `  Kegiatan: ${p.kegiatan} | Skor: ${p.skor.toFixed(2)} | Domain: ${p.domain}`,
        { x: 70, y, size: 8, font: helvetica },
      );
      y -= 15;
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
